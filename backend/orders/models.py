from django.db import models


def def_cart():
    return [
        {
            'id': 0,
            'shirtC': 'white',
            'shirtQ': 1,
            'shirtP': 0
        }
    ]


# Create your models here.
class Shirt(models.Model):
    price = models.IntegerField(default=1)
    colors = models.JSONField(default=list)
    stock = models.IntegerField(default=1)
    name = models.CharField(max_length=20, default="shirt")
    sold = models.IntegerField(default=0)

    def _str_(self):
        return self.id


class Order(models.Model):
    name = models.CharField(max_length=120)
    address = models.CharField(max_length=120)
    email = models.CharField(max_length=120)

    orderST = models.BooleanField(default=False)
    orderP = models.IntegerField(default=0)

    cart = models.JSONField(default=def_cart)

    def _str_(self):
        return self.id
