import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Text,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { fetchWeather } from '../components/weather.api';
import { WeatherData } from '../components/weather.types';

export default function HomeScreen() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [time, setTime] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      const data: WeatherData = await fetchWeather(city.trim());
      router.push({ pathname: '/modal', params: data as any });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const quickCities = [
    { name: 'Mumbai', temp: '32°' },
    { name: 'Delhi', temp: '28°' },
    { name: 'Bangalore', temp: '24°' },
    { name: 'London', temp: '12°' },
    { name: 'New York', temp: '18°' },
    { name: 'Tokyo', temp: '22°' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={{ paddingHorizontal: 24, paddingTop: 64, paddingBottom: 24, backgroundColor: '#FFFFFF' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 40, height: 40, backgroundColor: '#111827', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
              <Feather name="cloud" size={20} color="white" />
            </View>
            <Text style={{ fontSize: 24, fontWeight: '300', color: '#111827', fontFamily: 'InterLight' }}>
              Weather
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 12, color: '#6B7280', fontFamily: 'InterRegular' }}>
              {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#1F2937', fontFamily: 'InterMedium' }}>
              {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 24 }} showsVerticalScrollIndicator={false}>
        {/* Search Card */}
        <Animated.View entering={FadeIn.duration(600)} style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2, marginBottom: 24, marginTop: 24 }}>
          <View style={{ position: 'relative', marginBottom: 16 }}>
            <View style={{ position: 'absolute', left: 16, top: 14, zIndex: 1 }}>
              <Feather name="search" size={18} color="#9CA3AF" />
            </View>
            <TextInput
              style={{ backgroundColor: '#F9FAFB', paddingLeft: 48, paddingRight: 16, paddingVertical: 14, borderRadius: 16, color: '#1F2937', fontSize: 14, fontFamily: 'InterRegular' }}
              placeholder="Search location..."
              placeholderTextColor="#9CA3AF"
              value={city}
              onChangeText={setCity}
              returnKeyType="search"
              onSubmitEditing={handleSearch}
              editable={!loading}
            />
          </View>
          
          <TouchableOpacity
            style={{ backgroundColor: '#111827', paddingVertical: 14, borderRadius: 16, alignItems: 'center' }}
            onPress={handleSearch}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '500', fontFamily: 'InterMedium' }}>
                Get Forecast
              </Text>
            )}
          </TouchableOpacity>

          {error ? (
            <Animated.View entering={FadeIn.duration(300)} style={{ marginTop: 16, backgroundColor: '#FEF2F2', padding: 12, borderRadius: 12 }}>
              <Text style={{ color: '#DC2626', fontSize: 14, textAlign: 'center', fontFamily: 'InterRegular' }}>
                {error}
              </Text>
            </Animated.View>
          ) : null}
        </Animated.View>

        {/* Quick Cities */}
        <Animated.View entering={FadeInDown.duration(600).delay(200)}>
          <Text style={{ fontSize: 11, fontWeight: '500', color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12, paddingHorizontal: 4, fontFamily: 'InterMedium' }}>
            Popular Cities
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 }}>
            {quickCities.map((item) => (
              <View key={item.name} style={{ width: '50%', paddingHorizontal: 6, marginBottom: 12 }}>
                <TouchableOpacity
                  style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
                  onPress={() => {
                    setCity(item.name);
                    setTimeout(() => handleSearch(), 100);
                  }}
                  activeOpacity={0.7}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Feather name="map-pin" size={14} color="#9CA3AF" />
                    <Text style={{ fontSize: 24, fontWeight: '300', color: '#1F2937', fontFamily: 'InterLight' }}>
                      {item.temp}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 14, fontWeight: '500', color: '#1F2937', fontFamily: 'InterMedium' }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 2, fontFamily: 'InterRegular' }}>
                    Partly cloudy
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Feature Cards */}
        <Animated.View entering={FadeInDown.duration(600).delay(400)} style={{ flexDirection: 'row', marginTop: 12, marginBottom: 24 }}>
          <LinearGradient
            colors={['#3B82F6', '#2563EB']}
            style={{ flex: 1, borderRadius: 16, padding: 16, marginRight: 12 }}
          >
            <Feather name="calendar" size={20} color="white" />
            <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 8, fontFamily: 'InterRegular' }}>
              This Week
            </Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFFFFF', fontFamily: 'InterSemiBold' }}>
              7-Day Forecast
            </Text>
          </LinearGradient>

          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            style={{ flex: 1, borderRadius: 16, padding: 16 }}
          >
            <Feather name="clock" size={20} color="white" />
            <Text style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 8, fontFamily: 'InterRegular' }}>
              Today
            </Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#FFFFFF', fontFamily: 'InterSemiBold' }}>
              Hourly Details
            </Text>
          </LinearGradient>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
