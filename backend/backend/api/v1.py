from django.urls import path, include

urlpatterns = [
    path("user/", include("user.api.v1.urls")),
    path("api-auth/", include("rest_framework.urls")),
]
