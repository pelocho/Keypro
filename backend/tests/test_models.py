import pytest
from django.contrib.auth.models import User
from api.models import Marker

@pytest.mark.django_db
def test_marker_model():
    user = User.objects.create_user(username='testuser', password='password123')

    marker = Marker.objects.create(
        name='Test Marker',
        description='This is a test marker',
        longitude='1.2345678901',
        latitude='2.3456789012',
        author=user
    )

    assert marker.name == 'Test Marker'
    assert marker.description == 'This is a test marker'
    assert str(marker.longitude) == '1.2345678901'
    assert str(marker.latitude) == '2.3456789012'
    assert marker.author == user

    assert str(marker) == 'Test Marker'
