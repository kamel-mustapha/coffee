# Generated by Django 2.2.24 on 2022-01-22 19:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Caisse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('somme', models.FloatField(default=0)),
            ],
            options={
                'verbose_name_plural': 'Caisse',
            },
        ),
        migrations.CreateModel(
            name='Categorie',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Equipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=20)),
                ('reste', models.FloatField(default=0)),
            ],
            options={
                'verbose_name_plural': 'Equipe',
            },
        ),
        migrations.CreateModel(
            name='Recette',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('produits_vendus', models.IntegerField(blank=True, null=True)),
                ('total_vente', models.FloatField(blank=True, null=True)),
                ('total_achat', models.FloatField(blank=True, null=True)),
                ('total_benefice', models.FloatField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Vente',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('produits', models.TextField()),
                ('total_vente', models.FloatField()),
                ('total_achat', models.FloatField()),
                ('total_benefice', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Retrait',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('somme', models.FloatField()),
                ('detail', models.TextField(blank=True, null=True)),
                ('personne', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Produit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=200)),
                ('prix', models.FloatField(default=0)),
                ('prix_achat', models.FloatField(default=0)),
                ('quantite', models.FloatField(blank=True, default=0, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='products/')),
                ('categorie', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.Categorie')),
            ],
        ),
        migrations.CreateModel(
            name='Paiement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('travail', models.FloatField()),
                ('avance', models.FloatField()),
                ('personne', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Equipe')),
            ],
        ),
    ]
