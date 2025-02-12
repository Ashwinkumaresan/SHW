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
from .models import UserProfileModel,MedicalRecordModel,BlogModel,DoctorProfileModel
from .serializers import ProfileSerializer,PaitentRegister,MedicalRecordSerializer,BlogSerializer,DoctorSerializer

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

class DoctorLoginView(views.APIView):
    permission_classes=[]

    def post(self, request, *args, **kwargs):

        data=json.loads(request.body)
        username=data.get('username')
        password=data.get('password')
        licenseNumber=data.get('licenseNumber')


        if not username or not password:
            return JsonResponse({"Login": "Username and password are required."},status=status.HTTP_400_BAD_REQUEST)
        
        qs=DoctorProfileModel.objects.filter(LicenseNumber=licenseNumber)
        if not qs.exists():
            return JsonResponse({"Login": "Not the valid liscence number"},status=status.HTTP_400_BAD_REQUEST)

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

DoctorLoginViewClass=DoctorLoginView.as_view()

class DoctorProfile(generics.RetrieveAPIView):
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
        data=DoctorProfileModel.objects.get(User=user)
        serilaize=DoctorSerializer(data).data
        serilaize['Login']="success"
        return JsonResponse(serilaize,status=200)
    
DoctorProfileClass=DoctorProfile.as_view()

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
        user=self.request.user

        if user is None or user.is_anonymous:
            return JsonResponse({"Login":"Login Required"},status=status.HTTP_403_FORBIDDEN)
        
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

class RecordDetail(generics.RetrieveAPIView):

    queryset=MedicalRecordModel.objects.all()
    serializer_class=MedicalRecordSerializer

    def get(self, request,MedicalID=None, *args, **kwargs):
        print("start")
        user=self.request.user
        if MedicalID is None:
            return JsonResponse({"Record":"Provide medical ID"},status=status.HTTP_400_BAD_REQUEST)
        
        qs=UserProfileModel.objects.filter(MedicalID=MedicalID)
        if not qs.exists():
            return JsonResponse({"Record":"No content for the medical Id"},status=status.HTTP_204_NO_CONTENT)
        
        UserProfile=UserProfileModel.objects.get(MedicalID=MedicalID)
        qs=MedicalRecordModel.objects.filter(UserProfile=UserProfile)
        UserSerialize=ProfileSerializer(UserProfile)

        Record=qs.order_by('-Date').first()
        serialize=MedicalRecordSerializer(Record).data
        serialize['Record']="Success"
        serialize['Patient_Name']=Record.UserProfile.User.username
        serialize['Age']=Record.UserProfile.Age
        serialize['Gender']=Record.UserProfile.Gender
        serialize['Country']=Record.UserProfile.Country
        serialize['Address']=Record.UserProfile.Address
        serialize['phoneNumber']=Record.UserProfile.PhoneNumber
        serialize['QRcode']=UserSerialize.data.get("QRCode")

        if user is None or user.is_anonymous:
            serialize['SensitiveInformation']="Login to get the Sensitive Information"

        print(serialize)
        return JsonResponse(serialize,status=status.HTTP_200_OK)
    
RecordDetailClass=RecordDetail.as_view()

class CreateRecord(generics.CreateAPIView):
    queryset=MedicalRecordModel.objects.all()
    serializer_class=MedicalRecordSerializer

    #still incomplete
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=self.request.user
        Doctor=DoctorProfileModel.objects.filter(User=user)
        if not Doctor.exists():
            return Response({'Record':"False"},status.HTTP_403_FORBIDDEN)
        Doctor=DoctorProfileModel.objects.get(User=user)
        #serializer['Doctor']=Doctor
        MedicalID=serializer.validated_data.pop('MedicalID')
        userqs=UserProfileModel.objects.filter(MedicalID=MedicalID)
        if not userqs.exists():
            return Response({"Record":"Enter the valid MedicalID"},status=status.HTTP_400_BAD_REQUEST)
        userqs=UserProfileModel.objects.get(MedicalID=MedicalID)
        # serializer['UserProfile']=userqs
        # serializer['HospitalName']=Doctor.HospitalName
        serializer.save(Doctor=Doctor,UserProfile=userqs,HospitalName=Doctor.HospitalName)
        headers = self.get_success_headers(serializer.data)
        return Response({"Record":"success"},status=status.HTTP_201_CREATED,headers=headers)
        #return super().perform_create(serializer)
    
