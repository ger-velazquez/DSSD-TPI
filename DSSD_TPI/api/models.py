from django.db import models


class Associate(models.Model):
    name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    percentage = models.DecimalField(decimal_places=2, max_digits=3)

    def __str__(self):
        return self.name + ' ' + self.last_name


class AnonymousSociety(models.Model):
    name = models.CharField(max_length=128, unique=True)
    date_created = models.DateField(auto_now_add=True)
    associates = models.ManyToManyField(Associate, related_name='anonymous_society')
    statute = models.FileField()
    real_address = models.CharField(max_length=255)
    legal_address = models.CharField(max_length=255)
    legal_representative = models.ForeignKey(Associate, on_delete=models.CASCADE)
    email = models.EmailField(max_length=255)
    country = models.CharField(max_length=128, default='Argentina')

    def __str__(self):
        return self.name

