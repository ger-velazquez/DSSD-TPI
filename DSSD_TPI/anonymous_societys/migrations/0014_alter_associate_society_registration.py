# Generated by Django 3.2.7 on 2021-12-08 16:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('anonymous_societys', '0013_societyregistration_caseid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='associate',
            name='society_registration',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='society_registrations', to='anonymous_societys.societyregistration'),
        ),
    ]
