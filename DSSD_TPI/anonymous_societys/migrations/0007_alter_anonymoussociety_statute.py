# Generated by Django 3.2.7 on 2021-10-13 01:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anonymous_societys', '0006_alter_societyregistration_anonymous_society'),
    ]

    operations = [
        migrations.AlterField(
            model_name='anonymoussociety',
            name='statute',
            field=models.FileField(null=True, upload_to=''),
        ),
    ]