from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from uuid import uuid4
from .models import SellerApplication
from .serializers import SellerApplicationSerializer

User = get_user_model()


class SellerApplicationViewSet(viewsets.ModelViewSet):
    queryset = SellerApplication.objects.all()
    serializer_class = SellerApplicationSerializer
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def apply(self, request):
        """Submit a seller application"""
        user = request.user
        
        # Check if already applied
        if SellerApplication.objects.filter(user=user).exists():
            return Response(
                {'detail': 'You have already applied to be a seller'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if already a seller or admin
        if user.role in ['seller', 'admin']:
            return Response(
                {'detail': 'You are already a seller or admin'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        application = SellerApplication.objects.create(user=user)
        serializer = self.get_serializer(application)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def list_applications(self, request):
        """List all applications (admin only)"""
        if request.user.role != 'admin':
            return Response(
                {'detail': 'Only admins can view applications'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        applications = SellerApplication.objects.all()
        serializer = self.get_serializer(applications, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def approve(self, request, pk=None):
        """Approve a seller application (admin only)"""
        if request.user.role != 'admin':
            return Response(
                {'detail': 'Only admins can approve applications'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        try:
            application = self.get_object()
        except SellerApplication.DoesNotExist:
            return Response(
                {'detail': 'Application not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Update user role and generate merchant_id
        user = application.user
        user.role = 'seller'
        user.merchant_id = uuid4().hex[:12].upper()
        user.save()
        
        # Update application status
        application.status = 'approved'
        application.save()
        
        serializer = self.get_serializer(application)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def decline(self, request, pk=None):
        """Decline a seller application (admin only)"""
        if request.user.role != 'admin':
            return Response(
                {'detail': 'Only admins can decline applications'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        try:
            application = self.get_object()
        except SellerApplication.DoesNotExist:
            return Response(
                {'detail': 'Application not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        # Get decline reason from request data
        decline_reason = request.data.get('decline_reason', '')
        if not decline_reason:
            return Response(
                {'detail': 'decline_reason is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Update application status
        application.status = 'declined'
        application.decline_reason = decline_reason
        application.save()
        
        serializer = self.get_serializer(application)
        return Response(serializer.data, status=status.HTTP_200_OK)

