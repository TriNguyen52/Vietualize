import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export interface CardData {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  location?: string;
  duration?: string;
  difficulty?: string;
  description?: string;
  image: any;
  gradient: readonly [string, string, ...string[]];
}

interface CardSwiperProps {
  cards: CardData[];
  cardWidth?: number;
  cardHeight?: number;
  spacing?: number;
}

const CardSwiper: React.FC<CardSwiperProps> = ({
  cards,
  cardWidth = screenWidth * 0.90,
  cardHeight = screenHeight * 0.55,
  spacing = 20,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const cardWithLineWidth = cardWidth + spacing + 12; // 8 for vertical line and margins
    const index = Math.round(offsetX / cardWithLineWidth);
    setCurrentIndex(index);
  };

  const renderCard = (card: CardData, index: number) => {
    return (
      <View key={card.id} className="flex-row">
        <View
          className="rounded-[20px] overflow-hidden shadow-2xl"
          style={{
            width: cardWidth,
            height: cardHeight,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
        >
          <LinearGradient
            colors={card.gradient}
            style={{ 
              flex: 1, 
              padding: 24,
              borderRadius: 20
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            {/* Text Content Section */}
            <View style={{ flexShrink: 0 }}>
              <View style={{ alignSelf: 'flex-start' }}>
                <Text style={{ 
                  color: 'white', 
                  fontSize: 14, 
                  fontWeight: 'normal',
                  opacity: 0.8 
                }}>
                  {card.duration || 'estimate • 5 min'}
                </Text>
                {card.category && (
                  <Text style={{ 
                    color: 'white', 
                    fontSize: 12, 
                    fontWeight: 'normal',
                    marginTop: 4,
                    opacity: 0.6 
                  }}>
                    {card.category}
                  </Text>
                )}
              </View>
              
              <View style={{ marginTop: 20, marginBottom: 20 }}>
                <Text style={{ 
                  color: 'white', 
                  fontSize: 32, 
                  fontWeight: '300',
                  lineHeight: 38,
                  letterSpacing: -1 
                }}>
                  {card.title}
                </Text>
                {card.subtitle && (
                  <Text style={{ 
                    color: 'white', 
                    fontSize: 16, 
                    fontWeight: 'normal',
                    marginTop: 8,
                    opacity: 0.8 
                  }}>
                    {card.subtitle}
                  </Text>
                )}
                {card.location && (
                  <Text style={{ 
                    color: 'white', 
                    fontSize: 14, 
                    fontWeight: '500',
                    marginTop: 12,
                    opacity: 0.7 
                  }}>
                    {card.location}
                  </Text>
                )}
                {card.difficulty && (
                  <Text style={{ 
                    color: 'white', 
                    fontSize: 14, 
                    fontWeight: '500',
                    marginTop: 8,
                    opacity: 0.7 
                  }}>
                    {card.difficulty}
                  </Text>
                )}
                {card.description && (
                  <Text style={{ 
                    color: 'white', 
                    fontSize: 12, 
                    fontWeight: 'normal',
                    marginTop: 12,
                    lineHeight: 16,
                    opacity: 0.6 
                  }}>
                    {card.description}
                  </Text>
                )}
              </View>
            </View>
            
            {/* Image Section */}
            <View style={{ 
              flex: 1, 
              justifyContent: 'center', 
              alignItems: 'center',
              paddingTop: 20,
              paddingBottom: 20
            }}>
              <Image
                source={card.image}
                style={{
                  width: cardWidth * 0.4,
                  height: cardHeight * 0.4,
                  borderRadius: 15,
                  resizeMode: 'cover'
                }}
              />
            </View>
          </LinearGradient>
        </View>
        {/* Vertical line between cards */}
        {index < cards.length - 1 && (
          <View 
            className="bg-white ml-4 mr-4"
            style={{ 
              width: 1, 
              height: cardHeight * 0.95,
              alignSelf: 'center',
              opacity: 0.2
            }} 
          />
        )}
      </View>
    );
  };

  return (
    <View className="flex-1 justify-center items-center pt-4">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={cardWidth + spacing + 12}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingHorizontal: (screenWidth - cardWidth) / 2,
        }}
      >
        {cards.map((card, index) => renderCard(card, index))}
      </ScrollView>
    </View>
  );
};

// Sample data
const sampleCards: CardData[] = [
  {
    id: '1',
    title: 'Tokyo\nFood Tour',
    subtitle: 'Culinary Adventure',
    category: 'Food & Culture',
    location: 'Shibuya, Tokyo',
    duration: '3-4 hours',
    difficulty: 'Easy',
    description: 'Explore authentic street food and hidden gems in the heart of Tokyo',
    image: require('../../assets/images/wink.png'),
    gradient: ['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)'] as const,
  },
  {
    id: '2',
    title: 'Berlin\nStreet Art',
    subtitle: 'Urban Exploration',
    category: 'Art & Culture',
    location: 'Kreuzberg, Berlin',
    duration: '2-3 hours',
    difficulty: 'Moderate',
    description: 'Discover vibrant street art and underground culture with local artists',
    image: require('../../assets/images/wink.png'),
    gradient: ['rgba(139,69,19,0.3)', 'rgba(139,69,19,0.7)'] as const,
  },
  {
    id: '3',
    title: 'Bangkok\nTemples',
    subtitle: 'Spiritual Journey',
    category: 'Culture & History',
    location: 'Old City, Bangkok',
    duration: '4-5 hours',
    difficulty: 'Easy',
    description: 'Visit ancient temples and learn about Thai Buddhist traditions',
    image: require('../../assets/images/wink.png'),
    gradient: ['rgba(75,0,130,0.3)', 'rgba(75,0,130,0.7)'] as const,
  },
];

// Main component usage example
const HorizontalSliding: React.FC<{ cards?: CardData[] }> = ({ cards = sampleCards }) => {
  return (
    <View className="flex-1 bg-black justify-center">
      <CardSwiper cards={cards} />
    </View>
  );
};

export default HorizontalSliding;