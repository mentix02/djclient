from django.urls import path, include

urlpatterns = [
    path("v1/", include("backend.api.v1")),
]
