from django.db import models


class Country(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
    @classmethod
    def create(cls, name):
        country = cls.objects.create(
            name=name,
        )
        return country


class Status(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class AnonymousSociety(models.Model):
    name = models.CharField(max_length=128, unique=True)
    date_created = models.DateField(auto_now_add=True)
    statute = models.FileField()
    real_address = models.CharField(max_length=255)
    legal_address = models.CharField(max_length=255)
    legal_representative = models.ForeignKey('Associate', null=True, on_delete=models.CASCADE)
    email = models.EmailField(max_length=255)

    def __str__(self):
        return self.name

    


class SocietyRegistration(models.Model):
    anonymous_society = models.ForeignKey(AnonymousSociety, on_delete=models.CASCADE)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    due_date = models.DateField()
    observation = models.CharField(max_length=255)
    file_number = models.CharField(max_length=255)


class Associate(models.Model):
    name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    percentage = models.IntegerField()
    society_registration = models.ForeignKey(SocietyRegistration, on_delete=models.CASCADE)

    def __str__(self):
        return self.name + ' ' + self.last_name



class Export(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    state = models.CharField(max_length=255)
    anonymous_society = models.ForeignKey(AnonymousSociety, on_delete=models.CASCADE)
