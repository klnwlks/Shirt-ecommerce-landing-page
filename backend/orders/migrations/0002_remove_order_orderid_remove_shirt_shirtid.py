# Generated by Django 4.0.6 on 2022-07-13 04:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='orderID',
        ),
        migrations.RemoveField(
            model_name='shirt',
            name='shirtID',
        ),
    ]