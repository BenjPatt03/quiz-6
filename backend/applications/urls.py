from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SellerApplicationViewSet

router = DefaultRouter()
router.register(r'', SellerApplicationViewSet, basename='applications')

urlpatterns = [
    path('', include(router.urls)),
]
