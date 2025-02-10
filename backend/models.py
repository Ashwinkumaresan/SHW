import qrcode
import os
import random
import string

from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

def generate_MedicalId():
    max_length=5
    while True:
        MedicalId="".join(random.choices(string.ascii_uppercase,k=max_length))
        if(UserProfileModel.objects.filter(MedicalID=MedicalId).count()==0):    
            break
    return MedicalId

choice=(
        ('Male','Male'),
        ('Female','Female'),
        ('Non-Binary','Non-Binary'),
        ('Perfer not to say','Perfer not to say')
    )

class DoctorProfileModel(models.Model):
    User=models.ForeignKey(User,on_delete=models.CASCADE)
    LicenseNumber=models.CharField(max_length=20,primary_key=True)
    Specialization=models.TextField()
    gender=models.CharField(max_length=20,null=True)
    profile=models.ImageField(null=True,blank=True,upload_to="ProfilePic")
    Degree=models.CharField(max_length=20,null=True)

    def __str__(self):
        return f"{self.User.username}-{self.LicenseNumber}"
    


class UserProfileModel(models.Model):
    MedicalID=models.CharField(max_length=7,null=True,blank=True)
    # Gurdian1=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    # Gurdian2=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    # Gurdian3=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    User=models.ForeignKey(User,on_delete=models.CASCADE)
    DateOfBirth=models.DateField(null=True)
    Gender=models.CharField(max_length=20,choices=choice,null=True)
    Age=models.PositiveIntegerField(null=True)
    PhoneNumber=models.CharField(max_length=13,null=True)
    Address=models.TextField(null=True)
    Country=models.CharField(max_length=30,null=True)
    #MedicalRecord=models.ForeignKey(MedicalRecordModel,on_delete=models.CASCADE,null=True,blank=True)
    QRCode=models.ImageField(null=True,upload_to="QRCode",blank=True)
    ProfilePic=models.ImageField(null=True,blank=True,upload_to="ProfilePic")
    

    
    def save(self, *args, **kwargs):
        
        if self.MedicalID is None:
            self.MedicalID=generate_MedicalId()
            URL=f" http://localhost:5173/record/{self.MedicalID}"
            qr = qrcode.QRCode(version=1, box_size=10, border=5)
            qr.add_data(URL)
            qr.make(fit=True)
            img = qr.make_image(fill='black', back_color='white')
            file_name = f'{self.MedicalID}_qr.png'
            file_path = os.path.join(settings.MEDIA_ROOT, 'QRCode', file_name)
            os.makedirs(os.path.dirname(file_path), exist_ok=True)
            img.save(file_path)
            self.QRCode = f'QRCode/{file_name}'
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.MedicalID}){self.User.username}"

class MedicalRecordModel(models.Model):
    UserProfile = models.ForeignKey(UserProfileModel, on_delete=models.CASCADE, related_name="medical_records",null=True,blank=True)
    Doctor=models.ForeignKey(DoctorProfileModel,on_delete=models.CASCADE)
    SensitiveInformation=models.TextField(null=True)
    Date=models.DateTimeField(auto_created=True,auto_now=True,null=True)
    HospitalName=models.CharField(max_length=100,null=True)
    Symptoms=models.TextField(null=True)
    Diagnosis=models.CharField(max_length=100,null=True)
    TestsConducted=models.TextField(null=True)
    TreatmentPlan=models.TextField(null=True)
    AdditionalNotes=models.TextField(null=True)

    def __str__(self):
        return f"{self.pk}){self.Diagnosis}"

class TagModel(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class BlogModel(models.Model):
    Title=models.CharField(max_length=100)
    Author=models.ForeignKey(DoctorProfileModel,on_delete=models.CASCADE)
    Content=models.TextField()
    Image=models.ImageField(upload_to='Blog',null=True,blank=True)
    Tags=models.ForeignKey(TagModel,on_delete=models.CASCADE,null=True,blank=True)
    CreatedAt=models.DateTimeField(auto_created=True,auto_now_add=True)
    Likes=models.PositiveIntegerField(default=0)


    def __str__(self):
        return f"{self.Title}-{self.Author.User.username}"
       