from django.core import exceptions as dj_exceptions
from django.contrib.auth.password_validation import validate_password

from rest_framework import serializers

from user.models import User


class UsernameAvailableSerializer(serializers.Serializer):
    available = serializers.BooleanField(read_only=True)
    username = serializers.CharField(max_length=150, required=True, write_only=True)


class UserCreateSerializer(serializers.ModelSerializer):

    auth_token = serializers.StringRelatedField(read_only=True)
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    def create(self, validated_data: dict[str, str]) -> User:
        return User.objects.create_user(**validated_data)

    def validate(self, data: dict[str, str]):
        # here data has all the fields which have validated values,
        # so we can create a User instance out of it
        user = User(**data)

        errors = {}
        password = data.get("password")

        try:
            validate_password(password=password, user=user)
        # the exception raised here is different from serializers.ValidationError
        except dj_exceptions.ValidationError as e:
            errors["password"] = list(e.messages)

        if errors:
            raise serializers.ValidationError(errors)

        return super().validate(data)

    class Meta:
        model = User
        fields = ("username", "password", "auth_token", "email", "first_name", "last_name")
