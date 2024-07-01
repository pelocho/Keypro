from django.urls import path
from . import views

urlpatterns = [
    path("markers/", views.MarkerListCreate.as_view(), name="marker-list"),
    path("markers/delete/<int:pk>/", views.MarkerDelete.as_view(), name="delete-marker"),
]
