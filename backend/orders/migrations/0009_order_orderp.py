# Generated by Django 4.0.6 on 2022-07-17 09:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0008_order_cart'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='orderP',
            field=models.IntegerField(default=0),
        ),
    ]
