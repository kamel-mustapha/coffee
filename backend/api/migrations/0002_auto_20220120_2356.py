# Generated by Django 2.2.24 on 2022-01-20 23:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='prix',
            field=models.IntegerField(default=0),
        ),
    ]
