from django.db import models
from django.contrib.auth.models import User

class Marker(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    longitude = models.DecimalField(max_digits=20, decimal_places=10)
    latitude = models.DecimalField(max_digits=20, decimal_places=10)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="markers")
    
    def __str__(self):
        return self.name
