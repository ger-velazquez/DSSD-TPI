from rest_framework import serializers
from .models import *


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ('__all__')


class ExportSerializer(serializers.ModelSerializer):
    country = CountrySerializer()


    class Meta:
        model = Export
        fields = ('state', 'country')


class AssociateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Associate
        fields = ('__all__')


class AnonymousSocietySerializer(serializers.ModelSerializer):
    legal_representative = AssociateSerializer()
    export =  ExportSerializer(source='anonymous_society', many=True)

    class Meta:
        model = AnonymousSociety
        fields = ('name', 'date_created', 'statute', 'real_address', 'legal_address', 'email', 'legal_representative', 'export')

class StatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Status
        fields = '__all__'

class SocietyRegistrationSerializer(serializers.ModelSerializer):
    anonymous_society = AnonymousSocietySerializer()
    status = StatusSerializer()
    associate =  AssociateSerializer(source='society_registrations', many=True)

    class Meta:
        model = SocietyRegistration
        fields = ('id', 'due_date', 'observation', 'file_number', 'hash', 'date_created', 'anonymous_society', 'status', 'associate')
