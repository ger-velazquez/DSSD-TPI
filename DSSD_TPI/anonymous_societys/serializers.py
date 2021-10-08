from rest_framework import serializers
from .models import Associate

class AssociateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Associate
        fields = ('id', 'name', 'last_name', 'percentage')