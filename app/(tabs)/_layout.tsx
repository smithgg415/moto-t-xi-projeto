import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "yellow",
            height: 70,
            paddingTop:5,
            paddingBottom: 15,
          //   bottom: 40,
          //   position: "absolute",
          //   width: 320,
          //   left: 35,
          //   borderRadius: 35,
         }
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={"black"} />
            ),
          }}
        />
        < Tabs.Screen
          name="atividades"
          options={{
            title: 'Atividades',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'newspaper' : 'newspaper-outline'} color={"black"} />
            ),
          }}
        />

        < Tabs.Screen
          name="pagamentos"
          options={{
            title: 'Pagamentos',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon name={focused ? 'cash' : 'cash-outline'} color={"black"} />
            ),
          }}
        />

        < Tabs.Screen
          name="conta"
          options={{
            title: 'Conta',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'person' : 'person-outline'} color={"black"} />
            ),
          }}
        />

      </Tabs >
  );
}
