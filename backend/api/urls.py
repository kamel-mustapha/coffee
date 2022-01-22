from api.views import *
from django.urls import path


urlpatterns = [
    path('products/', get_product),
    path('tables/', get_table),
    path('vente/', vente),
    path('', index)
]
