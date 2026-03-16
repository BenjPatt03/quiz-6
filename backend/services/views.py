from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Service
from .serializers import ServiceSerializer


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Service.objects.all()
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_services(self, request):
        """Get services for the logged-in seller"""
        if request.user.role != 'seller':
            return Response(
                {'detail': 'Only sellers can view their services'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        services = Service.objects.filter(seller=request.user)
        serializer = self.get_serializer(services, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def create_service(self, request):
        """Create a new service (seller only)"""
        if request.user.role != 'seller':
            return Response(
                {'detail': 'Only sellers can create services'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(seller=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['put', 'patch'], permission_classes=[IsAuthenticated])
    def update_service(self, request, pk=None):
        """Update a service (seller only, owner only)"""
        try:
            service = self.get_object()
        except Service.DoesNotExist:
            return Response(
                {'detail': 'Service not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        if service.seller != request.user:
            return Response(
                {'detail': 'You can only update your own services'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = self.get_serializer(service, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    @action(detail=True, methods=['delete'], permission_classes=[IsAuthenticated])
    def delete_service(self, request, pk=None):
        """Delete a service (seller only, owner only)"""
        try:
            service = self.get_object()
        except Service.DoesNotExist:
            return Response(
                {'detail': 'Service not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        if service.seller != request.user:
            return Response(
                {'detail': 'You can only delete your own services'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        service.delete()
        return Response(
            {'message': 'Service deleted successfully'},
            status=status.HTTP_204_NO_CONTENT
        )

