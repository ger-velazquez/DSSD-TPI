from django.conf.urls import url

from api.services.api import (
    BonitaProcessView,
)

app_name = "api"

api_urls = [
    url(
        r'^process$',
        BonitaProcessView.as_view(),
        name='bonita-process'
    )
]