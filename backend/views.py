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
from .models import UserProfileModel,MedicalRecordModel,BlogModel,DoctorProfileModel,DoctorAppointmentModel
from .serializers import ProfileSerializer,PaitentRegister,MedicalRecordSerializer,BlogSerializer,DoctorSerializer,Meetserializer,DoctorAppointmentSerializer

class Home(APIView):
    def get(self,request):
        user=self.request.user

        doctor=DoctorProfileModel.objects.filter(User=user)
        if doctor.exists():
            return JsonResponse({"User":"Doctor"},status=status.HTTP_200_OK)
        
        patient=UserProfileModel.objects.filter(User=user)
        if patient.exists():
            return JsonResponse({"User":"Patient"},status=status.HTTP_200_OK) 
        
        # if user is None or user.is_anonymous:
        #         return JsonResponse({"User":"Login"},status=status.HTTP_200_OK)

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
    queryset=DoctorProfileModel.objects.all()
    serializer_class=DoctorSerializer

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
        #serilaize['Login']="success"
        serilaize['userName']=user.username
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
            return Response({"Login":"Login Required"},status=status.HTTP_403_FORBIDDEN)
        
        data=UserProfileModel.objects.get(User=user)
        serialize=ProfileSerializer(data).data
        serialize['Login']="success"
        return Response(serialize,status=status.HTTP_200_OK)
    
    def perform_update(self, serializer):

        user=self.request.user
        if user is None or user.is_anonymous:
            return Response({"Login":"Login Required"},status=status.HTTP_403_FORBIDDEN)
        
        gurdian1=serializer.validated_data.get('Guadian1')
        gurdian2=serializer.validated_data.get('Guadian2')
        gurdian3=serializer.validated_data.get('Guadian3')

        qs1=UserProfileModel.objects.filter(MedicalID=gurdian1)
        qs2=UserProfileModel.objects.filter(MedicalID=gurdian2)
        qs3=UserProfileModel.objects.filter(MedicalID=gurdian3)

        if  not qs1.exists() and  not qs2.exists() and not qs3.exists():
            # if  gurdian1 is not None and not gurdian2 is None and  not gurdian3 is None:
            return Response({"Login":"Gardian ID is not correct"},status=status.HTTP_403_FORBIDDEN)

        # return super().perform_update(serializer)
        serializer.save()
        return Response({"Login":"Success"},status=status.HTTP_200_OK)

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
            return JsonResponse({'Record':"False"},status.HTTP_403_FORBIDDEN)
        Doctor=DoctorProfileModel.objects.get(User=user)
        #serializer['Doctor']=Doctor
        MedicalID=serializer.validated_data.pop('MedicalID')
        userqs=UserProfileModel.objects.filter(MedicalID=MedicalID)
        if not userqs.exists():
            return JsonResponse({"Record":"Enter the valid MedicalID"},status=status.HTTP_400_BAD_REQUEST)
        userqs=UserProfileModel.objects.get(MedicalID=MedicalID)
        # serializer['UserProfile']=userqs
        # serializer['HospitalName']=Doctor.HospitalName
        serializer.save(Doctor=Doctor,UserProfile=userqs,HospitalName=Doctor.HospitalName)
        headers = self.get_success_headers(serializer.data)
        return JsonResponse({"Record":"success"},status=status.HTTP_201_CREATED,headers=headers)
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
        qs=BlogModel.objects.all().order_by("-CreatedAt")
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

class MeetLink(generics.CreateAPIView):
    queryset=UserProfileModel
    serializer_class=Meetserializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        medicalID=serializer.validated_data.get('MedicalID')
        Link=serializer.validated_data.get('Link')
        qs=UserProfileModel.objects.get(MedicalID=medicalID)
        qs.Link=Link
        qs.save()
        #serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
MeetLinkClass=MeetLink.as_view()

class RemoveLink(generics.DestroyAPIView):
    queryset=UserProfileModel
    serializer_class=Meetserializer

    def delete(self, request, *args, **kwargs):
        user=self.request.user
        UserProfile=UserProfileModel.objects.get(User=user)
        UserProfile.Link=None
        UserProfile.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
        #return super().delete(request, *args, **kwargs)

