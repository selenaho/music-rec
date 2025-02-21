from django.shortcuts import render

from django.template import loader
from django.http import HttpResponse
from .models import Question

def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    context = {"latest_question_list": latest_question_list}
    return render(request, "home/index.html", context)

def home(request):
    return render(request,"home/home.html")

def account(request):
    return HttpResponse("Hello, world. You're at the account page.")

def results(request):
    response = "Hello, world. You're at the results page."
    return HttpResponse(response)

def share(request):
    return HttpResponse("Hello, world. You're at the share page.")