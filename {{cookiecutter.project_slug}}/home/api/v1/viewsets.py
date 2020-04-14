from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet

from home.api.v1.serializers import (
    CustomTextSerializer,
    HomePageSerializer,
)
from home.models import CustomText, HomePage


class CustomTextViewSet(ModelViewSet):
    serializer_class = CustomTextSerializer
    queryset = CustomText.objects.all()
    permission_classes = [IsAdminUser]
    http_method_names = ["get", "put", "patch"]


class HomePageViewSet(ModelViewSet):
    serializer_class = HomePageSerializer
    queryset = HomePage.objects.all()
    permission_classes = [IsAdminUser]
    http_method_names = ["get", "put", "patch"]
