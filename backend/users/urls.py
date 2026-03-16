from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyTokenObtainPairView, RegisterView, UserProfileView, AdminUserListView

router = DefaultRouter()
router.register(r'register', RegisterView, basename='register')
router.register(r'profile', UserProfileView, basename='profile')
router.register(r'admin/users', AdminUserListView, basename='admin-users')

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
