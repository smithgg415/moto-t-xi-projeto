import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import TopBar from '@/components/TopBar';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome5 } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null > (null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão para acessar localização negada');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.scrollview}>
      <StatusBar style="dark" />
      <TopBar />
      <View style={styles.container}>
        {location && (
          <ThemedView style={styles.containerMap}>
            <MapView style={styles.map} initialRegion={{ latitude: location.coords.latitude,
                longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421,}}>
              <Marker coordinate={{latitude: location.coords.latitude, longitude: location.coords.longitude,}} title="Localização atual" description="Esta é a sua localização atual" />
            </MapView>
          </ThemedView>
        )}
        <ThemedView style={styles.rowServices}>
          <ThemedView style={styles.servicesContainer}>
            <TouchableOpacity style={styles.services} onPress={() => navigation.navigate("deliverypackage")}>
              <FontAwesome5 name="box" size={48} color="#cd853f" />
            </TouchableOpacity>
            <ThemedText style={styles.serviceName}>Entrega</ThemedText>
            <ThemedText style={styles.serviceName}>de pacotes</ThemedText>
          </ThemedView>
          <ThemedView style={styles.servicesContainer}>
            <TouchableOpacity style={styles.services} onPress={() => navigation.navigate("mototaxi")}>
              <FontAwesome5 name="motorcycle" size={50} color="#808080" />
            </TouchableOpacity>
            <ThemedText style={styles.serviceName}>Moto</ThemedText>
            <ThemedText style={styles.serviceName}>Táxi</ThemedText>
          </ThemedView>
          <ThemedView style={styles.servicesContainer}>
            <TouchableOpacity style={styles.services} onPress={()=> navigation.navigate("deliveryfood")}>
              <Ionicons name="fast-food" size={50} color="#41C0F2" />
            </TouchableOpacity>
            <ThemedText style={styles.serviceName}>Entrega</ThemedText>
            <ThemedText style={styles.serviceName}> de Comida</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.containerPopUp}>
          <ThemedText style={styles.messagePopUp}>Para onde vamos?</ThemedText>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("mototaxi")}>
            <Fontisto name="motorcycle" size={40} color="black" />
          </TouchableOpacity>
        </ThemedView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: 330,
    height: 200,
    borderRadius: 20,
  },
  containerMap: {
    marginTop: 100,
    width: 330,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  scrollview: {
    height: "100%",
    backgroundColor: 'gray',
  },
  rowServices: {
    backgroundColor: "transparent",
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  services: {
    margin: 10,
    backgroundColor: 'yellow',
    padding: 15,
    borderRadius: 10
  },
  servicesContainer: {
    backgroundColor: "transparent",
  },
  serviceName: {
    textAlign: 'center',
    fontSize: 20,
    color: "white",
    fontWeight: 'bold'
  },
  containerPopUp: {
    position: "relative",
    marginTop: 120,
    right: -50,
    bottom: 0,
    backgroundColor: "transparent",
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    display: "flex",
    flexDirection: "row"
  },
  btn: {
    width: 70,
    height:70,
    backgroundColor: 'yellow',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagePopUp: {
    backgroundColor: "yellow",
    fontSize: 20,
    color: "black",
    padding: 10,
    borderRadius:10,
    fontWeight: 'bold',
    marginRight: 5
  }
});