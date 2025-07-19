import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen() {
  return (
    <ScrollView className="flex-1 bg-black">
      <View className="px-4 py-6">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-white mb-2">Settings</Text>
        </View>
        
        <View className="py-4">
          <LinearGradient
            colors={['#6D6A6A', '#9B9A9C', '#CAC9CD', '#F8F8FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <Text className="text-xl font-semibold text-black mb-4">Account</Text>
            <View className="space-y-3">
              <Pressable className="flex-row items-center justify-between py-2">
                <View className="flex-row items-center">
                  <Text className="text-black text-base font-semibold">Profile</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#000000" />
              </Pressable>
              
              <Pressable className="flex-row items-center justify-between py-2">
                <View className="flex-row items-center">
                  <Text className="text-base text-black font-semibold">Privacy & Security</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#000000" />
              </Pressable>
            </View>
          </LinearGradient>
          
          <LinearGradient
            colors={['#6D6A6A', '#9B9A9C', '#CAC9CD', '#F8F8FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 16,
              padding: 16,
              marginBottom: 16,
            }}
          >
            <Text className="text-xl font-semibold text-black mb-4">Preferences</Text>
            <View className="space-y-3">
              <Pressable className="flex-row items-center justify-between py-2">
                <View className="flex-row items-center">
                  <Text className="text-base font-semibold text-black">Notifications</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#000000" />
              </Pressable>
              
              <Pressable className="flex-row items-center justify-between py-2">
                <View className="flex-row items-center">
                  <Text className="text-base font-semibold text-black">Theme</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#000000" />
              </Pressable>
            </View>
          </LinearGradient>
          
          <LinearGradient
            colors={['#6D6A6A', '#9B9A9C', '#CAC9CD', '#F8F8FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 16,
              padding: 16,
            }}
          >
            <Text className="text-xl font-semibold text-black mb-4">Support</Text>
            <View className="space-y-3">
              <Pressable className="flex-row items-center justify-between py-2">
                <View className="flex-row items-center">
                  <Text className="text-base font-semibold text-black">Help Center</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#000000" />
              </Pressable>
              
              <Pressable className="flex-row items-center justify-between py-2">
                <View className="flex-row items-center">
                  <Text className="text-base font-semibold text-black">About</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#000000" />
              </Pressable>
            </View>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
}
