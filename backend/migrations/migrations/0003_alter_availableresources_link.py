# Generated by Django 4.1.3 on 2022-11-19 21:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('migrations', '0002_rename_availablesources_availableresources'),
    ]

    operations = [
        migrations.AlterField(
            model_name='availableresources',
            name='link',
            field=models.CharField(max_length=2000, unique=True),
        ),
    ]