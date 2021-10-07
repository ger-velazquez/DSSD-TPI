# -*- coding: utf-8 -*-
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from .bonita_service import BonitaService

from django.conf import settings


class BonitaProcessView(APIView):

    def post(self, request):
        #prueba = self.request.data.get('prueba')

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
