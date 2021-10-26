from rest_framework import serializers
from .models import *

class AssociateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Associate
        fields = ('__all__')


class AnonymousSocietySerializer(serializers.ModelSerializer):
    legal_representative = AssociateSerializer()

    class Meta:
        model = AnonymousSociety
        fields = ('name', 'date_created', 'statute', 'real_address', 'legal_address', 'email', 'legal_representative')

class StatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Status
        fields = '__all__'

class SocietyRegistrationSerializer(serializers.ModelSerializer):
    anonymous_society = AnonymousSocietySerializer()
    status = StatusSerializer()

    class Meta:
        model = SocietyRegistration
        fields = ('id', 'due_date', 'observation', 'file_number', 'hash', 'date_created', 'anonymous_society', 'status')
