from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse

# Create your views here.


def index(request):
    if not request.user.is_authenticated:
        return redirect('/mainapp/login/')
    return render(request, 'frontend/index.html')


def login_user(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/mainapp/')
        else:
            return JsonResponse({'message': 'Wrong credentials or whatever..'})
    return render(request, 'frontend/login_user.html')


def logout_user(request):
    logout(request)
    return redirect('/mainapp/login/')
