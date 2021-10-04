from django.shortcuts import render
from rest_framework import viewsets
from .serializers import AssociateSerializer
from .models import Associate
# Create your views here.

class AssociateView(viewsets.ModelViewSet):
    serializer_class = AssociateSerializer
    queryset = Associate.objects.all()
