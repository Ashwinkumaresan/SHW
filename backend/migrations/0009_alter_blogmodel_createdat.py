# Generated by Django 5.0.4 on 2025-02-10 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_blogmodel_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogmodel',
            name='CreatedAt',
            field=models.DateTimeField(auto_created=True, auto_now_add=True),
        ),
    ]
