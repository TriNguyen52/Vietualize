import { View, Text, Image, Button } from 'react-native';

export default function HomeScreen() {
  // Remove authentication dependencies
  const user = { firstName: 'User', imageUrl: 'https://via.placeholder.com/100' };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15,
      }}
    >
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ height: 100, aspectRatio: 1, borderRadius: 100 }}
      />
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Hey {user?.firstName} 🐻
      </Text>

      <Text style={{ fontSize: 16 }}>Welcome to the app!</Text>

      <Button title='Go to Dashboard' onPress={() => {}} />
    </View>
  );
}