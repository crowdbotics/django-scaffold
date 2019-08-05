from django.contrib.auth.management.commands import createsuperuser
from django.core.management import CommandError
from django.contrib.auth import get_user_model

class Command(createsuperuser.Command):
    help = 'Crate a superuser, and allow password to be provided'

    def add_arguments(self, parser):
        super(Command, self).add_arguments(parser)
        parser.add_argument(
            '--username', dest='username', default=None,
            help='Specifies the email for update.',
        )

        parser.add_argument(
            '--password', dest='password', default=None,
            help='Specifies the password to be updated.',
        )

    def handle(self, *args, **options):
        User = get_user_model()
        password = options.get('password')
        username = options.get('username')
        database = options.get('database')

        if password and not username:
            raise CommandError("--username is required if specifying --password")

        if password:
            try:
                user = User.objects.get(username=username)
                user.set_password(password)
                user.save()
            except User.DoesNotExist:
                continue