import { View, Text, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientCard from 'components/ui/GradientCard';
import HorizontalSliding, { CardData } from 'components/ui/HorizontalSliding';


interface TravelPost {
    id: string;
    location: string;
    user: string;
    type: 'SEEKING' | 'OFFERING';
    activity?: string;
    timeframe?: string;
}

interface UserStats {
    placesVisited: number;
    connectionsMode: number;
    achievements: Achievement[];
    recentVisits: string[];
    nextSuggestion: string;
}

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: string;
}

export default function Home() {
    const router = useRouter();
    const travelCards: CardData[] = [
        {
            id: '1',
            title: 'Make the authentic Phở',
            subtitle: '36 phố phường series',
            category: 'Food & Culture',
            location: 'Hà Nội',
            duration: 'Spent 2 hours',
            difficulty: 'Easy',
            description: 'Discover hidden local Phở restaurants and learn to make authentic Phở with local chefs',
            image: require('../../../../assets/images/wink.png'),
            gradient: ['#000000', '#000000'] as const,
        },
        {
            id: '2',
            title: 'Try Cà Phê Bệt',
            subtitle: 'Quận 1 và những điều bình dị',
            category: 'Food & Culture',
            location: 'TP. Hồ Chí Minh',
            duration: 'Spent 3 hours',
            difficulty: 'Easy',
            description: 'Join fellow adventurers for coffee chat',
            image: require('../../../../assets/images/wink.png'),
            gradient: ['rgba(34,139,34,0.3)', 'rgba(34,139,34,0.8)'] as const,
        },
        {
            id: '3',
            title: 'Cultural\nImmersion',
            subtitle: 'Local Traditions',
            category: 'Culture & History',
            location: 'Historic Areas',
            duration: '3-4 hours',
            difficulty: 'Easy',
            description: 'Experience local customs, festivals, and traditional activities',
            image: require('../../../../assets/images/wink.png'),
            gradient: ['rgba(138,43,226,0.3)', 'rgba(138,43,226,0.8)'] as const,
        },
        {
            id: '4',
            title: 'Urban\nExploration',
            subtitle: 'City Discoveries',
            category: 'Urban & Modern',
            location: 'City Center',
            duration: '2-4 hours',
            difficulty: 'Easy',
            description: 'Explore modern architecture, art galleries, and trendy neighborhoods',
            image: require('../../../../assets/images/wink.png'),
            gradient: ['rgba(255,140,0,0.3)', 'rgba(255,140,0,0.8)'] as const,
        },
    ];

    const handleTypePress = () => {
        console.log('Type pressed');
    };

    const handleYapPress = () => {
        console.log('Yap pressed');
    };

    const handleTranscribePress = () => {
        console.log('Transcribe pressed');
    };

    return (
        <ScrollView className="flex-1 bg-black">
            <View className="mb-6">
                <GradientCard 
                    userName="Dante"
                    greetingText="ready to explore"
                    mainMessage="where will you go next?"
                    onTypePress={handleTypePress}
                    onYapPress={handleYapPress}
                    onTranscribePress={handleTranscribePress}
                    gradientColors={['#FF0000', '#FF7A00', '#FFC400', '#FFED00'] as const}
                    borderRadius={32}
                />
            </View>

            {/* HorizontalSliding Component */}
            <View className="mb-6">
                <HorizontalSliding cards={travelCards} />
            </View>
               {/* Travel Tips Banner */}
                <View className="px-5 mb-6">
                    <View className="bg-blue-900 border border-blue-700 rounded-lg p-4">
                        <Text className="text-blue-200 text-xs font-bold tracking-wide mb-2">
                            💡 LOCAL INSIGHT
                        </Text>
                        <Text className="text-white text-sm font-medium">
                            "Best time to visit local markets is early morning for fresh produce and authentic local interactions"
                        </Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View className="px-5 mb-10">
                    <Pressable className="bg-white border-white border-4 py-5 px-5 mb-4">
                        <Text className="text-black text-base font-black text-center tracking-wider">
                            🔍 FIND LOCAL TRAVEL BUDDY
                        </Text>
                        <Text className="text-gray-600 text-xs text-center mt-1">
                            Connect with locals and fellow travelers
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
    );
}

