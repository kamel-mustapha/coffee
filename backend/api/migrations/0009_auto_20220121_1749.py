# Generated by Django 2.2.24 on 2022-01-21 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_produit_prix_achat'),
    ]

    operations = [
        migrations.AlterField(
            model_name='produit',
            name='prix',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='produit',
            name='prix_achat',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='produit',
            name='quantite',
            field=models.FloatField(blank=True, default=0, null=True),
        ),
    ]