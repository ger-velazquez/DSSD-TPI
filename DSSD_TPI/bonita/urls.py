from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from bonita.api import (
    BonitaProcessView,
    SocietyRegistrationViewSet,
    ValidateRegistrationFormView,
    EmailView,
    ValidateTramiteView,
    GenerateFileNumberView,
    EstampilladoView
)

app_name = "bonita"

router = DefaultRouter()
router.register(r'societies', SocietyRegistrationViewSet, basename='societies')

bonita_urls = [
    url(
        r'^process$',
        BonitaProcessView.as_view(),
        name='bonita-process'
    ),
    url(
        r'^validate-reg-form',
        ValidateRegistrationFormView.as_view(),
        name='validate-reg-form'
    ),
    url(
        r'^validate-tramite',
        ValidateTramiteView.as_view(),
        name='validate-tramite'
    ),
    url(
        r'^estampillado',
        EstampilladoView.as_view(),
        name='estampillado'
    ),
    url(
        r'^generate-file-number',
        GenerateFileNumberView.as_view(),
        name='generate-file-number'
    ),
    url(
        r'^email',
        EmailView.as_view(),
        name='email'
    ),
    url(r'^', include(router.urls)),

]