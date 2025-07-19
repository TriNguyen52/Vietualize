import { Slot } from 'expo-router';

export default function ProtectedLayout() {
  console.log('Protected layout');

  // Skip authentication checks - direct access to protected routes
  return <Slot />;
}