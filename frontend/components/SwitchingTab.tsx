import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';


interface SwitchingTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const SwitchingTabs: React.FC<SwitchingTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View className="flex-row w-full bg-black dark:bg-[#202020] rounded-full p-1.5">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabChange(tab)}
          className={`
            flex-1 p-2 rounded-full items-center justify-center
            ${activeTab === tab ? 'bg-[#bfbfbf] shadow' : ''}
          `}
        >
          <Text
            className={`
              font-semibold capitalize
              ${activeTab === tab ? 'text-black' : 'text-white'}
            `}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SwitchingTabs;
