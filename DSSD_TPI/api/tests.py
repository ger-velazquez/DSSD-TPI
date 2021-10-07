
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient


# este test es para probar entre nosotros, ya que le pega posta a bonita
# es decir no esta mockeado

class BonitaProcessTestCase(APITestCase, APIClient):

    def setUp(self):
         client = APIClient()


    def test_get_fee_promotions_empty(self):
        url = reverse('bonita-process')

        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
