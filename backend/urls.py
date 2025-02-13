from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns=[
    path('',views.Home.as_view()),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/',views.ProfileDetailViewClass,name="Profile page"),
    path('profile/doctor/',views.DoctorProfileClass,name="Doctor Profile page"),
    path('login/',views.LoginViewClass,name="Login"),
    path('login/doctor/',views.DoctorLoginViewClass,name="Doctor Login"),
    path('signup/',views.paitentRegisterClass,name="paitent Register"),
    path('profile/update/<str:MedicalID>',views.ProfileUpdateClass,name="Update the profile"),
    path('record/histroy/',views.RecordHistroyClass,name="Medical Record Histroy"),
    path('record/detail/<str:MedicalID>',views.RecordDetailClass,name="Medical Record"),
    path('record/create',views.CreateRecordClass,name="Create a Record"),
    path('blog/',views.ListBlogClass,name="List blog"),
    path('blog/create/',views.CreateBlogClass,name="Create a blog"),
    path('blog/<int:pk>',views.DetailBlogClass,name="Detail blog"),
    path('blog/delete/<int:pk>',views.DeleteBlogClass,name="Delete blog"),
    path('meet',views.MeetLinkClass,name="Meet"),
    path('meet/remove',views.RemoveLinkClass,name="Remove link"),

    


    path("send-sms/", views.send_sms, name="send_sms"),
]