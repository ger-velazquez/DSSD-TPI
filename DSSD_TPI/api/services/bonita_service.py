import requests
import json

from requests.adapters import Response
from requests.sessions import Session

from django.conf import settings


class BonitaService:

    def __init__(self):
        self.url = settings.BONITA_URL
        self.token = ''
        self.sessionid = ''
        self.process_id = ''
        self.case_id = ''

    def login(self):
        data = {
            'username': settings.BONITA_USERNAME,
            'password': settings.BONITA_PASSWORD,
            }

        url = '{}/{}'.format(self.url, 'loginservice')

        res = requests.post(
            url,
            data=data,
            headers={
                "Content-Type": "application/x-www-form-urlencoded"
            }
        )

        self.sessionid = res.cookies.get('JSESSIONID')
        self.token = res.cookies.get('X-Bonita-API-Token', '')


    def get_process_id(self):

        url = '{}/{}'.format(self.url, 'API/bpm/process')

        payload = {'s': 'Proceso de Inscripcion de SA'}

        cookies = {
            'JSESSIONID': self.sessionid,
            'X-Bonita-API-Token': self.token
        }

        res = requests.get(
            url,
            cookies=cookies,
            headers={
                "Content-type": "application/json",
                'JSESSIONID': self.sessionid,
                'X-Bonita-API-Token': self.token
            },
            params=payload
        )

        self.process_id = res.json()[0].get('id')

    def instantiation(self):

        url = '{}/{}/{}/{}'.format(self.url, 'API/bpm/process', self.process_id, 'instantiation')

        cookies = {
            'JSESSIONID': self.sessionid,
            'X-Bonita-API-Token': self.token
        }

        res = requests.post(
            url,
            cookies=cookies,
            headers={
                "Content-type": "application/json",
                'JSESSIONID': self.sessionid,
                'X-Bonita-API-Token': self.token
            },
        )

        self.case_id = res.json().get('caseId')

    def set_variables(self):

        url = '{}/{}'.format(self.url, 'bonita/API/bpm/case')

        data = {
            "processDefinitionId": self.process_id,
            "variables":[
                    {
                        "nombreDeSociedad":"nombreSociedad",
                        "value":"Jorgito SA"
                    },
                    {
                        "name":"estadoInscripcion",
                        "value": "true"
                    },
                ]
            }


        cookies = {
            'JSESSIONID': self.sessionid,
            'X-Bonita-API-Token': self.token
        }

        res = requests.post(
            url,
            data=data,
            cookies=cookies,
            headers={
                "Content-Type": "application/x-www-form-urlencoded",
                'JSESSIONID': self.sessionid,
                'X-Bonita-API-Token': self.token
            },
        )

        self.case_id = res

