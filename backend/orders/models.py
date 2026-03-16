from django.db import models
from django.contrib.auth import get_user_model
from services.models import Service

User = get_user_model()


class Order(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    service = models.ForeignKey(Service, on_delete=models.PROTECT, related_name='orders')
    paypal_transaction_id = models.CharField(max_length=255, unique=True)
    price_paid = models.DecimalField(max_digits=10, decimal_places=2)
    date_purchased = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-date_purchased']
    
    def __str__(self):
        return f'Order {self.id} - {self.buyer.email}'

