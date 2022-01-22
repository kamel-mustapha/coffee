# Generated by Django 2.2.24 on 2022-01-21 19:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_auto_20220121_1931'),
    ]

    operations = [
        migrations.CreateModel(
            name='Equipe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=20)),
                ('reste', models.FloatField(default=0)),
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