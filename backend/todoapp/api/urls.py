from django.urls import path
from .views import ListCreateTodoView, RetrieveUpdateDestroyTodoView

urlpatterns = [
    path('todos/', ListCreateTodoView.as_view(), name='todo-list-create'),
    path('todos/<int:pk>/', RetrieveUpdateDestroyTodoView.as_view(), name='todo-detail'),
]
