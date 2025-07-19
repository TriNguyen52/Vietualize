import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import SwitchingTabs from '../../../../components/SwitchingTab';
import UserProfileCard from '../../../../components/ui/UserProfileCard';

export default function MeetScreen() {
  const router = useRouter();
  
  const tabs = ['meet', 'community', 'leaderboard'];
  const activeTab = 'meet';
  
  const handleTabChange = (tab: string) => {
    router.push(`/(protected)/tabs/community/${tab}` as any);
  };

  // Sample user data
  const sampleUsers = [
    {
      id: 1,
      name: "Alex Chen",
      age: 24,
      bio: "Love hiking, photography, and discovering new coffee shops! Always up for an adventure or deep conversations about life.",
      location: "San Francisco, CA",
      distance: "2.3 miles away",
      interests: ["Photography", "Hiking", "Coffee", "Travel"],
      gradientColors: ['#B7C8FF', '#D9B9E9', '#FFC0C8', '#F5C59E'] as const,
    },
    {
      id: 2,
      name: "Maya Rodriguez", 
      age: 26,
      bio: "Artist and yoga instructor. Passionate about mindfulness, sustainability, and creating beautiful things.",
      location: "Los Angeles, CA",
      distance: "1.8 miles away",
      interests: ["Art", "Yoga", "Sustainability", "Meditation"],
      gradientColors: ['#C1D3FF', '#E8C5FF', '#FDC8E2', '#F5C59E'] as const,
    },
    {
      id: 3,
      name: "Jordan Kim",
      age: 23,
      bio: "Tech enthusiast and book lover. Currently learning Spanish and always looking for new restaurant recommendations!",
      location: "Seattle, WA", 
      distance: "3.1 miles away",
      interests: ["Technology", "Reading", "Food", "Languages"],
      gradientColors: ['#C4E1FF', '#DBC3FF', '#FFCDD9', '#F5C59E'] as const,
    },
  ];

  const handleConnect = (userId: number, userName: string) => {
    Alert.alert(
      "Connect with " + userName,
      "Would you like to send a connection request?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Connect", onPress: () => Alert.alert("Success", `Connection request sent to ${userName}!`) }
      ]
    );
  };

  const handleMessage = (userId: number, userName: string) => {
    Alert.alert("Message", `Opening chat with ${userName}...`);
  };

  const handleLike = (userId: number, userName: string) => {
    Alert.alert("Liked", `You liked ${userName}'s profile!`);
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
        
        <View className="">         
          {sampleUsers.map((user) => (
            <UserProfileCard
              key={user.id}
              userName={user.name}
              userAge={user.age}
              userBio={user.bio}
              location={user.location}
              distance={user.distance}
              interests={user.interests}
              gradientColors={user.gradientColors}
              onConnectPress={() => handleConnect(user.id, user.name)}
              onMessagePress={() => handleMessage(user.id, user.name)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
