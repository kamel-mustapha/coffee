from rest_framework import serializers
from api.models import Produit, Table


class ProdSerial(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = '__all__'

class TableSerial(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'