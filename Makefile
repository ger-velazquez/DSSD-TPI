REACT_PATH = "/home/german/Facultad/4to/SEGUNDO-CUATRIMESTRE/DSSD/Trabajo-Integrador/DSSD-TPI/frontend"
DJANGO_PATH = "/home/german/Facultad/4to/SEGUNDO-CUATRIMESTRE/DSSD/Trabajo-Integrador/DSSD-TPI/DSSD_TPI"
REQUERIMENTS_TXT_PATH = "/home/german/Facultad/4to/SEGUNDO-CUATRIMESTRE/DSSD/Trabajo-Integrador/DSSD-TPI/DSSD_TPI"
venv-up:
	source ./venv/bin/activate

venv-down:
	@deactivate

up-react:
	cd $(REACT_PATH) && npm i && npm start

up-django:
	cd $(REQUERIMENTS_TXT_PATH) && pip3 install -r "requirements.txt" && cd $(DJANGO_PATH) && python3 manage.py runserver