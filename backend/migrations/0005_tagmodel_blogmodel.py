# Generated by Django 5.1.5 on 2025-02-09 04:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0004_doctorprofilemodel_degree_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='TagModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='BlogModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('CreatedAt', models.DateTimeField(auto_created=True)),
                ('Title', models.CharField(max_length=100)),
                ('Content', models.TextField()),
                ('Image', models.ImageField(blank=True, null=True, upload_to='Blog')),
                ('Author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.doctorprofilemodel')),
                ('Tags', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='backend.tagmodel')),
            ],
        ),
    ]
