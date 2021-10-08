from django.conf.urls import url

from bonita.api import (
    BonitaProcessView,
)

app_name = "bonita"

bonita_urls = [
    url(
        r'^process$',
        BonitaProcessView.as_view(),
        name='bonita-process'
    )
]