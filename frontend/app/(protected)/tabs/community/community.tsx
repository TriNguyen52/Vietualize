import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import SwitchingTabs from '../../../../components/SwitchingTab';
import CommunityCard from '../../../../components/ui/CommunityCard';

export default function CommunityScreen() {
  const router = useRouter();
  
  const tabs = ['meet', 'community', 'leaderboard'];
  const activeTab = 'community';
  
  const handleTabChange = (tab: string) => {
    router.push(`/(protected)/tabs/community/${tab}` as any);
  };

  const handleCreateGroup = () => {
    // Navigate to create group screen or show modal
    console.log('Create group pressed');
  };

  const handleJoinGroup = () => {
    // Navigate to join group screen or show modal
    console.log('Join group pressed');
  };

  const handleGroupPress = (groupName: string) => {
    // Navigate to group details
    console.log(`Group ${groupName} pressed`);
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
        
        <View className="items-center space-y-4">
          {/* Create/Join Group Section */}
          <View className="w-full mb-6">
            <Text className="text-white text-2xl font-bold mb-4 text-left">
              Be part of the journey
            </Text>
            
            <CommunityCard
              title="Build Your Community"
              subtitle="Create or Join Groups"
              description="Start your own group or discover existing communities that match your interests"
              onPress={() => {}} 
              gradientColors={['#6366F1', '#8B5CF6', '#EC4899']}
              icon="users"
              isCreateCard={true}
              showActionButtons={true}
              onCreatePress={handleCreateGroup}
              onJoinPress={handleJoinGroup}
            />
          </View>

          {/* Popular Groups Near You Section */}
          <View className="w-full">
            <Text className="text-white text-2xl font-bold mb-4 text-left">
              Popular Groups Near You
            </Text>
            
            <CommunityCard
              title="Local Tech Enthusiasts"
              subtitle="Technology & Innovation"
              description="Weekly meetups to discuss the latest in tech, AI, and innovation"
              onPress={() => handleGroupPress('Local Tech Enthusiasts')}
              gradientColors={['#8B5CF6', '#7C3AED', '#6D28D9']}
              icon="users"
              memberCount={124}
              distance="0.8 mi"
            />
            
            <CommunityCard
              title="Coffee & Code"
              subtitle="Programming & Networking"
              description="Casual coding sessions and networking over great coffee"
              onPress={() => handleGroupPress('Coffee & Code')}
              gradientColors={['#F59E0B', '#D97706', '#B45309']}
              icon="users"
              memberCount={87}
              distance="1.2 mi"
            />
            
            <CommunityCard
              title="Startup Founders Circle"
              subtitle="Entrepreneurship & Business"
              description="Connect with fellow entrepreneurs and share startup experiences"
              onPress={() => handleGroupPress('Startup Founders Circle')}
              gradientColors={['#EF4444', '#DC2626', '#B91C1C']}
              icon="users"
              memberCount={56}
              distance="2.1 mi"
            />
            
            <CommunityCard
              title="Creative Minds Collective"
              subtitle="Art & Design"
              description="A space for artists, designers, and creative professionals to collaborate"
              onPress={() => handleGroupPress('Creative Minds Collective')}
              gradientColors={['#EC4899', '#DB2777', '#BE185D']}
              icon="users"
              memberCount={203}
              distance="1.7 mi"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
