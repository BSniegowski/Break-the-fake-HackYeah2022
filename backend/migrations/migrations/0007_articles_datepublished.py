# Generated by Django 4.1.3 on 2022-11-20 00:13

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('migrations', '0006_articles_delete_availableresources'),
    ]

    operations = [
        migrations.AddField(
            model_name='articles',
            name='datePublished',
            field=models.DateField(default=datetime.date(2022, 11, 20)),
        ),
    ]