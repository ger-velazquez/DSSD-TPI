# -*- coding: utf-8 -*-
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework.response import Response

from .bonita_service import BonitaService
from anonymous_societys.models import *
from django.conf import settings

import base64
import requests
from django.core.files.base import ContentFile

from anonymous_societys.serializers import (
    SocietyRegistrationSerializer,
    ValidateRegistrationFormSerializer,
    EmailSerializer,
    ValidateTramiteSerializer
)

bonita = BonitaService()

class BonitaProcessView(APIView):

    def post(self, request):
        print(self.request.data)
        try:
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

            logged = bonita.login()

            if logged:

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
                    society.generate_file_number()
                    #aca setea
                    bonita.set_var(2,"True")

                else:
                    st = Status.objects.get(id=3)
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


class EmailView(APIView):
    serializer_class = EmailSerializer

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        content = request.data.get('content', None)
        id = request.data.get('id', None)

        try:
            society = SocietyRegistration.objects.get(id=id)
            
            society.anonymous_society.email

            import smtplib

            FROM = settings.EMAIL_USER
            TO = society.anonymous_society.email
            SUBJECT = 'dssd'
            TEXT = content

            # Prepare actual message
            message = 'From: {}\r\nTo: {}\r\nSubject: {}\r\n{}'.format(FROM, TO, SUBJECT,TEXT)

            print (message)

            server = smtplib.SMTP("smtp.gmail.com", 587)
            server.ehlo()
            server.starttls()
            server.login(settings.EMAIL_USER, settings.EMAIL_PASS)
            server.sendmail(FROM, TO, message)
            server.close()

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

                #bonita.get_human_task()
                #bonita.assign_task()
                #bonita.execute_task()

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


# class EstampilladoView(APIView):
#     serializer_class = ValidateTramiteSerializer


#     def post(self, request):

#         serializer = self.serializer_class(data=request.data)
#         serializer.is_valid(raise_exception=True)

#         status_data = request.data.get('status', None)
#         id = request.data.get('id', None)

#         try:
#             society = SocietyRegistration.objects.get(id=id)
#             if status_data == 'accept':
#                 #setear en bonitaaaaa???
#                 return

#             return Response(
#                     {
#                         "status": True,
#                         "payload": {},
#                         "errors": [],
#                     },
#                     status=status.HTTP_200_OK
#             )
           
#         except Exception as e:
#             return Response(
#                 {
#                     "status": False,
#                     "payload": {},
#                     "errors": str(e),
#                 },
#                 status=status.HTTP_400_BAD_REQUEST
#             )
