from io import BytesIO, StringIO
from django.http import HttpResponse
from django.template.loader import get_template
from django.conf import settings
from xhtml2pdf import pisa
from anonymous_societys.models import SocietyRegistration


def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html  = template.render(context_dict)

    with open('mypdf.pdf', 'wb+') as output:
        pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), output)
    return None

    
def create_pdf(society):
    data = {
        'qr': society.qr,
        'name': society.anonymous_society.name, 
        'date': society.anonymous_society.date_created,
        'associates': society.society_registrations.all(),
    }
    return render_to_pdf('pdf/pdf.html', data)


def send_email(id, content):

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