CreateRecordClass=CreateRecord.as_view()

class RecordHistroy(generics.ListAPIView):

    queryset=MedicalRecordModel.objects.all()
    serializer_class=MedicalRecordSerializer
    permission_classes=[IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user=self.request.user
        UserProfile=UserProfileModel.objects.get(User=user)
        qs=MedicalRecordModel.objects.filter(UserProfile=UserProfile)
        Record=qs.order_by("-Date")
        #Record.order_by("-Date").first()
        print(Record)
        print(user)
        if Record is not None:     
            serialize=MedicalRecordSerializer(Record,many=True).data
            serialize.insert(0,{"Record":"Success"})
            return Response(serialize,status=status.HTTP_200_OK)
        return Response({"Record":"No content"},status=status.HTTP_204_NO_CONTENT)
    
RecordHistroyClass=RecordHistroy.as_view()

class ListBlog(generics.ListAPIView):
    queryset=BlogModel.objects.all()
    serializer_class=BlogSerializer

    def get(self, request, *args, **kwargs):
        qs=BlogModel.objects.all().order_by("-CreatedAt")[:5]
        if not qs.exists():
            return Response({"Blog":"No content"},status=status.HTTP_204_NO_CONTENT)
        serialize=BlogSerializer(qs,many=True)                                                               
        #serialize['Blog']='success'
        return Response(serialize.data,status=status.HTTP_200_OK)
        # return super().get(request, *args, **kwargs)

ListBlogClass=ListBlog.as_view()

class CreateBlog(generics.CreateAPIView):
    queryset=BlogModel.objects.all()
    serializer_class=BlogSerializer

    def perform_create(self, serializer):
        user=self.request.user
        author=DoctorProfileModel.objects.filter(User=user)
        if not author.exists():
            return Response({"Blog":"Only Doctor can write blog"},status=status.HTTP_401_UNAUTHORIZED)
        Content=serializer.validated_data.get('Content')
        if Content is None or Content=="":
            return Response({"Blog":"No content"},status=status.HTTP_406_NOT_ACCEPTABLE)
        author=DoctorProfileModel.objects.get(User=user)
        serializer.save(Author=author)
        return Response({"Blog":"Success"},status=status.HTTP_201_CREATED)
        #return super().perform_create(serializer)

CreateBlogClass=CreateBlog.as_view()

class DetailBlog(generics.RetrieveAPIView):
    queryset=BlogModel.objects.all()
    serializer_class=BlogSerializer

    def get(self, request,pk=None ,*args, **kwargs):

        if pk is None:
            return Response({'Blog':"Give pk"},status=status.HTTP_204_NO_CONTENT)
        qs=BlogModel.objects.filter(pk=pk)
        if not qs.exists():
            return Response({'Blog':"No content"},status=status.HTTP_404_NOT_FOUND)
        qs=BlogModel.objects.get(pk=pk)
        serialize=BlogSerializer(qs).data
        serialize['Blog']='success'
        return Response(serialize,status=status.HTTP_200_OK)
        #return super().get(request, *args, **kwargs)

DetailBlogClass=DetailBlog.as_view()

class DeleteBlog(generics.DestroyAPIView):
    queryset=BlogModel.objects.all()
    serializer_class=BlogSerializer

    def delete(self, request,pk=None, *args, **kwargs):
        instance=BlogModel.objects.filter(pk=pk)
        #instance = self.get_object()
        if not instance.exists():
            return Response({'Delete':"Blog doesnt exisit"},status=status.HTTP_404_NOT_FOUND)
        instance.delete()
        return Response({'Delete':"Success"},status=status.HTTP_204_NO_CONTENT)

DeleteBlogClass=DeleteBlog.as_view()

