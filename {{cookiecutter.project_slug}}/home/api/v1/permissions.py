import os
import hmac

from rest_framework.permissions import BasePermission


class CrowboticsExclusive(BasePermission):
    def has_permission(self, request, view):
        header_signature = request.META.get("HTTP_CB_SIGNATURE", None)
        secret = os.environ.get("CROWDBOTICS_SECRET", None)
        sha_name, signature = header_signature.split("=")
        mac = hmac.new(str(secret).encode("ascii"), digestmod="sha1")
        digest = mac.hexdigest()

        if (
                not header_signature or
                not secret or
                not sha_name == "sha1" or
                not str(signature) == digest
        ):
            return False
        return True
