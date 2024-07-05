import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import TopBar from '@/components/TopBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Modal from 'react-native-modal';
import * as Notify from 'expo-notifications';

export default function DeliveryPackage() {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const [currentLocation, setCurrentLocation] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);
  const [isValidationErrorVisible, setValidationErrorVisible] = useState(false);
  const [widthError, setWidthError] = useState(false);
  const [heightError, setHeightError] = useState(false);
  const [weightError, setWeightError] = useState(false);

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
        const { street, name } = address[0];
        const formattedAddress = `${street}, ${name}`;
        setCurrentLocation(formattedAddress);
        setPickupLocation(formattedAddress);
      }
    })();
  }, []);

  const handleOrder = () => {
    const widthValue = parseFloat(width);
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);

    let hasError = false;

    if (widthValue > 40) {
      setWidthError(true);
      hasError = true;
    } else {
      setWidthError(false);
    }

    if (heightValue > 25) {
      setHeightError(true);
      hasError = true;
    } else {
      setHeightError(false);
    }

    if (weightValue > 4) {
      setWeightError(true);
      hasError = true;
    } else {
      setWeightError(false);
    }

    if (hasError) {
      setValidationErrorVisible(true);
      return;
    }

    if (pickupLocation !== currentLocation) {
      setConfirmationVisible(true);
    } else {
      setModalVisible(true);
    }
  };

  const confirmOrder = () => {
    setModalVisible(false);
    Alert.alert('Pedido Confirmado', `Endereço de Retirada: ${pickupLocation}\nEndereço de Entrega: ${deliveryLocation}\nMedidas: ${width}cm x ${height}cm\nPeso: ${weight}kg`);
    Notify.scheduleNotificationAsync({
      content: {
        title: 'Moto Táxi a caminho!',
        body: 'Aguarde atualizações.',
      },
      trigger: {
        seconds: 3,
      },
    });
  };
  const handleCancelEntrega = async () => {
    await Notify.scheduleNotificationAsync({
      content: {
        title: "Entrega cancelada",
        body: "Atualize o endereço de retirada e tente novamente.",
        data: {}
      },
      trigger: null
    });
  }
  return (
    <View style={styles.container}>
      <TopBar />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.content}>
          <ThemedText style={styles.text}>Envie pacotes</ThemedText>
          <TextInput
            style={[styles.input, widthError && styles.errorInput]}
            placeholder="Largura (cm)"
            value={width}
            onChangeText={setWidth}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, heightError && styles.errorInput]}
            placeholder="Altura (cm)"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, weightError && styles.errorInput]}
            placeholder="Peso (kg)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço de Retirada"
            value={pickupLocation}
            onChangeText={setPickupLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="Endereço de Entrega"
            value={deliveryLocation}
            onChangeText={setDeliveryLocation}
          />
          <TouchableOpacity style={styles.button} onPress={handleOrder}>
            <Text style={styles.buttonText}>Solicitar Entrega</Text>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Confirme seu Pedido</ThemedText>
          <ThemedText>Endereço de Retirada: {pickupLocation}</ThemedText>
          <ThemedText>Endereço de Entrega: {deliveryLocation}</ThemedText>
          <ThemedText>Medidas: {width}cm x {height}cm</ThemedText>
          <ThemedText>Peso: {weight}kg</ThemedText>
          <TouchableOpacity style={styles.modalButton} onPress={confirmOrder}>
            <Text style={styles.modalButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={isConfirmationVisible} onBackdropPress={() => setConfirmationVisible(false)}>
        <View style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Endereço Diferente</ThemedText>
          <ThemedText>O endereço inserido é diferente da sua localização atual. Deseja continuar?</ThemedText>
          <TouchableOpacity style={styles.modalButton} onPress={() => { setConfirmationVisible(false); setModalVisible(true); }}>
            <Text style={styles.modalButtonText}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.cancelModalButton]} onPress={() => { setConfirmationVisible(false); handleCancelEntrega(); }}>
            <Text style={styles.modalButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal isVisible={isValidationErrorVisible} onBackdropPress={() => setValidationErrorVisible(false)}>
        <View style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Erro de Validação</ThemedText>
          <ThemedText>As medidas da caixa devem ser menores que:</ThemedText>
          <ThemedText>Largura: 40cm</ThemedText>
          <ThemedText>Altura: 25cm</ThemedText>
          <ThemedText>Peso: 4kg</ThemedText>
          <TouchableOpacity style={styles.modalButton} onPress={() => setValidationErrorVisible(false)}>
            <Text style={styles.modalButtonText}>OK</Text>
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
  errorInput: {
    borderColor: 'red',
  },
  button: {
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {

    height: 500,
    width: 400,
    bottom: -400,
    left: -23,
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
  cancelModalButton: {
    backgroundColor: "red",
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
