from django.core.management.base import BaseCommand
from django.core.management import CommandError
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Update password of the provided username.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--username', dest='username', default=None,
            help='Specifies the username to be updated.',
        )

        parser.add_argument(
            '--password', dest='password', default=None,
            help='Specifies the password to be updated.',
        )

    def handle(self, *args, **options):
        User = get_user_model()
        password = options.get('password')
        username = options.get('username')

        if not password or not username:
            raise CommandError("You need to specify both password and username.")

        try:
            user = User.objects.get(username=username)
            user.set_password(password)
            user.save()
        except User.DoesNotExist:
            raise CommandError("User not found with the given username.")
