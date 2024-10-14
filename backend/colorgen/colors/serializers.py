from rest_framework import serializers
from .models import ColorHash
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  

class ColorHashSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # This will include user info

    class Meta:
        model = ColorHash
        fields = ['id', 'user', 'color_hashes']

    def validate_color_hashes(self, value):
        if len(value) > 5:
            raise serializers.ValidationError("You can only add up to 5 color hashes.")
        return value

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, error_messages={'required': 'Username or email is required.'})
    password = serializers.CharField(required=True, error_messages={'required': 'Password is required.'})

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        # Check if the input is an email or a username
        if '@' in username:
            try:
                user = User.objects.get(email=username)
            except User.DoesNotExist:
                raise serializers.ValidationError("Invalid credentials")
        else:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                raise serializers.ValidationError("Invalid credentials")

        # Authenticate the user using the username (since authenticate requires username, not email)
        user = authenticate(username=user.username, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid credentials")

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }