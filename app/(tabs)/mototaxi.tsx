import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, ScrollView, View, Text, TextInput, Modal, TouchableOpacity } from 'react-native';
import TopBar from '@/components/TopBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as Location from 'expo-location';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

export default function MotoTaxi() {
  const [modalVisible, setModalVisible] = useState(true);
  const [currentAddress, setCurrentAddress] = useState('');
  const [currentCoords, setCurrentCoords] = useState(null);
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      if (reverseGeocode.length > 0) {
        setCurrentAddress(`${reverseGeocode[0].street}, ${reverseGeocode[0].city}`);
        setCurrentCoords({ latitude: location.coords.latitude, longitude: location.coords.longitude });
      }
    })();
  }, []);

  const calculateDistanceAndPrice = async () => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=${GOOGLE_MAPS_API_KEY}`);
      const destinationCoords = response.data.results[0].geometry.location;

      const distanceResponse = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${currentCoords.latitude},${currentCoords.longitude}&destinations=${destinationCoords.lat},${destinationCoords.lng}&key=${GOOGLE_MAPS_API_KEY}`);

      const distanceInKm = distanceResponse.data.rows[0].elements[0].distance.value / 1000; // Convert meters to kilometers
      setDistance(distanceInKm);

      const calculatedPrice = 7 + 4 * distanceInKm;
      setPrice(calculatedPrice);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <ThemedView>
        <ThemedText style={styles.text}>Pegue um moto táxi</ThemedText>
      </ThemedView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <ThemedView style={styles.locationContainer}>
              <ThemedText style={styles.locationText}>{currentAddress}</ThemedText>
            </ThemedView>
            <TextInput
              style={styles.input}
              placeholder="Digite o destino"
              placeholderTextColor="#ccc"
              value={destination}
              onChangeText={setDestination}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={calculateDistanceAndPrice}
            >
              <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>
            {distance && price && (
              <ThemedView style={styles.resultContainer}>
                <ThemedText style={styles.resultText}>Distância: {distance.toFixed(2)} km</ThemedText>
                <ThemedText style={styles.resultText}>Preço: R$ {price.toFixed(2)}</ThemedText>
              </ThemedView>
            )}
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: 'gray',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  locationContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#4F8EF7',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#FF6347',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
});
