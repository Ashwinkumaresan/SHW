from django.contrib import admin
from .models import UserProfileModel,MedicalRecordModel,DoctorProfileModel,BlogModel,TagModel
# Register your models here.

admin.site.register(UserProfileModel)
admin.site.register(MedicalRecordModel)
admin.site.register(DoctorProfileModel)
admin.site.register(BlogModel)
admin.site.register(TagModel)
