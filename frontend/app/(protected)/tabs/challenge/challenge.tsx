import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ChallengeScreen() {
  return (
    <ScrollView className="flex-1 bg-black">
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-2xl mb-4">Challenge Screen</Text>
        <Pressable
          className="bg-blue-500 p-4 rounded"
          onPress={() => alert('Challenge Button Pressed')}
        >
          <Text className="text-white">Start Challenge</Text>
        </Pressable>
      </View>
      <MaterialIcons name="sports-martial-arts" size={24} color="white" />
      <View className="p-4">
        <Text className="text-white">More content can go here...</Text>
      </View>
    </ScrollView>
  );
}
