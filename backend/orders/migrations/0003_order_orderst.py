# Generated by Django 4.0.6 on 2022-07-13 04:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_remove_order_orderid_remove_shirt_shirtid'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='orderST',
            field=models.BooleanField(default=False),
        ),
    ]
