from django.urls import path, include
from django.conf.urls import url
from rest_framework.routers import DefaultRouter

from home.api.v1.viewsets import (
    SignupViewSet, 
    LoginViewSet, 
    HomePageViewSet, 
    CustomTextViewSet, 
    AppReportView,
    FacebookConnect,
    TwitterConnect,
    GithubConnect,    
    InstagramConnect,
    GoogleConnect,
)

router = DefaultRouter()
router.register('signup', SignupViewSet, base_name='signup')
router.register('login', LoginViewSet, base_name='login')
router.register('customtext', CustomTextViewSet)
router.register('homepage', HomePageViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("report", AppReportView.as_view(), name="app_report"),
    url(r'^facebook/connect/$', FacebookConnect.as_view(), name='fb_connect'),
    url(r'^google/connect/$', GoogleConnect.as_view(), name='google_connect'),
    url(r'^twitter/connect/$', TwitterConnect.as_view(), name='twitter_connect'),
    url(r'^github/connect/$', GithubConnect.as_view(), name='github_connect'),
    url(r'^instagram/connect/$', InstagramConnect.as_view(), name='insta_connect'),
]
