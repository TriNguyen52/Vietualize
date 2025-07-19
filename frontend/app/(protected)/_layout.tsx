import { Slot } from 'expo-router';
import { View } from 'react-native';

export default function ProtectedLayout() {
  // Direct access to protected routes with horizontal layout
  return (
      <Slot />
  );
}