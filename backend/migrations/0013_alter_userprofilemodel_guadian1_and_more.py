# Generated by Django 5.0.4 on 2025-02-12 10:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0012_userprofilemodel_guadian1_userprofilemodel_guadian2_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofilemodel',
            name='Guadian1',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='userprofilemodel',
            name='Guadian2',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='userprofilemodel',
            name='Guadian3',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
