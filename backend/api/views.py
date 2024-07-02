from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, MarkersSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Marker


class MarkerListCreate(generics.ListCreateAPIView):
    serializer_class = MarkersSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Marker.objects.all()
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.error)
            
class MarkersListByAuthor(generics.ListAPIView):
    serializer_class = MarkersSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Marker.objects.filter(author=user)
            
class MarkerDelete(generics.DestroyAPIView):
    serializer_class = MarkersSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Marker.objects.filter(author=user)
    
class MarkerUpdate(generics.UpdateAPIView):
    serializer_class = MarkersSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Marker.objects.filter(author=user)
        
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]