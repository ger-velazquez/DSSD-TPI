from rest_framework import serializers
from .models import *
from bonita.bonita_service import BonitaService


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
    is_invalid = serializers.SerializerMethodField()

    class Meta:
        model = SocietyRegistration
        fields = ('id', 'due_date', 'observation', 'file_number', 'hash', 'date_created', 'anonymous_society', 'status', 'qr', 'caseid', 'is_invalid', 'associate')

    def get_is_invalid(self, obj):
        return BonitaService.is_invalid(obj.caseid)


STATUS_CHOICES =( 
    ("accept"), 
    ("reject"), 
)

class ValidateRegistrationFormSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices = STATUS_CHOICES)
    id = serializers.IntegerField()
    observation = serializers.CharField(required=False, allow_blank=True)
    time = serializers.CharField()

    def validate_id(self, value):
        try:
            SocietyRegistration.objects.get(id=value)
        except SocietyRegistration.DoesNotExist:
            raise serializers.ValidationError(
                ("There is no society with this ID")
            )
        return value


class ValidateTramiteSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices = STATUS_CHOICES)
    id = serializers.IntegerField()
    observation = serializers.CharField(required=False, allow_blank=True)
    
    def validate_id(self, value):
        try:
            SocietyRegistration.objects.get(id=value)
        except SocietyRegistration.DoesNotExist:
            raise serializers.ValidationError(
                ("There is no society with this ID")
            )
        return value

class EmailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    content = serializers.CharField()

    def validate_id(self, value):
        try:
            SocietyRegistration.objects.get(id=value)
        except SocietyRegistration.DoesNotExist:
            raise serializers.ValidationError(
                ("There is no society with this ID")
            )
        return value

class GenerateFileNumberSerializer(serializers.Serializer):
    id = serializers.IntegerField()

    def validate_id(self, value):
        try:
            SocietyRegistration.objects.get(id=value)
        except SocietyRegistration.DoesNotExist:
            raise serializers.ValidationError(
                ("There is no society with this ID")
            )
        return value

class EstampilladoSerializer(serializers.Serializer):
    id = serializers.IntegerField()

    def validate_id(self, value):
        try:
            SocietyRegistration.objects.get(id=value)
        except SocietyRegistration.DoesNotExist:
            raise serializers.ValidationError(
                ("There is no society with this ID")
            )
        return value


class GenerateFolderSerializer(serializers.Serializer):
    id = serializers.IntegerField()

    def validate_id(self, value):
        try:
            SocietyRegistration.objects.get(id=value)
        except SocietyRegistration.DoesNotExist:
            raise serializers.ValidationError(
                ("There is no society with this ID")
            )
        return value


class LoginSerializer(serializers.Serializer):
    sessionid = serializers.CharField()
    token = serializers.CharField()
    userid = serializers.CharField()
