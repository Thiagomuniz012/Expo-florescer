import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { FileScreen } from '../pages/FileScreen';
import { ProfessionalScreen } from '../pages/ProfessionalScreen';
import { MenuScreen } from '../pages/MenuScreen';
import { CalendarScreen } from '../pages/CalendarScreen';
import { PatientsScreen } from '../pages/PatientsScreen';

const Tab = createBottomTabNavigator();

export default function TabMenu() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        height: 80,
      },
      tabBarActiveTintColor: '#001737',
      tabBarInactiveTintColor: '#FF914D',
      tabBarLabelStyle: {
        fontSize: 13,
        marginBottom: -11
      },
      tabBarStyle: {
        height: 70,
        top: 0,
      },
    }}
    >
      <Tab.Screen
        name="ㅤ"
        component={MenuScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
        style={styles.desenho}
      />

<Tab.Screen
        name="ㅤㅤㅤㅤㅤㅤ"
        component={CalendarScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
        }}
        style={styles.desenho}
      />

      <Tab.Screen
        name="ㅤㅤㅤㅤ"
        component={FileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="file" color={color} size={size} />
          ),
        }}
        style={styles.desenho}
      />

    <Tab.Screen
        name="ㅤㅤㅤ"
        component={ProfessionalScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="users" color={color} size={size} />
          ),
        }}
        style={styles.desenho}
      />

    <Tab.Screen
        name="ㅤㅤ"
        component={PatientsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
        style={styles.desenho}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  
});

