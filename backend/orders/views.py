from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Order
from .serializers import OrderSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['post'])
    def create_order(self, request):
        """Create an order after PayPal payment"""
        user = request.user
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Check if transaction_id already exists
        if Order.objects.filter(paypal_transaction_id=request.data.get('paypal_transaction_id')).exists():
            return Response(
                {'detail': 'This transaction has already been processed'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer.save(buyer=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'])
    def my_orders(self, request):
        """Get all orders for the logged-in user"""
        orders = Order.objects.filter(buyer=request.user)
        serializer = self.get_serializer(orders, many=True)
        return Response(serializer.data)

