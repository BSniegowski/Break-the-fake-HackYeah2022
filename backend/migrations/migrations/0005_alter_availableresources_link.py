# Generated by Django 4.1.3 on 2022-11-19 21:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('migrations', '0004_alter_availableresources_link'),
    ]

    operations = [
        migrations.AlterField(
            model_name='availableresources',
            name='link',
            field=models.CharField(max_length=2000, unique=True),
        ),
    ]
