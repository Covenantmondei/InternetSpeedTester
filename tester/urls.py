from django.urls import path
from .views import InternetSpeedTest

urlpatterns = [
    path("test", InternetSpeedTest.as_view(), name="Test Internet Speed")
]