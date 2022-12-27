from django.conf import settings
from django.shortcuts import reverse

from faker import Faker
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

from user.models import User

fake = Faker()


class UserCreateTest(APITestCase):
    @staticmethod
    def _fake_user_data() -> dict[str, str]:

        # while loops are used to ensure that the fake data is unique
        # probably redundant, but... better safe than sorry

        while User.objects.filter(email=(email := fake.email())).exists():
            continue

        while User.objects.filter(username__iexact=(username := fake.user_name())).exists():
            continue

        return {
            "email": email,
            "username": username,
            "last_name": fake.last_name(),
            "first_name": fake.first_name(),
            "password": settings.TEST_USER_PASSWORD,
        }

    def test_successful_user_creation(self):

        data = self._fake_user_data()
        response = self.client.post(reverse("user-v1:create"), data)

        self.assertEqual(response.status_code, 201)

        # remove password from data
        data.pop("password")

        # check that the response data matches the data we sent
        for key, value in data.items():
            self.assertEqual(response.data[key], value)

        # check auth token
        auth_token = Token.objects.get(user__username=data["username"])
        self.assertEqual(response.data["auth_token"], auth_token.key)

    def test_username_already_exists(self):

        old_user = User.objects.create_user(**self._fake_user_data())

        data = self._fake_user_data() | {"username": old_user.username}
        response = self.client.post(reverse("user-v1:create"), data)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["username"][0], "A user with that username already exists.")

    def test_email_already_exists(self):

        old_user = User.objects.create_user(**self._fake_user_data())

        data = self._fake_user_data() | {"email": old_user.email}
        response = self.client.post(reverse("user-v1:create"), data)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data["email"][0], "user with this email address already exists.")
