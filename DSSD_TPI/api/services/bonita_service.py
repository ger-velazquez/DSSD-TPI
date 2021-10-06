import requests
from requests.adapters import Response
from requests.sessions import Session

def login_bonita():
    data={'username':'walter.bates','password':'bpm'}
    request_login_bonita = requests.post(url='http://localhost:8080/bonita/loginservice', data= data)
    cookies_bonita = dict(request_login_bonita.cookies) 
    return cookies_bonita

def get_process_id_bonita(j_session_id, x_bonita_api_token):
    headers_get = {'JSESSIONID':j_session_id, 'X-Bonita-API-Token':x_bonita_api_token}
    params={'s':'Proceso%20de%20Inscripcion%20de%20SA'}
    request_process_bonita = requests.post(url='http://localhost:8080/bonita/loginservice', params=params, data= data)
    return None
