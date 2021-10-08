# -*- coding: utf-8 -*-
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from .bonita_service import BonitaService

from django.conf import settings


class BonitaProcessView(APIView):

    def post(self, request):
        print("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        print (self.request.data.get('name'))
        print(self.request.data)
        first_name = self.request.data.get('firstName')
        last_name = self.request.data.get('lastName')
        percentage = self.request.data.get('percentageOfContributions')
        country = self.request.data.get('country')
        state = self.request.data.get('state')
        name = self.request.data.get('name')
        creation_date = self.request.data.get('creationDate')
        partners = self.request.data.get('partners')
        statute = self.request.data.get('statuteOfConformation')
        legal_address = self.request.data.get('legalDomicile')
        real_address = self.request.data.get('realDomicile')
        legalRepresentative = self.request.data.get('legal_representative')
        email = self.request.data.get('email')
        exports = self.request.data.get('exportLocations')

        try:
            bonita = BonitaService()

            logged = bonita.login()

            if logged:

                bonita.get_process_id()

                bonita_set_variables = bonita.set_variables([
                    {"name":"nombreDeSociedad", "value":"Dato de Prueba SA"},
                    {"name":"estadoInscripcion","value":"false"}
                ])

                if bonita_set_variables == 200:
                    return Response(
                        status=status.HTTP_200_OK
                    )

            else:
                raise

        except Exception as e:
            return Response(
                {'errors': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
