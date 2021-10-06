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

        url = '{}/{}'.format(self.url, 'API/bpm/case')

        data ={"processDefinitionId":"7339310545755581978",
                "variables":[
                    {
                        "name":"nombreDeSociedad",
                        "value":"Dato de Prueba SA"
                    },
                    {
                        "name":"estadoInscripcion",
                        "value":"false"
                    }
                ]
         }


        cookies = {
            'JSESSIONID': self.sessionid,
            'X-Bonita-API-Token': self.token
        }

        res = requests.post(
            url,
            json=data,
            cookies=cookies,
            headers={
                "Content-Type": "application/json",
                'JSESSIONID': self.sessionid,
                'X-Bonita-API-Token': self.token
            },
        )

        return res.status_code

    
    # def get_human_task(self):

    #     url = '{}/{}'.format(self.url, '/API/bpm/humanTask') 

    #     payload = {'f': 'caseId=3003'}

    #     cookies = {
    #         'JSESSIONID': self.sessionid,
    #         'X-Bonita-API-Token': self.token
    #     }

    #     res = requests.get(
    #         url,
    #         cookies=cookies,
    #         headers={
    #             "Content-type": "application/json",
    #             'JSESSIONID': self.sessionid,
    #             'X-Bonita-API-Token': self.token
    #         },
    #         params=payload
    #     )

    #     self.human_task_id = res.json()[0].get('id')
