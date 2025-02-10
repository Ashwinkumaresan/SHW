from rest_framework import serializers
from .models import UserProfileModel,MedicalRecordModel,BlogModel
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
           'QRCode',
           'ProfilePic'
        ]

class PaitentRegister(serializers.ModelSerializer):

    verify_password=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=[
            'username',
            'password',
            'verify_password'
        ]
        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims (extra user details)
        token['username'] = user.username
        #token['email'] = user.email

        return token

class MedicalRecordSerializer(serializers.ModelSerializer):

    class Meta:
        model=MedicalRecordModel
        fields=[
            'Doctor',
            'UserProfile',
            'SensitiveInformation',
            'Date',
            'HospitalName',
            'Symptoms',
            'Diagnosis',
            'TestsConducted',
            'TreatmentPlan',
            'AdditionalNotes'
        ]

class BlogSerializer(serializers.ModelSerializer):

    Author=serializers.CharField(read_only=True)
    Likes=serializers.IntegerField(read_only=True)
    CreatedAt=serializers.DateTimeField(read_only=True)

    class Meta:
        model=BlogModel
        fields=[
            'pk',
            'Title',
            'Author',
            'Content',
            'Image',
            'Tags',
            'CreatedAt',
            'Likes'
        ]


