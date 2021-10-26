# -*- coding: utf-8 -*-
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework.response import Response

from .bonita_service import BonitaService
from anonymous_societys.models import *
from django.conf import settings

import base64
from django.core.files.base import ContentFile

from anonymous_societys.serializers import (
    SocietyRegistrationSerializer
)



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


            bonita = BonitaService()

            logged = bonita.login()

            if logged:

                bonita.get_process_id()

                bonita_set_variables = bonita.set_variables([
                    {"name":"idSolicitudSociedad","value": society_re.id}
                ])

                if bonita_set_variables == 200:
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


        if hash:
            return SocietyRegistration.objects.filter(hash=hash)
        if id: 
            return SocietyRegistration.objects.filter(id=id)
        else:
            return SocietyRegistration.objects.filter(status=1)