RemoveLinkClass=RemoveLink.as_view()

class Appoinment(generics.CreateAPIView):
    queryset=DoctorAppointmentModel
    serializer_class=DoctorAppointmentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user=self.request.user
        userprofile=UserProfileModel.objects.get(User=user)
        paitentid=userprofile.MedicalID
        Doctor=serializer.validated_data.get('Doctor')
        doctormodel=DoctorProfileModel.objects.filter(LicenseNumber=Doctor)
        if not doctormodel.exists():
            return JsonResponse({"Appoinment":"Enter the correct lisence number of the doctor"})
        serializer.save(Doctor=Doctor,Patient=paitentid,Status="Waiting")
        headers = self.get_success_headers(serializer.data)
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        #return super().create(request, *args, **kwargs)

AppoinmentClass=Appoinment.as_view()

class ListDocotor(generics.ListAPIView):
    queryset=DoctorProfileModel.objects.all()
    serializer_class=DoctorSerializer

    def get(self, request, *args, **kwargs):
        List=[]
        qs=DoctorProfileModel.objects.all()
        for i in qs:
            serialize=DoctorSerializer(i).data
            #print(serialize)
            serialize['Name']=i.User.username
            List.append(serialize)

        if List==[]:
            return JsonResponse({"Docotor":"THere no doctor"},status=status.HTTP_204_NO_CONTENT)
        return JsonResponse(List,status=status.HTTP_200_OK)

ListDocotorClass=ListDocotor.as_view()

class DoctorDetail(generics.RetrieveAPIView):
    queryset=DoctorProfileModel
    serializer_class=DoctorSerializer

    def get(self, request,LicenseNumber=None, *args, **kwargs):
        if LicenseNumber is None:
            return JsonResponse({"Doctor":"Provide the LicenseNumber"},status=status.HTTP_406_NOT_ACCEPTABLE)
        doctor=DoctorProfileModel.objects.filter(LicenseNumber=LicenseNumber)
        if not doctor.exists():
            return JsonResponse({"Doctor":"There is no doctor at the given liscence number!"},status=status.HTTP_204_NO_CONTENT)
        doctor=DoctorProfileModel.objects.get(LicenseNumber=LicenseNumber)
        serialize=DoctorSerializer(doctor).data
        serialize['Name']=doctor.User.username
        return JsonResponse(serialize,status=status.HTTP_200_OK)
    
DoctorDetailClass=DoctorDetail.as_view()
        
class AppoinmentNotification(generics.ListAPIView):
    queryset=DoctorAppointmentModel
    serializer_class=DoctorAppointmentSerializer

    def get(self, request, *args, **kwargs):
        user=self.request.user
        Doctor=DoctorProfileModel.objects.get(User=user)
        LisenceNumber=Doctor.LicenseNumber
        qs=DoctorAppointmentModel.objects.filter(Doctor=LisenceNumber)
        serialize=DoctorAppointmentSerializer(qs,many=True).data
        if serialize==[]:
            return Response({"Appoinment":"Currently there is appoinment request"},status=status.HTTP_200_OK)
        return Response(serialize,status=status.HTTP_200_OK)
    
AppoinmentNotificationClass=AppoinmentNotification.as_view()

import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

FAST2SMS_API_KEY = "DHVNDHvTrhJPXVveJWdxiMSTCoU6Gp6lo2KUr0BE0iJ04K5hJDakjGduuVat"  

@csrf_exempt
def send_sms(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  
            print("Received Data:", data)  

            # Validate required fields
            if "message" not in data or "numbers" not in data:
                return JsonResponse({"error": "Missing required fields"}, status=400)

            # API Request Payload
            payload = {
                "message": data["message"],
                "language": "english",  
                "route": "q",  
                "numbers": data["numbers"]
            }

            # Make request to Fast2SMS API
            response = requests.post(
                "https://www.fast2sms.com/dev/bulkV2",
                headers={
                    "authorization": FAST2SMS_API_KEY, 
                    "Content-Type": "application/json",
                },
                json=payload,  
            )

            print("Fast2SMS Response:", response.json()) 
            return JsonResponse(response.json(), status=response.status_code)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

