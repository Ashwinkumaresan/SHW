from rest_framework import serializers
from .models import UserProfileModel,MedicalRecordModel,BlogModel,DoctorProfileModel
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.http import JsonResponse


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims (extra user details)
        token['username'] = user.username
        #token['email'] = user.email

        return token

class ProfileSerializer(serializers.ModelSerializer):

    MedicalID=serializers.CharField(read_only=True)
    QRCode=serializers.ImageField(read_only=True)
    User=serializers.CharField(read_only=True)

    class Meta:
        model=UserProfileModel
        fields=[
           'MedicalID',
           'User',
           'Guadian1',
           'Guadian2',
           "Guadian3",
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

class DoctorSerializer(serializers.ModelSerializer):

    class Meta:
        model=DoctorProfileModel
        fields=[
            "User",
            "LicenseNumber",
            "Specialization",
            'gender',
            "profile",
            "Degree",
            "HospitalName",

        ]

class MedicalRecordSerializer(serializers.ModelSerializer):

    #Doctor=serializers.CharField(read_only=True)
    Doctor=DoctorSerializer(read_only=True)
    UserProfile=ProfileSerializer(read_only=True)
    MedicalID=serializers.CharField(write_only=True)
    # UserProfile=ProfileSerializer()
    HospitalName=serializers.CharField(read_only=True)

    class Meta:
        model=MedicalRecordModel
        fields=[
            'Doctor',
            'UserProfile',
            'MedicalID',
            'Date',
            'HospitalName',
            'Symptoms',
            'Diagnosis',
            'TestsConducted',
            'TreatmentPlan',
            'SensitiveInformation',
            'AdditionalNotes'
        ]

    # def create(self, validated_data):
    #     MedicalID=validated_data.pop("UserProfile")
    #     qs=UserProfileModel.objects.filter("MedicalID")
    #     if qs.exists():
    #         qs=UserProfileModel.objects.get("MedicalID")
    #         validated_data['UserProfile']=qs
    #         return super().create(validated_data)
    #     return JsonResponse({""})

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


