import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ColorValue,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Users, MapPin, Plus } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface CommunityCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  onPress?: () => void;
  gradientColors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
  icon?: 'users' | 'map' | 'plus';
  memberCount?: number;
  distance?: string;
  isCreateCard?: boolean;
  showActionButtons?: boolean;
  onCreatePress?: () => void;
  onJoinPress?: () => void;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  title,
  subtitle,
  description,
  onPress,
  gradientColors = ['#4F46E5', '#7C3AED', '#EC4899'] as const,
  icon = 'users',
  memberCount,
  distance,
  isCreateCard = false,
  showActionButtons = false,
  onCreatePress,
  onJoinPress,
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'users':
        return <Users size={24} color="white" />;
      case 'map':
        return <MapPin size={24} color="white" />;
      case 'plus':
        return <Plus size={24} color="white" />;
      default:
        return <Users size={24} color="white" />;
    }
  };

  return (
    <TouchableOpacity onPress={showActionButtons ? undefined : onPress} className="mb-4" disabled={showActionButtons}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-6 shadow-lg"
        style={{
          width: width * 0.92,
          borderRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 8,
        }}
      >
        <View className="flex-row items-center justify-between p-4">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <View className="w-10 h-10 bg-white/20 rounded-full justify-center items-center mr-3">
                {getIcon()}
              </View>
              <View className="flex-1">
                <Text className="text-white text-xl font-semibold">
                  {title}
                </Text>
                {subtitle && (
                  <Text className="text-white/80 text-sm">
                    {subtitle}
                  </Text>
                )}
              </View>
            </View>
            
            {description && (
              <Text className="text-white/90 text-base mb-3 leading-5">
                {description}
              </Text>
            )}
            
            {showActionButtons ? (
              <View className="flex-row justify-around mt-4">
                <TouchableOpacity
                  onPress={onCreatePress}
                  className="flex-1 bg-white/20 rounded-xl py-3 px-4 flex-row items-center justify-center mr-4"
                >
                  <Plus size={18} color="white" />
                  <Text className="text-white font-semibold ml-2">Create Group</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={onJoinPress}
                  className="flex-1 bg-white/20 rounded-xl py-3 px-4 flex-row items-center justify-center"
                >
                  <Users size={18} color="white" />
                  <Text className="text-white font-semibold ml-2">Join Group</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-row items-center">
                {memberCount && (
                  <View className="flex-row items-center mr-4">
                    <Ionicons name="people" size={16} color="white" />
                    <Text className="text-white/80 text-sm ml-1">
                      {memberCount} members
                    </Text>
                  </View>
                )}
                {distance && (
                  <View className="flex-row items-center">
                    <Ionicons name="location" size={16} color="white" />
                    <Text className="text-white/80 text-sm ml-1">
                      {distance}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
          
          {!isCreateCard && !showActionButtons && (
            <Ionicons name="chevron-forward" size={24} color="white" />
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CommunityCard;
