import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { WeatherData } from './components/weather.types';

const getWeatherTheme = (temp: number, description: string) => {
  const t = Number(temp);
  const desc = description.toLowerCase();
  
  if (t > 30 || desc.includes('clear') || desc.includes('sun')) {
    return { 
      gradient: ['#F59E0B', '#EF4444'], 
      icon: 'sun', 
      isDark: false 
    };
  } else if (desc.includes('rain') || desc.includes('drizzle')) {
    return { 
      gradient: ['#3B82F6', '#06B6D4'], 
      icon: 'cloud-rain', 
      isDark: false 
    };
  } else if (desc.includes('cloud')) {
    return { 
      gradient: ['#6B7280', '#9CA3AF'], 
      icon: 'cloud', 
      isDark: true 
    };
  } else if (desc.includes('snow')) {
    return { 
      gradient: ['#E5E7EB', '#9CA3AF'], 
      icon: 'cloud-snow', 
      isDark: true 
    };
  }
  return { 
    gradient: ['#8B5CF6', '#EC4899'], 
    icon: 'cloud-lightning', 
    isDark: false 
  };
};

export default function ModalScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { city, temperature, description } = params as unknown as WeatherData;
  const theme = getWeatherTheme(Number(temperature), description || '');
  const textColor = theme.isDark ? '#1F2937' : '#FFFFFF';
  const secondaryColor = theme.isDark ? '#6B7280' : 'rgba(255,255,255,0.7)';

  return (
    <LinearGradient colors={theme.gradient} style={{ flex: 1 }}>
      <StatusBar barStyle={theme.isDark ? 'dark-content' : 'light-content'} />
      
      {/* Header */}
      <View style={{ paddingHorizontal: 24, paddingTop: 64, paddingBottom: 24 }}>
        <TouchableOpacity 
          style={{ 
            width: 40, 
            height: 40, 
            backgroundColor: theme.isDark ? 'rgba(17,24,39,0.1)' : 'rgba(255,255,255,0.2)', 
            borderRadius: 12, 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={20} color={textColor} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 24 }} showsVerticalScrollIndicator={false}>
        {/* Weather Icon */}
        <Animated.View entering={FadeInDown.duration(500)} style={{ alignItems: 'center', marginBottom: 32 }}>
          <View 
            style={{ 
              width: 112, 
              height: 112, 
              backgroundColor: theme.isDark ? 'rgba(17,24,39,0.1)' : 'rgba(255,255,255,0.2)', 
              borderRadius: 24, 
              alignItems: 'center', 
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 5
            }}
          >
            <Feather name={theme.icon as any} size={56} color={textColor} />
          </View>
        </Animated.View>

        {/* Temperature & Location */}
        <Animated.View entering={FadeInUp.duration(600)} style={{ alignItems: 'center', marginBottom: 48 }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 96, fontWeight: '300', color: textColor, fontFamily: 'InterLight' }}>
              {temperature}
            </Text>
            <Text style={{ fontSize: 40, fontWeight: '300', marginTop: 12, color: secondaryColor, fontFamily: 'InterLight' }}>
              °C
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Feather name="map-pin" size={16} color={secondaryColor} />
            <Text style={{ fontSize: 24, fontWeight: '300', marginLeft: 8, color: textColor, fontFamily: 'InterLight' }}>
              {city}
            </Text>
          </View>
          
          <Text style={{ fontSize: 18, textTransform: 'capitalize', color: secondaryColor, fontFamily: 'InterRegular' }}>
            {description}
          </Text>
        </Animated.View>

        {/* Stats Card */}
        <Animated.View entering={FadeInUp.duration(700)}>
          <View 
            style={{ 
              backgroundColor: theme.isDark ? 'rgba(17,24,39,0.1)' : 'rgba(255,255,255,0.15)', 
              borderRadius: 24, 
              padding: 24, 
              marginBottom: 24,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Feather name="thermometer" size={24} color={secondaryColor} />
                <Text style={{ fontSize: 12, marginTop: 8, color: secondaryColor, fontFamily: 'InterRegular' }}>
                  Feels like
                </Text>
                <Text style={{ fontSize: 20, fontWeight: '300', marginTop: 4, color: textColor, fontFamily: 'InterLight' }}>
                  {Math.round(Number(temperature) * 0.95)}°
                </Text>
              </View>
              
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Feather name="wind" size={24} color={secondaryColor} />
                <Text style={{ fontSize: 12, marginTop: 8, color: secondaryColor, fontFamily: 'InterRegular' }}>
                  Wind
                </Text>
                <Text style={{ fontSize: 20, fontWeight: '300', marginTop: 4, color: textColor, fontFamily: 'InterLight' }}>
                  12 km/h
                </Text>
              </View>
              
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Feather name="droplet" size={24} color={secondaryColor} />
                <Text style={{ fontSize: 12, marginTop: 8, color: secondaryColor, fontFamily: 'InterRegular' }}>
                  Humidity
                </Text>
                <Text style={{ fontSize: 20, fontWeight: '300', marginTop: 4, color: textColor, fontFamily: 'InterLight' }}>
                  78%
                </Text>
              </View>
            </View>
            
            <View style={{ height: 1, backgroundColor: theme.isDark ? 'rgba(17,24,39,0.1)' : 'rgba(255,255,255,0.2)', marginBottom: 24 }} />
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Feather name="eye" size={24} color={secondaryColor} />
                <Text style={{ fontSize: 12, marginTop: 8, color: secondaryColor, fontFamily: 'InterRegular' }}>
                  Visibility
                </Text>
                <Text style={{ fontSize: 20, fontWeight: '300', marginTop: 4, color: textColor, fontFamily: 'InterLight' }}>
                  10 km
                </Text>
              </View>
              
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Feather name="compass" size={24} color={secondaryColor} />
                <Text style={{ fontSize: 12, marginTop: 8, color: secondaryColor, fontFamily: 'InterRegular' }}>
                  Pressure
                </Text>
                <Text style={{ fontSize: 20, fontWeight: '300', marginTop: 4, color: textColor, fontFamily: 'InterLight' }}>
                  1013 mb
                </Text>
              </View>
              
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '300', color: textColor, fontFamily: 'InterLight' }}>
                  ↑{Number(temperature) + 4}° ↓{Number(temperature) - 6}°
                </Text>
                <Text style={{ fontSize: 12, marginTop: 8, color: secondaryColor, fontFamily: 'InterRegular' }}>
                  High / Low
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInUp.duration(800)} style={{ flexDirection: 'row', marginBottom: 32 }}>
          <TouchableOpacity 
            style={{ 
              flex: 1, 
              backgroundColor: theme.isDark ? 'rgba(17,24,39,0.1)' : 'rgba(255,255,255,0.15)', 
              borderRadius: 16, 
              padding: 16, 
              marginRight: 12, 
              alignItems: 'center' 
            }}
            activeOpacity={0.7}
          >
            <Feather name="clock" size={20} color={secondaryColor} />
            <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 8, color: textColor, fontFamily: 'InterMedium' }}>
              Hourly
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{ 
              flex: 1, 
              backgroundColor: theme.isDark ? 'rgba(17,24,39,0.1)' : 'rgba(255,255,255,0.15)', 
              borderRadius: 16, 
              padding: 16, 
              alignItems: 'center' 
            }}
            activeOpacity={0.7}
          >
            <Feather name="calendar" size={20} color={secondaryColor} />
            <Text style={{ fontSize: 14, fontWeight: '500', marginTop: 8, color: textColor, fontFamily: 'InterMedium' }}>
              7-Day
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}