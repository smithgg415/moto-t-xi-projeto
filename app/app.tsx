import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DeliveryFood from './(tabs)/deliveryfood';
import DeliveryPackage from './(tabs)/deliverypackage';
import MotoTaxi from './(tabs)/mototaxi';
import Notifications from './(tabs)/notifications';

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