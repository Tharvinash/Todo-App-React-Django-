from django.db import models

# Create your models here.
class Todo(models.Model):
    STATUS_CHOICES = [
        ('NS', 'Not Started'),
        ('IP', 'In Progress'),
        ('C', 'Completed'),
    ]

    task_desc = models.CharField(max_length=255)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES, default='NS')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.task