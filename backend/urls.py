from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns=[
    path('',views.Home.as_view()),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/',views.ProfileDetailViewClass,name="Profile page"),
    path('login/',views.LoginViewClass,name="Login"),
    path('signup/',views.paitentRegisterClass,name="paitent Register"),
    path('profile/update/<str:MedicalID>',views.ProfileUpdateClass,name="Update the profile")
]