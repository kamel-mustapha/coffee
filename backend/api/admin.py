from django.contrib import admin
from api.models import *


admin.site.register(Table)
admin.site.register(Categorie)

@admin.register(Produit)
class ProduitAdmin(admin.ModelAdmin):
    list_display = (
        'nom',
        'quantite',
        'prix',
        'prix_achat',   
        'categorie'
    )
    list_filter = ('categorie',)

    list_editable = (
        'quantite',
    )

@admin.register(Vente)
class VenteAdmin(admin.ModelAdmin):
    list_display = (
        'date',
        'total_vente',
        'total_achat',
        'total_benefice'
    )
    readonly_fields = (
        'date',
        'produits',
        'total_vente',
        'total_achat',
        'total_benefice'
    )
    list_filter = ('date',)

@admin.register(Recette)
class RecetteAdmin(admin.ModelAdmin):
    list_display = (
        'date',
        'produits_vendus',
        'total_vente',
        'total_achat',
        'total_benefice'
    )
    readonly_fields = (
        'date',
        'produits_vendus',
        'total_vente',
        'total_achat',
        'total_benefice'
    )
    list_filter = ('date',)

@admin.register(Equipe)
class EquipeAdmin(admin.ModelAdmin):
    list_display = (
        'nom',
        'reste',
    )

@admin.register(Paiement)
class PaiementAdmin(admin.ModelAdmin):
    list_display = (
        'personne',
        'date',
        'travail',
        'avance',
    )
    list_filter = ('date',)
    
@admin.register(Retrait)
class RetraitAdmin(admin.ModelAdmin):
    list_display = (
        'date',
        'somme',
    )
    list_filter = ('date',)
    