from django.urls import path
from . import views

urlpatterns = [
    path("markers/", views.MarkerListCreate.as_view(), name="marker-list"),
    path("markers/delete/<int:pk>/", views.MarkerDelete.as_view(), name="delete-marker"),
    path("markers/edit/<int:pk>/", views.MarkerUpdate.as_view(), name="edit-marker"),
    path("mymarkers/", views.MarkersListByAuthor.as_view(), name="my-markers-list")
]
