from django.urls import path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("index/", views.index, name="index"),
    # ex: /polls/account/
    path("account/", views.account, name="account"),
    # ex: /polls/results/
    path("results/", views.results, name="results"),
    # ex: /polls/share/
    path("share/", views.share, name="share"),
]