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
        height: 60,
      },
      tabBarActiveTintColor: '#001737',
      tabBarInactiveTintColor: '#FF914D',
      tabBarLabelStyle: {
        fontSize: 13,
        marginBottom: 4
      },
    }}
    >
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />

<Tab.Screen
        name="Calendário"
        component={CalendarScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Arquivo"
        component={FileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="file" color={color} size={size} />
          ),
        }}
      />

    <Tab.Screen
        name="Profissionais"
        component={ProfessionalScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="users" color={color} size={size} />
          ),
        }}
      />

    <Tab.Screen
        name="Pacientes"
        component={PatientsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
  },
});
