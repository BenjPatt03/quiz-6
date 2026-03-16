from rest_framework.permissions import BasePermission


class IsSeller(BasePermission):
    """
    Permission to allow only sellers to perform certain actions.
    """
    message = 'Only sellers can perform this action.'

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'seller'


class IsAdmin(BasePermission):
    """
    Permission to allow only admin users to perform certain actions.
    """
    message = 'Only administrators can perform this action.'

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.role == 'admin'


class IsSellerOrReadOnly(BasePermission):
    """
    Permission to allow sellers to create/edit, but allow read access to all.
    """
    def has_permission(self, request, view):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return request.user and request.user.is_authenticated and request.user.role == 'seller'

    def has_object_permission(self, request, view, obj):
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        return obj.seller == request.user
