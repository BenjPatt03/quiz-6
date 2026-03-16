from rest_framework import serializers
from .models import SellerApplication
from django.contrib.auth import get_user_model

User = get_user_model()


class SellerApplicationSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)
    user_username = serializers.CharField(source='user.username', read_only=True)
    user_first_name = serializers.CharField(source='user.first_name', read_only=True)
    user_last_name = serializers.CharField(source='user.last_name', read_only=True)
    
    class Meta:
        model = SellerApplication
        fields = ('id', 'user', 'user_email', 'user_username', 'user_first_name', 
                  'user_last_name', 'status', 'decline_reason', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at', 'user_email', 'user_username', 
                           'user_first_name', 'user_last_name')
