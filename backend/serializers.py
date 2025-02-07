from rest_framework import serializers
from .models import UserProfileModel
from django.contrib.auth.models import User


class ProfileSerializer(serializers.ModelSerializer):

    MedicalID=serializers.CharField(read_only=True)
    QRCode=serializers.ImageField(read_only=True)
    User=serializers.CharField(read_only=True)

    class Meta:
        model=UserProfileModel
        fields=[
           'MedicalID',
           'User',
           'DateOfBirth',
           'Gender',
           'Age',
           'PhoneNumber',
           'Address',
           'Country',
           'MedicalRecord',
           'QRCode',
           'ProfilePic'
        ]

class PaitentRegister(serializers.ModelSerializer):

    Verify=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=[
            'username',
            'password',
            'verify'
        ]
        