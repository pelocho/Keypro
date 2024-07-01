from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Marker

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class MarkersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marker
        fields = ["id", "name", "description", "longitude", "latitude", "author"]
        extra_kwargs = {"author": {"read_only": True}}