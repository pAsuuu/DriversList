from django.db import models

class Prediction(models.Model):
    driver = models.CharField(max_length=100)
    position = models.IntegerField()
    circuit = models.CharField(max_length=100)
    prediction_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.driver} - Position {self.position} on {self.circuit}"
