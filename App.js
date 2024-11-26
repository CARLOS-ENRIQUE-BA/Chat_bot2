import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomePage from './src/pages/HomePage';
import QRPage from './src/pages/QRPage';
import GeminiChat from './src/pages/GeminiChat'; // Importa la página de GeminaiChat

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color }) => <Ionicons name="home" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="QR"
          component={QRPage}
          options={{
            tabBarLabel: 'QR',
            tabBarIcon: ({ color }) => <Ionicons name="qr-code-outline" color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="GeminaiChat"
          component={GeminiChat}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color }) => <Ionicons name="chatbubbles-outline" color={color} size={24} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}