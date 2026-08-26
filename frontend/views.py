from django.shortcuts import render

# Create your views here.
app_name = 'frontend'

def index(request):
    return render(request, 'frontend/index.html')