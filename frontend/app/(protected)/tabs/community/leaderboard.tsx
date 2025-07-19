import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ColorValue,
  ScrollView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import SwitchingTabs from '../../../../components/SwitchingTab';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface User {
  id: string;
  name: string;
  points: number;
  level: string;
  visit: number;
}

interface LeaderboardItemProps {
  rank: number;
  user: User;
  isTop3: boolean;
}

interface LeaderboardScreenProps {
    onTypePress?: () => void;
    onYapPress?: () => void;
    onTranscribePress?: () => void;
    gradientColors?: readonly [ColorValue, ColorValue, ...ColorValue[]];
    borderRadius?: number;
}

// Sample leaderboard data
const leaderboardData: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    points: 12850,
    level: 'Vietnamese local',
    visit: 45,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    points: 11200,
    level: 'A good friend',
    visit: 32,
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    points: 10750,
    level: 'Active Explorer',
    visit: 28,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    points: 9800,
    level: 'Advanced',
    visit: 21,
  },
  {
    id: '5',
    name: 'David Kim',
    points: 9200,
    level: 'Advanced',
    visit: 18,
  },
  {
    id: '6',
    name: 'Lisa Thompson',
    points: 8500,
    level: 'Advanced',
    visit: 15,
  },
  {
    id: '7',
    name: 'James Brown',
    points: 7800,
    level: 'Intermediate',
    visit: 12,
  },
  {
    id: '8',
    name: 'Maria Garcia',
    points: 7200,
    level: 'Intermediate',
    visit: 9,
  }
];

// LeaderboardItem Component
const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ rank, user, isTop3 }) => {
  const getGradientColors = (): readonly [ColorValue, ColorValue, ...ColorValue[]] => {
    switch (rank) {
      case 1:
        return ['#FFD700', '#FFA500', '#FF6347'] as const; // Gold gradient
      case 2:
        return ['#C0C0C0', '#A8A8A8', '#808080'] as const; // Silver gradient
      case 3:
        return ['#CD7F32', '#A0522D', '#8B4513'] as const; // Bronze gradient
      default:
        return isTop3 ? ['#6B46C1', '#8B5CF6', '#A78BFA'] as const : ['#374151', '#4B5563', '#6B7280'] as const; // Purple for top 3, gray for others
    }
  };

  const getRankIcon = () => {
    switch (rank) {
      case 1:
        return '1';
      case 2:
        return '2';
      case 3:
        return '3';
      default:
        return rank.toString();
    }
  };

  const getAnimationDelay = () => rank * 100; // Staggered animation

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      className="mb-4 "
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 16,
          padding: 20,
          shadowColor: rank <= 3 ? getGradientColors()[0] : '#000',
          shadowOffset: { width: 0, height: rank <= 3 ? 8 : 4 },
          shadowOpacity: rank <= 3 ? 0.3 : 0.1,
          shadowRadius: rank <= 3 ? 12 : 6,
          elevation: rank <= 3 ? 8 : 4,
        }}
      >
        <View className="flex-row items-center">
          {/* Rank */}
          <View 
            className="w-14 h-14 rounded-full items-center justify-center mr-4"
            style={{
              backgroundColor: rank <= 3 ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.4)',
            }}
          >
            <Text className={`text-lg font-bold ${rank <= 3 ? 'text-white' : 'text-white'}`}>
              {rank <= 3 ? getRankIcon() : rank}
            </Text>
          </View>

          {/* User Info */}
          <View className="flex-1">
            <Text className={`text-lg font-semibold ${rank <= 3 ? 'text-white' : 'text-white'}`}>
              {user.name}
            </Text>
            <View className="flex-row items-center mt-1">
              <View className="bg-black/30 px-2 py-1 rounded-full mr-3">
                <Text className="text-white text-xs font-medium">{user.level}</Text>
              </View>
              <View className="flex-row items-center bg-black/30 px-2 py-1 rounded-full">
                <Ionicons name="flame" size={12} color="#FF6347" />
                <Text className="text-white text-xs ml-1 font-medium">{user.visit}</Text>
              </View>
            </View>
          </View>

          {/* Points */}
          <View className="items-end mr-2">
            <Text className={`text-xl font-bold ${rank <= 3 ? 'text-white' : 'text-white'}`}>
              {user.points.toLocaleString()}
            </Text>
            <Text className="text-white/70 text-xs">points</Text>
          </View>

          {/* Achievement Indicator for Top 3 */}
          {rank <= 3 && (
            <View className="absolute -top-3 -right-4">
              <View className="w-6 h-6 bg-black rounded-full items-center justify-center">
                <Ionicons name="star" size={14} color="#FFD700" />
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default function LeaderboardScreen() {
  const router = useRouter();
  
  const tabs = ['meet', 'community', 'leaderboard'];
  const activeTab = 'leaderboard';
  
  const handleTabChange = (tab: string) => {
    router.push(`/(protected)/tabs/community/${tab}` as any);
  };

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="px-4 py-6">
        {/* Switching Tab Navigation */}
        <View className="items-center mb-6">
          <SwitchingTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </View>
        
        {/* Leaderboard Content */}
        <View className="flex-1">
          {/* Header Stats */}
          <View className="mb-6">
            <LinearGradient
              colors={['#1F2937', '#374151', '#4B5563'] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 16, padding: 20 }}
            >
              <Text className="text-white text-2xl font-bold text-center mb-4">
                🏆 Top Achievers
              </Text>
              <View className="flex-row justify-around">
                <View className="items-center">
                  <Text className="text-white text-xl font-bold">
                    {leaderboardData.length}
                  </Text>
                  <Text className="text-gray-300 text-sm">Competitors</Text>
                </View>
                <View className="items-center">
                  <Text className="text-white text-xl font-bold">
                    {Math.max(...leaderboardData.map(u => u.visit))}
                  </Text>
                  <Text className="text-gray-300 text-sm">Max Visit</Text>
                </View>
                <View className="items-center">
                  <Text className="text-white text-xl font-bold">
                    {Math.max(...leaderboardData.map(u => u.points)).toLocaleString()}
                  </Text>
                  <Text className="text-gray-300 text-sm">Top Score</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
          
          {/* Leaderboard Items */}
          {leaderboardData.map((item: User, index: number) => (
            <LeaderboardItem
              key={item.id}
              rank={index + 1}
              user={item}
              isTop3={index < 3}
            />
          ))}

          {/* Footer */}
          <View className="mt-6 mb-4">
            <LinearGradient
              colors={['#111827', '#1F2937'] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 12, padding: 16 }}
            >
              <Text className="text-gray-400 text-center text-sm">
                Rankings update daily • Keep pushing your limits! 
              </Text>
            </LinearGradient>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
