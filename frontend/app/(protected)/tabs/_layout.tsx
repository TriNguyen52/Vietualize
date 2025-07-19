import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Slot, useRouter, useSegments, useGlobalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Bell } from 'lucide-react-native';


const tabs = [
  { name: 'Dashboard', icon: 'dashboard' as const, href: '/(protected)/tabs/dashboard/dashboard' },
  { name: 'Community', icon: 'people' as const, href: '/(protected)/tabs/community/community' },
  { name: 'Challenge', icon: 'map' as const, href: '/(protected)/tabs/challenge/challenge' },
  { name: 'Profile', icon: 'analytics' as const, href: '/(protected)/tabs/setting/setting' },
];

export default function ProtectedLayout() {
  const router = useRouter();
  const segments = useSegments();
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Update active tab based on current route
  useEffect(() => {
    if (segments && segments.length >= 3) {
      const currentTab = segments[2]; // The tab name is in the third segment
      if (currentTab) {
        const tabName = currentTab.charAt(0).toUpperCase() + currentTab.slice(1);
        setActiveTab(tabName);
      }
    }
  }, [segments]);

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header with horizontal layout */}
      <View className="flex-row items-center justify-between py-4 px-6 bg-black shadow-sm">
          <Text className="text-2xl font-bold text-white">Vietualize</Text>
          <Bell size={24} color="white" />  
      </View>
      
      {/* Main content area with horizontal expansion */}
      <View className="flex-1 bg-white">
        <Slot />
      </View>
      
      {/* Bottom navigation with horizontal tabs */}
      <View className="flex-row">
        {tabs.map((tab) => (
          <Pressable
            key={tab.name}
            onPress={() => {
              setActiveTab(tab.name);
              router.push(tab.href as any);
            }}
            className={`flex-1 items-center justify-center py-2 px-2 ${
              activeTab === tab.name ? 'bg-black' : 'bg-black'
            }`}
          >
            <MaterialIcons name={tab.icon} size={24} color="white" />
            <Text className="text-white text-xs mt-1 text-center font-medium">{tab.name}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}
