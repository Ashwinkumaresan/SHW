from rest_framework import serializers
from .models import UserProfileModel
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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
        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims (extra user details)
        token['username'] = user.username
        #token['email'] = user.email

        return token
