# Generated by Django 3.2.7 on 2021-12-05 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('anonymous_societys', '0012_alter_societyregistration_qr'),
    ]

    operations = [
        migrations.AddField(
            model_name='societyregistration',
            name='caseid',
            field=models.IntegerField(null=True),
        ),
    ]
