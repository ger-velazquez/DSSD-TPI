# -*- coding: utf-8 -*-
from bonita.utils import send_email
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework.response import Response

from .bonita_service import BonitaService
from anonymous_societys.models import *
from django.conf import settings

import base64
import requests
from django.core.files.base import ContentFile
from PIL import Image
from io import BytesIO
import os

import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.http import MediaFileUpload

from anonymous_societys.serializers import (
    SocietyRegistrationSerializer,
    ValidateRegistrationFormSerializer,
    EmailSerializer,
    ValidateTramiteSerializer,
    GenerateFileNumberSerializer,
    EstampilladoSerializer,
    GenerateFolderSerializer
)

bonita = BonitaService()

class BonitaProcessView(APIView):

    def post(self, request):
        print(self.request.data)
        try:
            logged = bonita.login()

            if logged:
                anon = AnonymousSociety.create(
                    name = self.request.data['form']['name'],
                    real_address = self.request.data['form']['realDomicile'],
                    legal_address = self.request.data['form']['legalDomicile'],
                    email = self.request.data['form']['email'],
                    # format day YYYY-MM-DD
                    date_created = self.request.data['form']['creationDate'],
                )

                society_re = SocietyRegistration.create(
                    anonymous_society=anon
                )

                statute_base64 = self.request.data['form']['statuteOfConformation']
                format, pdfstr = statute_base64.split(';base64,')
                ext = format.split('/')[-1]

                data = ContentFile(base64.b64decode(pdfstr))  
                file_name = "'statute." + ext
                anon.statute.save(file_name, data, save=True)
                
                for a in self.request.data['form']['partners']:
                    associate = Associate.create(
                        name=a['firstName'],
                        last_name=a['lastName'],
                        percentage=a['percentageOfContributions'],
                        society_registration=society_re
                    )
                    if a['isLegalRepresentative'] == True:
                        anon.legal_representative = associate
                        anon.save()

                if not self.request.data['form']['exportLocations']:
                    Export.create(
                            country='Argentina',
                            state=None,
                            anonymous_society=anon
                        )
                else:
                    for e in self.request.data['form']['exportLocations']:
                        export = Export.create(
                            country=e['country'],
                            state=e['state'],
                            anonymous_society=anon
                        )

                bonita.get_process_id()
                bonita.instantiation()

                # bonita_set_variables = bonita.set_variables([
                #     {"name":"idSolicitudSociedad","value": society_re.id}
                # ])

                bonita_set_variables = bonita.set_var(1,society_re.id)
                #bonita_set_variables = 200

                if bonita_set_variables == 200:

                    bonita.get_human_task()
                    bonita.assign_task()
                    bonita.execute_task()

                    return Response(
                        {
                            "status": True,
                            "payload": {},
                            "errors": [],
                        },
                        status=status.HTTP_200_OK
                    )

            else:
                raise

        except Exception as e:
            return Response(
                {
                    "status": False,
                    "payload": {},
                    "errors": str(e),
                },
                status=status.HTTP_400_BAD_REQUEST
            )


class SocietyRegistrationViewSet(viewsets.ModelViewSet):
    serializer_class = SocietyRegistrationSerializer
    http_method_names = ['get']

    def get_queryset(self):
        hash = self.request.query_params.get('hash', None)
        id = self.request.query_params.get('id', None)
        file_number = self.request.query_params.get('file_number', None)

        if hash:
            return SocietyRegistration.objects.filter(hash=hash)
        if id: 
            return SocietyRegistration.objects.filter(id=id)
        if file_number: 
            return SocietyRegistration.objects.filter(file_number=file_number)
        else:
            return SocietyRegistration.objects.filter(status=1)


