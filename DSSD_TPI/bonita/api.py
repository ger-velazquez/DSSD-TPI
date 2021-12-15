# -*- coding: utf-8 -*-
from bonita.utils import send_email
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework.response import Response

from collections import Counter

from .bonita_service import BonitaService
from anonymous_societys.models import *
from django.conf import settings

import base64
import requests
from django.core.files.base import ContentFile
from PIL import Image
from io import BytesIO
import os
import datetime
import pycountry

import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from googleapiclient.http import MediaFileUpload
from django.db.models import Count

from anonymous_societys.serializers import (
    SocietyRegistrationSerializer,
    ValidateRegistrationFormSerializer,
    EmailSerializer,
    ValidateTramiteSerializer,
    GenerateFileNumberSerializer,
    EstampilladoSerializer,
    GenerateFolderSerializer,
    LoginSerializer
)

bonita = BonitaService()


class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request):

        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)

            sessionid = request.data.get('sessionid', None)
            token = request.data.get('token', None)
            userid = request.data.get('userid', None)

            bonita.set_sessionid(sessionid)
            bonita.set_userid(userid)
            bonita.set_token(token)

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


class BonitaProcessView(APIView):

    def delete_associates(self, society_re):

        society_re.anonymous_society.legal_representative = None
        society_re.anonymous_society.save()

        associates = Associate.objects.filter(society_registration=society_re)

        if associates.exists():
            for a in associates:
                a.society_registration = None
                a.delete()

    def delete_exports(self, society_re):

        exports = Export.objects.filter(
            anonymous_society=society_re.anonymous_society)

        if exports.exists():
            for e in exports:
                e.anonymous_society = None
                e.delete()

    def post(self, request):

        id = self.request.query_params.get('id', None)

        if id:
            # try:
            logged = bonita.is_logged_in()

            if logged:

                society_re = SocietyRegistration.objects.get(id=id)
                bonita.case_id = society_re.caseid

                anon = society_re.anonymous_society

                anon.name = self.request.data['form']['name']
                anon.real_address = self.request.data['form']['realDomicile']
                anon.legal_address = self.request.data['form']['legalDomicile']
                anon.email = self.request.data['form']['email']
                anon.date_created = self.request.data['form']['creationDate']

                statute_base64 = self.request.data['form']['statuteOfConformation']
                if ("app.bonita.com" not in statute_base64):
                    format, pdfstr = statute_base64.split(';base64,')

                    ext = format.split('/')[-1]

                    data = ContentFile(base64.b64decode(pdfstr))
                    file_name = "'statute." + ext
                    anon.statute.save(file_name, data, save=True)

                self.delete_associates(society_re)

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

                self.delete_exports(society_re)

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

                anon.save()
                society_re.save()

                print("Arranco a ejecutar todo")
                bonita.set_var(4, society_re.anonymous_society.email)
                bonita.set_var(2, "True")
                bonita.get_human_task()
                bonita.assign_task()
                bonita.execute_task()


                print("Termine ")
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

            # except Exception as e:
            #     return Response(
            #         {
            #             "status": False,
            #             "payload": {},
            #             "errors": str(e),
            #         },
            #         status=status.HTTP_400_BAD_REQUEST
            #     )

        try:
            logged = bonita.is_logged_in()

            if logged:
                anon = AnonymousSociety.create(
                    name=self.request.data['form']['name'],
                    real_address=self.request.data['form']['realDomicile'],
                    legal_address=self.request.data['form']['legalDomicile'],
                    email=self.request.data['form']['email'],
                    # format day YYYY-MM-DD
                    date_created=self.request.data['form']['creationDate'],
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

                society_re.caseid = bonita.case_id
                society_re.save()

                bonita_set_variables = bonita.set_var(1, society_re.id)
                bonita.set_var(4, society_re.anonymous_society.email)

                # bonita_set_variables = 200

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
        caseid = self.request.query_params.get('caseid', None)
        task = self.request.query_params.get('task', None)
        society_name = self.request.query_params.get('society_name', None)

        # http://localhost:8080/bonita/API/bpm/humanTask?f=caseId=13

        if hash:
            return SocietyRegistration.objects.filter(hash=hash)
        if id:
            return SocietyRegistration.objects.filter(id=id)
        if society_name:
            return SocietyRegistration.objects.filter(anonymous_society__name=society_name)
        if file_number:
            return SocietyRegistration.objects.filter(file_number=file_number)
        if caseid:
            caseid = caseid.split(",")
            active_cases = []
            for case in caseid:
                json = BonitaService.active_cases(case)
                if json:
                    if json[0]['displayName'] == task:
                        active_cases.append(case)
            return SocietyRegistration.objects.filter(caseid__in=active_cases)
        else:
            # return SocietyRegistration.objects.filter(status=1)
            return []


class ValidateRegistrationFormView(APIView):
    serializer_class = ValidateRegistrationFormSerializer

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        status_data = request.data.get('status', None)
        id = request.data.get('id', None)
        observation = request.data.get('observation', None)

        logged = bonita.is_logged_in()

        # import pdb;
        # pdb.set_trace()

        if logged:
            try:
                society = SocietyRegistration.objects.get(id=id)
                bonita.case_id = society.caseid

                if status_data == 'accept':
                    st = Status.objects.get(id=2)
                    society.status = st
                    society.observation = None
                    society.save()
                    # aca setea
                    bonita.set_var(2, "True")
                else:
                    st = Status.objects.get(id=3)

                    time_H = int(request.data.get('time', None))
                    time_M = 60000 * time_H
                    bonita.set_var(5, time_M)
                    bonita.set_var(6, str(time_H))

                    bonita.set_var(2, "False")

                    society.status = st
                    society.save()

                if observation:
                    society.observation = observation
                    society.save()

                # aca avanza
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

    def get(self, request):

        try:
            array_of_exports = Export.objects.all()
            countries_names = list(
                map(lambda country_object: country_object.country.name, array_of_exports))
            countries_occurrences = dict(Counter(countries_names))

#             for country_key in list(countries_occurrences.keys()):
#                   ...: url = "https://countries.trevorblades.com"
#    ...:    ...:
#    ...:    ...: json = {'query': '''
#    ...:    ...: {
#    ...:    ...:   country(code: "DZ") {
#    ...:    ...:     name
#    ...:    ...:     native
#    ...:    ...:     emoji
#    ...:    ...:     currency
#    ...:    ...:     languages {
#    ...:    ...:       code
#    ...:    ...:       name
#    ...:    ...:     }
#    ...:    ...:   }
#    ...:    ...: }
#    ...:    ...: '''}
#    ...:    ...:
#    ...:    ...: r = requests.post(url, json=json)
#    ...:    ...: print(r.json())
#    ...:   Luego deberia hacer un for iterando por las keys y crear un nuevo diccionario con la data de lenguaje y continente.

            return Response(
                {
                    "status": True,
                    "payload": countries_occurrences,
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
        observation = request.data.get('observation', None)

        logged = bonita.is_logged_in()

        if logged:
            try:
                society = SocietyRegistration.objects.get(id=id)
                bonita.case_id = society.caseid

                if status_data == 'reject':
                    bonita.set_var(3, "False")
                    if observation:
                        society.observation = observation
                        society.save()
                else:
                    society.observation = None
                    society.save()
                    bonita.set_var(3, "True")

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

            if society.file_number is None:
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

                statute_base64 = base64.b64encode(
                    society.anonymous_society.statute.file.read())
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
        print('Folder ID: %s' % file.get('id'))

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

        print('File ID: %s' % file.get('id'))

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

        print('File ID: %s' % file.get('id'))

        os.remove("mypdf.pdf")

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        id = request.data.get('id', None)

        try:
            society = SocietyRegistration.objects.get(id=id)
            bonita.case_id = society.caseid

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
                creds = Credentials.from_authorized_user_file(
                    'token.json', SCOPES)
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


class DashboardView(APIView):
    #serializer_class = CountCaseEntradaEcribanoSerializer

    def graphql(self, code):
        url = "https://countries.trevorblades.com"

        json = {
                'query': '''
                    {
                    country(code: "'''+str(code)+'''") {
                        name
                        native
                        capital
                        currency
                        languages {
                            code
                            name
                        }
                    }
                    }'''
            }

        res = requests.post(url, json=json)
        return res.json()


    def exports(self):        
        society_completed = []
        info_exports = []
            
        archived_cases = BonitaService.archived_cases()

        if archived_cases:
            for ar in archived_cases:
                case_info = BonitaService.case_info(ar['rootCaseId'])
                if 'Generar carpeta fisica' in case_info['flowNodeStatesCounters']:
                    if 'completed' in case_info['flowNodeStatesCounters']['Generar carpeta fisica']:
                        if case_info['flowNodeStatesCounters']['Generar carpeta fisica']['completed'] == 1:
                            so = SocietyRegistration.objects.get(caseid=ar['rootCaseId'])
                            society_completed.append(so)

        array_of_exports = []
        
        if society_completed: 

            for society in society_completed:
                exports = Export.objects.filter(anonymous_society=society.anonymous_society)
                for e in exports:
                    array_of_exports.append(e)

            countries_names = list(
            map(lambda country_object: country_object.country.name, array_of_exports))
            countries_occurrences = dict(Counter(countries_names))

            sort_orders = {k: v for k, v in sorted(countries_occurrences.items(), key=lambda item: item[1], reverse=True)}

            top_3_countries = dict(list(sort_orders.items())[:3])
            
            for country in top_3_countries:
                code = pycountry.countries.search_fuzzy(country)
                code = code[0].alpha_2
                response = self.graphql(code)
                json = {
                        'name': country,
                        'quantity': top_3_countries[country],
                        'currency': response['data']['country']['currency'],
                        'capital': response['data']['country']['capital'],
                        'languages': response['data']['country']['languages']
                }
                info_exports.append(json)
            
        return info_exports

    def completed_cases(self):
        count = 0
        total_minutes = 0
        average = 0
        list_completed = []
            
        archived_cases = BonitaService.archived_cases()

        if archived_cases:
            for ar in archived_cases:
                case_info = BonitaService.case_info(ar['rootCaseId'])
                if 'Generar carpeta fisica' in case_info['flowNodeStatesCounters']:
                    if 'completed' in case_info['flowNodeStatesCounters']['Generar carpeta fisica']:
                        if case_info['flowNodeStatesCounters']['Generar carpeta fisica']['completed'] == 1:
                            count += 1
                            start = ar['start'][:ar['start'].index(".")]
                            start = datetime.datetime.strptime(start, "%Y-%m-%d %H:%M:%S")
                            end = ar['end_date'][:ar['end_date'].index(".")]
                            end = datetime.datetime.strptime(end, "%Y-%m-%d %H:%M:%S")
                            subtract = end - start
                            subtract = str(int(subtract.total_seconds()//60)) +'.'+ str(int(subtract.total_seconds()%60))
                            total_minutes += float(subtract)
                            so = SocietyRegistration.objects.get(caseid=ar['rootCaseId'])
                            list_completed.append(so.anonymous_society.name)
        
        if count != 0 and total_minutes != 0:
            average = total_minutes / count
            average = round(average, 2)

        json = {
                'count': str(count),
                'total_minutes': str(total_minutes),
                'average': str(average),
                'list_completed': list_completed
                }
        return json

    def cases_entrada_escribano(self):

        count_escribano = 0
        list_escribano = []
        count_entrada = 0
        list_entrada  = []

        task1_entrada = "Validacion de formularios de inscripcion"
        task2_entrada = "Generar carpeta fisica"
        task_escribano = "Determinar validez del tramite"
            
        currently_active_cases = BonitaService.currently_active_cases()

        if currently_active_cases:
            for ac in currently_active_cases:
                task = BonitaService.active_cases(ac['id'])
                if task:
                    if task[0]['displayName'] == task1_entrada or task[0]['displayName'] == task2_entrada:
                        count_entrada += 1
                        so = SocietyRegistration.objects.get(caseid=ac['id'])
                        list_entrada.append(so.anonymous_society.name)

                    if task[0]['displayName'] == task_escribano:
                        count_escribano += 1
                        so = SocietyRegistration.objects.get(caseid=ac['id'])
                        list_escribano.append(so.anonymous_society.name)


        json = {
                    'count_entrada': str(count_entrada),
                    'list_entrada': list_entrada,
                    'count_escribano': str(count_escribano),
                    'list_escribano': list_escribano
                }

        return json


    def get(self, request):

        try:
            
            cases_entrada_escribano = self.cases_entrada_escribano()

            completed_cases = self.completed_cases()

            exports = self.exports()

            return Response(
                {
                    "status": True,
                    "payload":
                    {
                        'info_entrada_escribano': cases_entrada_escribano,
                        'info_completed_cases': completed_cases,
                        'info_exports': exports
                    },
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