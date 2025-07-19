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
import { Pen } from 'lucide-react-native';
import { AudioLines } from 'lucide-react-native';
import { Compass } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface GradientCardProps {
  userName?: string;
  greetingText?: string;
  mainMessage?: string;
  onTypePress?: () => void;
  onYapPress?: () => void;
  onTranscribePress?: () => void;
  gradientColors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
  borderRadius?: number;
}

const GradientCard: React.FC<GradientCardProps> = ({
  userName = "Dante",
  greetingText = "ready to chat",
  mainMessage = "what's on your mind?",
  onTypePress,
  onYapPress,
  onTranscribePress,
  gradientColors = ['#6B7280', '#9CA3AF', '#D1D5DB', '#F3F4F6'] as const,
  borderRadius = 40,
}) => {
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-6 justify-between shadow-2xl"
        style={{ 
          width: width * 0.92, 
          height: Math.min(500, width * 0.9),
          borderRadius: borderRadius,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 20 },
          shadowOpacity: 0.3,
          shadowRadius: 20,
          elevation: 15,
        }}
      >
        {/* Header with logo and brand */}
        <View className="flex-row items-center ml-6 pt-6">
          <View className="w-6 h-6 bg-white/20 rounded-xl justify-center items-center mr-2">
            <Compass size={16} color="white" />
          </View>
          <Text className="text-white text-sm font-medium opacity-90">
            Your local friend
          </Text>
        </View>

        {/* Main content */}
        <View className="flex-1 justify-center items-start pl-6">
          <Text className="text-white text-lg font-normal mb-2">
            {greetingText}, {userName}?
          </Text>
          <Text className="text-white text-4xl font-light leading-10 mb-8">
            {mainMessage}
          </Text>
        </View>

        {/* Bottom action buttons */}
        <View className="flex-row justify-center items-center pb-6">
          <TouchableOpacity className="items-center justify-center mx-5" onPress={onTypePress}>
            <View className="w-12 h-12 bg-black/20 rounded-full justify-center items-center mb-2">
              <Pen size={22} color="white" />
            </View>
            <Text className="text-white text-sm font-normal">
              type
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center justify-center mx-5 -mt-4" onPress={onYapPress}>
            <View className="w-16 h-16 bg-black/20 rounded-full justify-center items-center mb-2">
              <AudioLines size={24} color="white" />
            </View>
            <Text className="text-white text-base font-normal">
              yap
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="items-center justify-center mx-5" onPress={onTranscribePress}>
            <View className="w-12 h-12 bg-black/20 rounded-full justify-center items-center mb-2">
              <Ionicons name="mic" size={22} color="white" />
            </View>
            <Text className="text-white text-sm font-normal">
              transcribe
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default GradientCard;