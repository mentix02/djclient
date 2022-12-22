from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

from user.models import User
from user.api.v1.serializers import UserCreateSerializer, UsernameAvailableSerializer


class UsernameAvailableAPIView(APIView):

    permission_classes = (AllowAny,)
    serializer_class = UsernameAvailableSerializer

    def get(self, request: Request) -> Response:
        serializer = self.serializer_class(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data["username"]
        available = not User.objects.filter(username__iexact=username).exists()

        return Response({"available": available})


class CustomAuthTokenAPIView(ObtainAuthToken):
    def post(self, request: Request, *args, **kwargs) -> Response:

        serializer = self.serializer_class(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)

        user: User = serializer.validated_data["user"]
        token, created = Token.objects.get_or_create(user=user)

        return Response({"auth_token": token.key, "user_id": user.pk, "username": user.username})


class UserCreateAPIView(CreateAPIView):
    queryset = User.objects.none()
    permission_classes = (AllowAny,)
    serializer_class = UserCreateSerializer
