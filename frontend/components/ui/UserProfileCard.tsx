import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ColorValue,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { MessageCircle, Heart, Users } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface UserProfileCardProps {
  userName: string;
  userAge: number;
  userBio: string;
  userImage?: string;
  location?: string;
  distance?: string;
  interests?: string[];
  onConnectPress?: () => void;
  onMessagePress?: () => void;
  gradientColors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
  borderRadius?: number;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  userName,
  userAge,
  userBio,
  userImage,
  location = "Unknown location",
  distance = "0 miles away",
  interests = [],
  onConnectPress,
  onMessagePress,
  gradientColors = ['#B7C8FF', '#D9B9E9', '#FFC0C8', '#FFE2C5'] as const,
  borderRadius = 24,
}) => {
  return (
    <View className="mb-4">
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-6 shadow-xl"
        style={{ 
          width: width * 0.92, 
          minHeight: 500,
          borderRadius: borderRadius,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 15,
          elevation: 10,
        }}
      >
        {/* Centered Profile Image */}
        <View className="items-center justify-center flex-1 mt-4">
          <View className="relative">
            {userImage ? (
              <Image 
                source={{ uri: userImage }}
                className="w-32 h-32 rounded-full"
                style={{ backgroundColor: '#ffffff20' }}
              />
            ) : (
              <View className="w-32 h-32 bg-white/30 rounded-full justify-center items-center">
                <Ionicons name="person" size={60} color="white" />
              </View>
            )}           
          </View>
        </View>

        {/* Profile Info at Bottom */}
        <View className="p-4">
          <View className="items-start">
            <View className="flex-row items-center mb-1">
              <Text className="text-white text-2xl font-bold mr-2">
                {userName}
              </Text>
              <Text className="text-white text-xl font-medium">
                {userAge}
              </Text>
            </View>

            <View className="flex-row items-center mb-1">
              <Ionicons name="location-outline" size={16} color="white" />
              <Text className="text-white text-sm ml-1 font-medium">
                {location}
              </Text>
            </View>
            <Text className="text-white text-xs font-medium">
              {distance}
            </Text>
          </View>

          {/* Bio */}
          <View className="mb-4 mt-2">
            <Text className="text-white text-base text-left font-normal">
              {userBio}
            </Text>
          </View>

          {/* Interests */}
          {interests.length > 0 && (
            <View className="">
              <Text className="text-white text-sm font-medium mb-2 text-left">
                Interests
              </Text>
              <View className="flex-row flex-wrap justify-start">
                {interests.slice(0, 3).map((interest, index) => (
                  <View 
                    key={index}
                    className="bg-white/20 px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    <Text className="text-white text-sm">
                      {interest}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Action buttons */}
        <View className="flex-row justify-center items-center mb-4">
          <TouchableOpacity 
            className="items-center justify-center flex-1 mx-2" 
            onPress={onConnectPress}
          >
            <View className="w-14 h-14 bg-white/30 rounded-full justify-center items-center mb-2">
              <Users size={23} color="white" />
            </View>
            <Text className="text-white text-sm font-normal">
              Connect
            </Text>
          </TouchableOpacity>
                  
          <TouchableOpacity 
            className="items-center justify-center flex-1 mx-2" 
            onPress={onMessagePress}
          >
            <View className="w-14 h-14 bg-white/20 rounded-full justify-center items-center mb-2">
              <MessageCircle size={23} color="white" />
            </View>
            <Text className="text-white text-sm font-normal">
              Message
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default UserProfileCard;
