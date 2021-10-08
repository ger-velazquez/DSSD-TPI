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

    @classmethod
    def create(cls, name):
        status = cls.objects.create(
            name=name,
        )
        return status


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

    @classmethod
    def create(cls, name, statute, real_address, legal_address, email, legal_representative = None):
        a_society = cls.objects.create(
            name=name,
            statute=statute,
            real_address=real_address,
            legal_address=legal_address,
            email=email,
            legal_representative =legal_representative
        )
        return a_society


class SocietyRegistration(models.Model):
    anonymous_society = models.ForeignKey(AnonymousSociety, on_delete=models.CASCADE)
    status = models.ForeignKey(Status, on_delete=models.CASCADE)
    due_date = models.DateField()
    observation = models.CharField(max_length=255)
    file_number = models.CharField(max_length=255)

    @classmethod
    def create(cls, status, due_date, observation, file_number, anonymous_society=None):
        society_re = cls.objects.create(
            status=status,
            due_date=due_date,
            observation=observation,
            file_number=file_number,
            anonymous_society=anonymous_society
        )
        return society_re


class Associate(models.Model):
    name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    percentage = models.IntegerField()
    society_registration = models.ForeignKey(SocietyRegistration, on_delete=models.CASCADE)

    def __str__(self):
        return self.name + ' ' + self.last_name

    @classmethod
    def create(cls, name, last_name, percentage, society_registration=None):
        associate = cls.objects.create(
            name=name,
            last_name=last_name,
            percentage=percentage,
            society_registration=society_registration
        )
        return associate



class Export(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    state = models.CharField(max_length=255)
    anonymous_society = models.ForeignKey(AnonymousSociety, on_delete=models.CASCADE)

    @classmethod
    def create(cls, country, state, anonymous_society=None):
        export = cls.objects.create(
            country=country,
            state=state,
            anonymous_society=anonymous_society
        )
        return export
