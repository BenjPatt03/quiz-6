from rest_framework import serializers
from .models import Service


class ServiceSerializer(serializers.ModelSerializer):
    seller_name = serializers.SerializerMethodField()
    seller_email = serializers.CharField(source='seller.email', read_only=True)
    sample_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Service
        fields = ('id', 'seller', 'seller_name', 'seller_email', 'service_name', 
                  'description', 'price', 'duration_of_service', 'sample_image', 
                  'sample_image_url', 'rating', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at', 'seller_name', 
                           'seller_email', 'sample_image_url')
    
    def get_seller_name(self, obj):
        return f'{obj.seller.first_name} {obj.seller.last_name}' or obj.seller.username
    
    def get_sample_image_url(self, obj):
        if obj.sample_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.sample_image.url)
            return obj.sample_image.url
        return None
