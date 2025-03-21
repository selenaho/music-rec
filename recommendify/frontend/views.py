from django.shortcuts import render, redirect

def index(request):
    #return render(request, 'index.html')
    return redirect("http://127.0.0.1:3000/top-artists")