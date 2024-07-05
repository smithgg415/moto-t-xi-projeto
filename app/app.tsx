import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notify from 'expo-notifications';

import DeliveryFood from '../components/screens/deliveryfood';
import DeliveryPackage from '../components/screens/deliverypackage';
import MotoTaxi from '../components/screens/mototaxi';
import Notifications from '../components/screens/notifications';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="DeliveryFood" component={DeliveryFood} />
        <Stack.Screen name="DeliveryPackage" component={DeliveryPackage} />
        <Stack.Screen name="MotoTaxi" component={MotoTaxi} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;