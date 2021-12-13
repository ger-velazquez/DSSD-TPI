import requests
import json

from requests.adapters import Response
from requests.sessions import Session

from django.conf import settings


class BonitaService:

    sessionid_class = None
    token_class = None
    userid_class = None

    def __init__(self):
        self.url = settings.BONITA_URL
        self.token = None
        self.sessionid = None
        self.process_id = ''
        self.case_id = ''
        self.human_task_id = ''
        self.display_name = ''
        self.state = ''
        self.userid = None

    def set_sessionid(self, sessionid):
        self.sessionid = sessionid
        self.__class__.sessionid_class = sessionid
    
    def set_userid(self, userid):
        self.userid = userid
        self.__class__.userid_class = userid

    
    def set_token(self, token):
        self.token = token
        self.__class__.token_class = token


    # def login(self):
    #     #con este metodo recibir los datos del frontend y actualizar las variables de self.
    #     if( self.get_sessionid and self.get_token):
    #         self.get_userid
    #         return True
        
    #     return False
    
    def is_logged_in(self):

        return (self.sessionid is not None and self.token is not None)

    def get_process_id(self):

        url = '{}/{}'.format(self.url, 'API/bpm/process')

        payload = {'s': 'Proceso de Inscripcion de SA'}

        cookies = {
            'JSESSIONID': self.sessionid,
            'X-Bonita-API-Token': self.token
        }

        print(" == TEST ==")
        print(self.sessionid)
        print(self.token)
        print(self.userid)
        print("=================")

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

        print("REQUEST")
        print(res)
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

        print("VARIBLES: ")
        print(vars)
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
        print("")
        print("DATOS DE BONITA")
        print("UserId:"+ str(self.userid))
        print("Token:"+str(self.token))
        print("CaseId:"+str(self.case_id))
        print("SessionId:"+str(self.sessionid))
        print("Human Task Id:"+str(self.human_task_id))
        print("======================")
        print("Url:"+url)
        print("")
        
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
                "type": "java.lang.String",
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

        elif(var == 6):
            url = url + '/horasReenvioMesaEntrada'
            data ={  
                "type": "java.lang.String",
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

    @classmethod
    def is_invalid(cls, caseid):

        url = ('{}/{}'.format(settings.BONITA_URL,'API/bpm/humanTask?f=caseId=') + str(caseid) )

        cookies = {
            'JSESSIONID': cls.sessionid_class,
            'X-Bonita-API-Token': cls.token_class
        }

        res = requests.get(
            url,
            cookies=cookies,
            headers={
                "Content-type": "application/json",
                'JSESSIONID': cls.sessionid_class,
                'X-Bonita-API-Token': cls.token_class
            }
        )

        if not res.json():
            return True
        else:
            return False

    @classmethod
    def active_cases(cls, caseid):

        url = ('{}/{}'.format(settings.BONITA_URL,'API/bpm/humanTask?f=caseId=') + str(caseid) )

        cookies = {
            'JSESSIONID': cls.sessionid_class,
            'X-Bonita-API-Token': cls.token_class
        }

        res = requests.get(
            url,
            cookies=cookies,
            headers={
                "Content-type": "application/json",
                'JSESSIONID': cls.sessionid_class,
                'X-Bonita-API-Token': cls.token_class
            }
        )

        return res.json()

    
    @classmethod
    def archived_cases(cls):

        url = ('{}/{}'.format(settings.BONITA_URL,'API/bpm/archivedCase?c=1000'))

        cookies = {
            'JSESSIONID': cls.sessionid_class,
            'X-Bonita-API-Token': cls.token_class
        }

        res = requests.get(
            url,
            cookies=cookies,
            headers={
                "Content-type": "application/json",
                'JSESSIONID': cls.sessionid_class,
                'X-Bonita-API-Token': cls.token_class
            }
        )

        return res.json()

    @classmethod
    def case_info(cls, caseid):

        url = ('{}/{}'.format(settings.BONITA_URL,'API/bpm/caseInfo/') + str(caseid))

        cookies = {
            'JSESSIONID': cls.sessionid_class,
            'X-Bonita-API-Token': cls.token_class
        }

        res = requests.get(
            url,
            cookies=cookies,
            headers={
                "Content-type": "application/json",
                'JSESSIONID': cls.sessionid_class,
                'X-Bonita-API-Token': cls.token_class
            }
        )

        return res.json()

    
    @classmethod
    def currently_active_cases(cls):

        url = ('{}/{}'.format(settings.BONITA_URL,'API/bpm/case?p=0&c=100'))

        cookies = {
            'JSESSIONID': cls.sessionid_class,
            'X-Bonita-API-Token': cls.token_class
        }

        res = requests.get(
            url,
            cookies=cookies,
            headers={
                "Content-type": "application/json",
                'JSESSIONID': cls.sessionid_class,
                'X-Bonita-API-Token': cls.token_class
            }
        )

        return res.json()