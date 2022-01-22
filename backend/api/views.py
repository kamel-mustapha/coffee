from django.shortcuts import render
from django.http import JsonResponse
from api.models import *
from api.serializers import ProdSerial, TableSerial
from rest_framework.parsers import JSONParser
from datetime import datetime
import json


def get_product(req):
    products = Produit.objects.all()
    products_serial = ProdSerial(products, many = True)
    return JsonResponse(products_serial.data, safe = False)

def get_table(req):
    tables = Table.objects.all()
    tables_serial = TableSerial(tables, many = True)
    return JsonResponse(tables_serial.data, safe = False)

def vente(req):
    data = JSONParser().parse(req)
    sold_products = []
    total_vente = 0.0
    total_achat = 0.0
    prod_vendus = 0
    for product in data.get('products'):
        article = Produit.objects.get(id = product.get('id'))
        article.quantite -= product.get('quantite')
        article.save()
        sold_products.append(f'{product.get("quantite")}x{article.nom}')
        total_vente += product.get('quantite') * article.prix
        total_achat += product.get('quantite') * article.prix_achat
        prod_vendus += 1

    Vente.objects.create(
        date = datetime.now(),
        produits = json.dumps(sold_products),
        total_vente = total_vente,
        total_achat = total_achat,
        total_benefice = total_vente - total_achat
    )

    recette = Recette.objects.get_or_create(
        date = datetime.now()
    )
    
    if not recette[0].produits_vendus:
        recette[0].produits_vendus = prod_vendus
    else:
        recette[0].produits_vendus += prod_vendus
    
    if not recette[0].total_vente:
        recette[0].total_vente = total_vente
    else:
        recette[0].total_vente += total_vente
    
    if not recette[0].total_achat:
        recette[0].total_achat = total_achat
    else:
        recette[0].total_achat += total_achat

    if not recette[0].total_benefice:
        recette[0].total_benefice = total_vente - total_achat
    else:
        recette[0].total_benefice += total_vente - total_achat

    recette[0].save()
    return JsonResponse('succes', safe = False)

def index(req):
    return render(req, 'index/index.html')