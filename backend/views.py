import json

from django.contrib.auth.models import User
from django.contrib.auth import login ,logout,authenticate
from django.http import JsonResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics,views,serializers,status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated

from .serializers import MyTokenObtainPairSerializer
from .models import UserProfileModel
from .serializers import ProfileSerializer,PaitentRegister
# Create your views here.

class Home(APIView):
    def get(self,request):
        return JsonResponse({"Hello":"Content"})   

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer 
    
class ProfileDetailView(generics.RetrieveAPIView):
    queryset=UserProfileModel.objects.all()
    serializer_class=ProfileSerializer

    def get(self, request, *args, **kwargs):
        auth = self.request.headers.get("Authorization")
        if auth:
            token = auth.split(" ")[1]
            print(token)
        print("check")
        print(self.request.user)
        user=self.request.user
        data=UserProfileModel.objects.get(User=user)
        serilaize=ProfileSerializer(data).data
        serilaize['Login']="success"
        return JsonResponse(serilaize,status=200)
    
ProfileDetailViewClass=ProfileDetailView.as_view()

class LoginView(views.APIView):
    permission_classes=[]

    def post(self, request, *args, **kwargs):

        data=json.loads(request.body)
        username=data.get('username')
        password=data.get('password')

        if not username or not password:
            return JsonResponse({"Login": "Username and password are required."},status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user:
            if user.is_active:
                #token = Token.objects.get_or_create(user=user)
                login(request,user)
                # return JsonResponse({"token": token.key}, status=status.HTTP_200_OK)
                return JsonResponse({"Login":"success","redirect":"/profile"},status=status.HTTP_200_OK)
            else:
                return JsonResponse({"Login": "User account is inactive."},status=status.HTTP_403_FORBIDDEN,)
        else:
            return JsonResponse({"Login": "Invalid username or password."},status=status.HTTP_401_UNAUTHORIZED,)

LoginViewClass=LoginView.as_view()

class LogoutView(views.APIView):
    
    def get(self, request, format=None):
        logout(request)
        return JsonResponse({"Logout":"Success"},status=status.HTTP_200_OK)

LogoutViewClass=LoginView.as_view()

class ProfileUpdate(generics.UpdateAPIView):
    queryset=UserProfileModel.objects.all()
    serializer_class=ProfileSerializer
    lookup_field='MedicalID'

    def get(self, request, *args, **kwargs):
        user=self.request.user

        if user is None or user.is_anonymous:
            return JsonResponse({"Login":"Login Required"},status=status.HTTP_403_FORBIDDEN)
        
        data=UserProfileModel.objects.get(User=user)
        serialize=ProfileSerializer(data).data
        serialize['Login']="success"
        return JsonResponse(serialize,status=status.HTTP_200_OK)
    
    def perform_update(self, serializer):
        return super().perform_update(serializer)

ProfileUpdateClass=ProfileUpdate.as_view()

class paitentRegister(generics.CreateAPIView):

    queryset=User.objects.all()
    serializer_class=PaitentRegister
    permission_classes=[]

    def perform_create(self, serializer):
        username=serializer.validated_data.get("username")
        qs=User.objects.filter(username=username)
        if qs.exists():
            return JsonResponse({"Register":"Username already exisit"},status=status.HTTP_403_FORBIDDEN)
        password=serializer.validated_data.get("password")
        verify=serializer.validated_data.pop('verify_password')
        if(password!=verify):
            return JsonResponse({'Register':"failed check password"},status=status.HTTP_403_FORBIDDEN)
        # super().perform_create(serializer)
        serializer.save()
        print("HELLO CHECK")
        return JsonResponse({'Register':"Success"},status=status.HTTP_200_OK)

paitentRegisterClass=paitentRegister.as_view()