# Generated by Django 5.1.6 on 2025-02-12 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0011_merge_20250212_0934'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofilemodel',
            name='Guadian1',
            field=models.CharField(max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='userprofilemodel',
            name='Guadian2',
            field=models.CharField(max_length=10, null=True),
        ),
        migrations.AddField(
            model_name='userprofilemodel',
            name='Guadian3',
            field=models.CharField(max_length=10, null=True),
        ),
    ]
