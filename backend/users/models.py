from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('seller', 'Seller'),
        ('admin', 'Admin'),
    )
    
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    merchant_id = models.CharField(max_length=50, blank=True, null=True, unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    email = models.EmailField(unique=True)
    
    class Meta:
        ordering = ['-date_joined']
    
    def __str__(self):
        return self.email
