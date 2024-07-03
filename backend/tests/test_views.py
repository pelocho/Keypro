import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from api.models import Marker
from api.serializers import MarkersSerializer
from django.urls import reverse


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def create_user():
    return User.objects.create_user(username='testuser', password='testpassword')


@pytest.fixture
def create_marker(create_user):
    return Marker.objects.create(
        name='Test Marker',
        description='Test Description',
        longitude=0.0,
        latitude=0.0,
        author=create_user
    )


@pytest.mark.django_db
class TestMarkerListCreate:

    def test_create_marker(self, api_client, create_user):
        api_client.force_authenticate(user=create_user)
        url = reverse('marker-list')
        data = {
            'name': 'New Marker',
            'description': 'New Description',
            'longitude': 1.0,
            'latitude': 1.0,
        }
        response = api_client.post(url, data, format='json')
        assert response.status_code == status.HTTP_201_CREATED


@pytest.mark.django_db
class TestMarkersListByAuthor:

    def test_list_markers_by_author(self, api_client, create_user, create_marker):
        api_client.force_authenticate(user=create_user)
        url = reverse('my-markers-list')
        response = api_client.get(url)
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1  # Verifica que solo haya un marcador para el usuario autenticado


@pytest.mark.django_db
class TestMarkerDelete:

    def test_delete_marker(self, api_client, create_user, create_marker):
        api_client.force_authenticate(user=create_user)
        url = reverse('delete-marker', kwargs={'pk': create_marker.id})
        response = api_client.delete(url)
        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_delete_marker_unauthorized(self, api_client, create_marker):
        url = reverse('delete-marker', kwargs={'pk': create_marker.id})
        response = api_client.delete(url)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
class TestMarkerUpdate:

    def test_update_marker(self, api_client, create_user, create_marker):
        api_client.force_authenticate(user=create_user)
        url = reverse('edit-marker', kwargs={'pk': create_marker.id})
        updated_data = {
            'name': 'Updated Marker',
            'description': 'Updated Description',
            'longitude': 1.0,
            'latitude': 1.0,
        }
        response = api_client.put(url, updated_data, format='json')
        assert response.status_code == status.HTTP_200_OK
        create_marker.refresh_from_db()
        assert create_marker.name == updated_data['name']
        assert create_marker.description == updated_data['description']
        assert float(create_marker.longitude) == updated_data['longitude']
        assert float(create_marker.latitude) == updated_data['latitude']
        
    
@pytest.mark.django_db
class TestCreateUserView:

    def test_create_user(self, api_client):
        url = reverse('register')
        data = {
            'username': 'testuser',
            'password': 'testpassword',
        }
        response = api_client.post(url, data, format='json')
        assert response.status_code == status.HTTP_201_CREATED
        assert User.objects.filter(username='testuser').exists()

    def test_create_user_invalid_data(self, api_client):
        url = reverse('register')
        data = {
            'username': '',
            'password': 'testpassword',
        }
        response = api_client.post(url, data, format='json')
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'username' in response.data