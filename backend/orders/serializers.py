from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.service_name', read_only=True)
    seller_name = serializers.SerializerMethodField()
    buyer_email = serializers.CharField(source='buyer.email', read_only=True)
    
    class Meta:
        model = Order
        fields = ('id', 'buyer', 'buyer_email', 'service', 'service_name', 'seller_name',
                  'paypal_transaction_id', 'price_paid', 'date_purchased')
        read_only_fields = ('id', 'buyer', 'buyer_email', 'service_name', 'seller_name', 'date_purchased')
    
    def get_seller_name(self, obj):
        return f'{obj.service.seller.first_name} {obj.service.seller.last_name}' or obj.service.seller.username
