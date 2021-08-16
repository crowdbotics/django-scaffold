from django.contrib.auth.management.commands import createsuperuser
from django.core.management import CommandError
from django.db.models import EmailField


class Command(createsuperuser.Command):
    help = "Crate a superuser, and allow password to be provided"

    def add_arguments(self, parser):
        super().add_arguments(parser)
        parser.add_argument(
            "--password",
            dest="password",
            default=None,
            help="Specifies the password for the superuser.",
        )

    def handle(self, *args, **options):
        password = options.get("password")
        username = email = options.get("email")
        database = options.get("database")

        User = self.UserModel

        username_field_type = type(User._meta.get_field(User.USERNAME_FIELD))
        username, username_type = (
            (email, "email")
            if username_field_type == EmailField
            else (username, "username")
        )

        if not password or not username:
            raise CommandError(
                f"You need to specify both password and {username_type}."
            )
        options.update({User.USERNAME_FIELD: username})
        super().handle(*args, **options)

        if password:
            user = self.UserModel._default_manager.db_manager(database).get(
                **{User.USERNAME_FIELD: username}
            )
            user.set_password(password)
            user.save()
