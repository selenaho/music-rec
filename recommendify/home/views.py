from django.shortcuts import render

from django.http import HttpResponse


def home(request):
    return HttpResponse("Hello, world. You're at the home page.")

def account(request):
    return HttpResponse("Hello, world. You're at the account page.")


def results(request):
    response = "Hello, world. You're at the results page."
    return HttpResponse(response)


def share(request):
    return HttpResponse("Hello, world. You're at the share page.")