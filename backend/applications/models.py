from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class SellerApplication(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('declined', 'Declined'),
    )
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='seller_application')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    decline_reason = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f'{self.user.email} - {self.status}'

