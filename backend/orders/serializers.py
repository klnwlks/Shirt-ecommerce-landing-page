from rest_framework import serializers
from .models import Shirt, Order


class ShirtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shirt
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
