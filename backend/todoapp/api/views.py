from django.shortcuts import render
from rest_framework import generics
from .models import Todo
from .serializers import TodoSerializer

# Create your views here.
class ListCreateTodoView(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class RetrieveUpdateDestroyTodoView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    lookup_field = 'pk'
