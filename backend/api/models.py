from datetime import date
from distutils.command.upload import upload
from django.db import models
from django.contrib.auth.models import User

class Categorie(models.Model):
    nom = models.CharField(max_length = 200)
    def __str__(self):
        return self.nom

class Produit(models.Model):
    nom = models.CharField(max_length = 200)
    prix = models.FloatField(default = 0)
    prix_achat = models.FloatField(default = 0)
    quantite = models.FloatField(default = 0, blank=True, null=True)
    image = models.ImageField(upload_to = "products/", blank=True, null=True)
    categorie = models.ForeignKey(Categorie, blank = True, null = True, on_delete = models.SET_NULL)
    def __str__(self):
        return self.nom


class Table(models.Model):
    numero = models.CharField(max_length = 20)
    def __str__(self):
        return self.numero

class Vente(models.Model):
    date = models.DateField()
    produits = models.TextField()
    total_vente = models.FloatField()
    total_achat = models.FloatField()
    total_benefice = models.FloatField()

class Recette(models.Model):
    date = models.DateField()
    produits_vendus = models.IntegerField(blank = True, null = True)
    total_vente = models.FloatField(blank = True, null = True)
    total_achat = models.FloatField(blank = True, null = True)
    total_benefice = models.FloatField(blank = True, null = True)

class Equipe(models.Model):
    nom = models.CharField(max_length = 20)
    reste = models.FloatField(default = 0)
    def __str__(self):
        return self.nom
    class Meta:
        verbose_name_plural = "Equipe"

class Paiement(models.Model):
    date = models.DateField()
    personne = models.ForeignKey(Equipe, on_delete = models.CASCADE)
    travail = models.FloatField()
    avance = models.FloatField()
    def save(self, *args, **kwargs):
        equipe = Equipe.objects.get(nom = self.personne)
        equipe.reste += self.travail - self.avance
        equipe.save()
        super().save(*args, **kwargs)


class Caisse(models.Model):
    somme = models.FloatField(default = 0)
    class Meta:
        verbose_name_plural = "Caisse"
class Retrait(models.Model):
    date = models.DateField()
    somme = models.FloatField()
    personne = models.ForeignKey(User, on_delete = models.SET_NULL, null = True, blank = True)
    detail = models.TextField(null = True, blank = True)
    def save(self, *args, **kwargs):
        caisse = Caisse.objects.get_or_create(id = 1)
        caisse[0].somme -= self.somme
        caisse[0].save()
        super().save(*args, **kwargs)
    