class ValidateRegistrationFormView(APIView):
    serializer_class = ValidateRegistrationFormSerializer

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        status_data = request.data.get('status', None)
        id = request.data.get('id', None)
        observation = request.data.get('observation', None)

        logged = bonita.login()

        if logged:
            try:
                society = SocietyRegistration.objects.get(id=id)
                if status_data == 'accept':
                    st = Status.objects.get(id=2)
                    society.status = st
                    society.save()
                    #aca setea
                    bonita.set_var(2,"True")
                    bonita.set_var(4,society.anonymous_society.email)

                else:
                    st = Status.objects.get(id=3)
                    
                    time_H = int(request.data.get('time', None))
                    time_M = 3600000 * time_H
                    bonita.set_var(5, time_M)

                    society.status = st
                    society.save()

                if observation:
                    society.observation = observation
                    society.save()
                
                #aca avanza
                bonita.get_human_task()
                bonita.assign_task()
                bonita.execute_task()

                return Response(
                        {
                            "status": True,
                            "payload": {},
                            "errors": [],
                        },
                    status=status.HTTP_200_OK
            )
            
            except Exception as e:
                return Response(
                    {
                        "status": False,
                        "payload": {},
                        "errors": str(e),
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )


class AllCountriesView(APIView):
    serializer_class = ""

    def get(self,request):

        array_of_exports = Export.objects.all()
        

class EmailView(APIView):
    serializer_class = EmailSerializer

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        content = request.data.get('content', None)
        id = request.data.get('id', None)

        try:
            
            send_email(id, content)

            return Response(
                    {
                        "status": True,
                        "payload": {},
                        "errors": [],
                    },
                    status=status.HTTP_200_OK
            )
           
        except Exception as e:
            return Response(
                {
                    "status": False,
                    "payload": {},
                    "errors": str(e),
                },
                status=status.HTTP_400_BAD_REQUEST
            )


class ValidateTramiteView(APIView):
    serializer_class = ValidateTramiteSerializer


    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        status_data = request.data.get('status', None)
        id = request.data.get('id', None)

        logged = bonita.login()

        if logged:        
            try:
                society = SocietyRegistration.objects.get(id=id)
                if status_data == 'reject':
                    bonita.set_var(3,"False")

                bonita.get_human_task()
                bonita.assign_task()
                bonita.execute_task()

                return Response(
                        {
                            "status": True,
                            "payload": {},
                            "errors": [],
                        },
                        status=status.HTTP_200_OK
                )
            
            except Exception as e:
                return Response(
                    {
                        "status": False,
                        "payload": {},
                        "errors": str(e),
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )


class GenerateFileNumberView(APIView):
    serializer_class = GenerateFileNumberSerializer


    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        id = request.data.get('id', None)


        try:
            society = SocietyRegistration.objects.get(id=id)
            society.generate_file_number()

            return Response(
                    {
                        "status": True,
                        "payload": {},
                        "errors": [],
                    },
                status=status.HTTP_200_OK
        )
        
        except Exception as e:
            return Response(
                {
                    "status": False,
                    "payload": {},
                    "errors": str(e),
                },
                status=status.HTTP_400_BAD_REQUEST
            )


class EstampilladoView(APIView):
    serializer_class = EstampilladoSerializer


    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        id = request.data.get('id', None)

        try:
            society = SocietyRegistration.objects.get(id=id)

            data = {
                'username': 'walter',
                'password': 'bonita2021',
            }


            res = requests.post(
                'https://dssd-estampillado.herokuapp.com/api-token-auth/',
                data=data,
                headers={
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            )

            if res.status_code == 200:
                token_jwt = res.json()['token']

                statute_base64 = base64.b64encode(society.anonymous_society.statute.file.read())
                statute_str = statute_base64.decode('utf-8')

                data = { 
                    "statute": statute_str,
                    "file_number": society.file_number
                }


                res = requests.post(
                    'https://dssd-estampillado.herokuapp.com/api/hash',
                    data=data,
                    headers={
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "JWT " + token_jwt
                    }
                )

                if res.status_code == 200:
                    society.hash = token_jwt = res.json()['hash']
                    society.save()

                    qr_base64 = res.json()['qr_base64']

                    im = Image.open(BytesIO(base64.b64decode(qr_base64)))
                    im.save('image.png', 'PNG')

                    name_file = 'qr_' + res.json()['hash'] + '.png'
                    
                    with open("image.png", "rb") as image_file:
                        society.qr.save(name_file, image_file, save=True)
                    
                    os.remove("image.png") 

                else:
                    raise Exception(res.json())

            else:
                raise Exception(res.json())


            return Response(
                    {
                        "status": True,
                        "payload": {},
                        "errors": [],
                    },
                    status=status.HTTP_200_OK
            )
           
        except Exception as e:
            return Response(
                {
                    "status": False,
                    "payload": {},
                    "errors": str(e),
                },
                status=status.HTTP_400_BAD_REQUEST
            )


class GenerateFolderView(APIView):
    serializer_class = GenerateFolderSerializer

    def create_folder(self, service, society):

        file_metadata = {
        'name': society.file_number,
        'mimeType': 'application/vnd.google-apps.folder'
        }
        file = service.files().create(body=file_metadata,
                                            fields='id').execute()
        print ('Folder ID: %s' % file.get('id'))

        payload = {
            "role": "reader",
            "type": "anyone"
        }
        service.permissions().create(fileId=file.get('id'), body=payload).execute()

        return file.get('id')

    def upload_file(self, service, folder_id, society):

        from .utils import create_pdf

        file_metadata = {
        'name': 'estatuto.pdf',
        'parents': [folder_id]
        }
        media = MediaFileUpload(society.anonymous_society.statute.file.name,
                                mimetype='application/pdf',
                                resumable=True)
        file = service.files().create(body=file_metadata,
                                            media_body=media,
                                            fields='id').execute()

        print ('File ID: %s' % file.get('id'))

        create_pdf(society)

        pdf = open("mypdf.pdf", "rb")
                    
        file_metadata = {
        'name': 'info_publica.pdf',
        'parents': [folder_id]
        }
        media = MediaFileUpload('./' + pdf.name,
                                mimetype='application/pdf',
                                resumable=True)
        file = service.files().create(body=file_metadata,
                                            media_body=media,
                                            fields='id').execute()

        print ('File ID: %s' % file.get('id'))

        os.remove("mypdf.pdf") 


    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        id = request.data.get('id', None)

        try:
            society = SocietyRegistration.objects.get(id=id)

            # If modifying these scopes, delete the file token.json.
            SCOPES = ['https://www.googleapis.com/auth/drive']

            """Shows basic usage of the Drive v3 API.
            Prints the names and ids of the first 10 files the user has access to.
            """
            creds = None
            # The file token.json stores the user's access and refresh tokens, and is
            # created automatically when the authorization flow completes for the first
            # time.
            if os.path.exists('token.json'):
                creds = Credentials.from_authorized_user_file('token.json', SCOPES)
            # If there are no (valid) credentials available, let the user log in.
            if not creds or not creds.valid:
                if creds and creds.expired and creds.refresh_token:
                    creds.refresh(Request())
                else:
                    flow = InstalledAppFlow.from_client_secrets_file(
                        'credentials.json', SCOPES)
                    creds = flow.run_local_server(port=8000)
                # Save the credentials for the next run
                with open('token.json', 'w') as token:
                    token.write(creds.to_json())

            service = build('drive', 'v3', credentials=creds)

            # Call the Drive v3 API
            results = service.files().list(
                pageSize=10, fields="nextPageToken, files(id, name)").execute()
            items = results.get('files', [])

            if not items:
                print('No files found.')
            else:
                print('Files:')
                for item in items:
                    print(u'{0} ({1})'.format(item['name'], item['id']))

            folder_id = self.create_folder(service, society)

            self.upload_file(service, folder_id, society)

            content = ('Se ha generado correctamente la carpeta digital.\n \n'
                        'Para acceder a la carpeta en Google Drive ingresa al siguiente link: https://drive.google.com/drive/folders/' + folder_id)

            send_email(id, content)


            return Response(
                    {
                        "status": True,
                        "payload": {},
                        "errors": [],
                    },
                    status=status.HTTP_200_OK
            )
           
        except Exception as e:
            return Response(
                {
                    "status": False,
                    "payload": {},
                    "errors": str(e),
                },
                status=status.HTTP_400_BAD_REQUEST
            )