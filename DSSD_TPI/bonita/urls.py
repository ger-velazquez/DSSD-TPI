from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from bonita.api import (
    BonitaProcessView,
    SocietyRegistrationViewSet,
    ValidateRegistrationFormView
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
    url(r'^', include(router.urls)),

]