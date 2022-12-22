from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from rest_framework.authtoken.models import Token

from user.models import User


# noinspection PyUnusedLocal
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender: type[User], instance: User = None, created: bool = False, **kwargs):
    if created:
        Token.objects.create(user=instance)
