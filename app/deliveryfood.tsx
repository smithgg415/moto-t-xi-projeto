import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';
import TopBar from '@/components/TopBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import Modal from 'react-native-modal';

export default function DeliveryFood() {
  const [restaurantName, setRestaurantName] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [isAddressMismatchVisible, setAddressMismatchVisible] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setPickupLocation('Permissão de localização negada');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync(location.coords);
      if (address.length > 0) {
        const { street, name, city, region, postalCode } = address[0];
        const formattedAddress = `${street}, ${name}, ${city}, ${region}, ${postalCode}`;
        setCurrentLocation(formattedAddress);
        setPickupLocation(formattedAddress);
      }
    })();
  }, []);

  const handleOrder = () => {
    if (pickupLocation !== currentLocation) {
      setAddressMismatchVisible(true);
    } else {
      setModalVisible(true);
    }
  };

  const confirmOrder = () => {
    setModalVisible(false);
    setConfirmationVisible(true);
  };

  const handleMismatchConfirm = () => {
    setAddressMismatchVisible(false);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.content}>
          <ThemedText style={styles.text}>Tem uma lanchonete precisando fazer entrega?</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Nome do Restaurante"
            value={restaurantName}
            onChangeText={setRestaurantName}
          />
          <TextInput
            style={styles.input}
            placeholder="Local de Retirada"
            value={pickupLocation}
            onChangeText={setPickupLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="Local de Entrega"
            value={deliveryLocation}
            onChangeText={setDeliveryLocation}
          />
          <TouchableOpacity style={styles.button} onPress={handleOrder}>
            <Text style={styles.buttonText}>Solicitar Moto Táxi</Text>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Confirme seu Pedido</ThemedText>
          <ThemedText>Nome do Restaurante: {restaurantName}</ThemedText>
          <ThemedText>Local de Retirada: {pickupLocation}</ThemedText>
          <ThemedText>Local de Entrega: {deliveryLocation}</ThemedText>
          <TouchableOpacity style={styles.modalButton} onPress={confirmOrder}>
            <Text style={styles.modalButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={isConfirmationVisible} onBackdropPress={() => setConfirmationVisible(false)}>
        <View style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Motoqueiro a Caminho</ThemedText>
          <Ionicons name="checkmark-circle" size={64} color="green" style={styles.confirmationIcon} />
          <TouchableOpacity style={styles.modalButton} onPress={() => setConfirmationVisible(false)}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={isAddressMismatchVisible} onBackdropPress={() => setAddressMismatchVisible(false)}>
        <View style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Endereço Diferente</ThemedText>
          <ThemedText>O endereço de retirada é diferente da sua localização atual. Deseja continuar?</ThemedText>
          <TouchableOpacity style={styles.modalButton} onPress={handleMismatchConfirm}>
            <Text style={styles.modalButtonText}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setAddressMismatchVisible(false)}>
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modalButton: {
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  confirmationIcon: {
    marginVertical: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
    marginTop: 10,
  },
});