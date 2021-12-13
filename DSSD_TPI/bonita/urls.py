from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from bonita.api import (
    AllCountriesView,
    BonitaProcessView,
    SocietyRegistrationViewSet,
    ValidateRegistrationFormView,
    EmailView,
    ValidateTramiteView,
    GenerateFileNumberView,
    EstampilladoView,
    GenerateFolderView,
    LoginView,
    CompletedCasesView,
    CountCaseEntradaEcribanoView
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
    url(
        r'^generate-folder',
        GenerateFolderView.as_view(),
        name='generate-folder'
    ),
    url(
        r'^login$',
        LoginView.as_view(),
        name='login'
    ),
    url(
        r'^completed-cases$',
        CompletedCasesView.as_view(),
        name='completed-cases'
    ),
    url(
        r'^entrada-escribano$',
        CountCaseEntradaEcribanoView.as_view(),
        name='entrada-escribano$'
    ),
    url(r'^', include(router.urls)),
    url(
        r'^all-countries',
        AllCountriesView.as_view(),
        name='all-countries'
    ),
]
