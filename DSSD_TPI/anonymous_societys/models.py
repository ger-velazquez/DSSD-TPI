from django.db import models

class Country(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

    @classmethod
    def create(cls, name):

        country = cls.objects.filter(name=name)

        if country.exists():
            return country[0]
        else:
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
    date_created = models.DateField()
    statute = models.FileField(upload_to='uploads/', null=True)
    real_address = models.CharField(max_length=255)
    legal_address = models.CharField(max_length=255)
    legal_representative = models.ForeignKey('Associate', null=True, on_delete=models.CASCADE)
    email = models.EmailField(max_length=255)

    def __str__(self):
        return self.name

    @classmethod
    def create(cls, name, real_address, legal_address, email, date_created, statute = None, legal_representative = None):
        a_society = cls.objects.create(
            name=name,
            real_address=real_address,
            legal_address=legal_address,
            email=email,
            date_created = date_created,
            statute = statute,
            legal_representative =legal_representative
        )
        return a_society


class SocietyRegistration(models.Model):
    anonymous_society = models.ForeignKey(AnonymousSociety, on_delete=models.CASCADE, null=True)
    status = models.ForeignKey(Status, default=1, on_delete=models.CASCADE)
    due_date = models.DateField(null=True)
    observation = models.CharField(max_length=255, null=True)
    file_number = models.CharField(max_length=255, null=True)
    date_created = models.DateField(auto_now_add=True)

    def __str__(self):
        return str(self.anonymous_society) + ' -- ' + str(self.status)

    @classmethod
    def create(cls, anonymous_society=None):
        society_re = cls.objects.create(
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
    state = models.CharField(max_length=255, null=True)
    anonymous_society = models.ForeignKey(AnonymousSociety, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.country) + ' -- ' + str(self.anonymous_society)

    @classmethod
    def create(cls, country, state=None, anonymous_society=None):

        c = Country.create(country)

        export = cls.objects.create(
            country=c,
            state=state,
            anonymous_society=anonymous_society
        )
        return export
