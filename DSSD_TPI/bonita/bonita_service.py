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
        self.human_task_id = ''
        self.display_name = ''
        self.state = ''
        self.userid = ''

    def get_sessionid(self):

        url = ('{}/{}/{}/{}'.format(self.url,'API/bpm/caseVariable/',str(self.case_id),'jsessionid'))

        res = requests.get(
            url,
            headers={
                "Content-type": "application/json",
            }
        )

        self.sessionid = res.json()[0].get('value')
        return True 

    def get_token(self):

        url = ('{}/{}/{}/{}'.format(self.url,'API/bpm/caseVariable/',str(self.case_id),'token'))

        res = requests.get(
            url,
            headers={
                "Content-type": "application/json",
            }
        )

        self.token = res.json()[0].get('value')  
        return True      


    def get_userid(self):

        url = ('{}/{}/{}/{}'.format(self.url,'API/bpm/caseVariable/',str(self.case_id),'usuarioid'))

        res = requests.get(
            url,
            headers={
                "Content-type": "application/json",
            }
        )

        self.userid = res.json()[0].get('value') 
        return True 

    def login(self):

        if( self.get_sessionid and self.get_token):
            self.get_userid
            return True
        
        return False

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


    def set_variables(self, vars):

        url = '{}/{}'.format(self.url, 'API/bpm/case')

        data ={
            "processDefinitionId": self.process_id,
            "variables": vars
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

    
    def get_human_task(self):

        url = ('{}/{}'.format(self.url,'API/bpm/humanTask?f=caseId=') + str(self.case_id) )

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
            }
        )

        self.human_task_id = res.json()[0].get('id')

    
    def assign_task(self):

        url = ('{}/{}'.format(self.url, 'API/bpm/userTask/')) + str(self.human_task_id)
        
        cookies = {
            'JSESSIONID': self.sessionid,
            'X-Bonita-API-Token': self.token
        }

        data = {
             "assigned_id": str(self.userid)
        }

        res = requests.put(
            url,
            cookies=cookies,
            json= data,
            headers={
                "Content-type": "application/json",
                'JSESSIONID': self.sessionid,
                'X-Bonita-API-Token': self.token
            },
        )

        if(res.status_code == 200):
            return 'Assigned'
        else:
            return 'Rejected'
        
    def execute_task(self):
 
        url = ('{}/{}/{}/{}'.format(self.url, 'API/bpm/userTask',str(self.human_task_id),'execution'))

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

        print(url)

        if(res.status_code == 204):
            return 'Execute'
        else:
            return 'Rejected'  


    def set_var(self, var, value):
        url = ('{}/{}/{}'.format(self.url, 'API/bpm/caseVariable',str(self.case_id)))

        if(var == 1):
            url = url + '/idSolicitudSociedad'
            data ={  
                "type": "java.lang.Integer",
                "value": str(value)
            }

        elif(var == 2):
            url = url + '/inscripcionValida'
            data ={  
                "type": "java.lang.Boolean",
                "value": str(value)
            }

        elif(var == 3):
            url = url + '/tramiteValido'
            data ={  
                "type": "java.lang.Boolean",
                "value": str(value)
            }
           
        elif(var == 4):
            url = url + '/emailSA'
            data ={  
                "type": "java.lang.String",
                "value": str(value)
            }   

        elif(var == 5):
            url = url + '/plazoDeCorreccionEnMesaDeEntrada'
            data ={  
                "type": "java.lang.Long",
                "value": str(value)
            }            

        cookies = {
            'JSESSIONID': self.sessionid,
            'X-Bonita-API-Token': self.token
        }
        
        res = requests.put(
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