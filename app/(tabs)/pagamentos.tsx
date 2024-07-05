import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import TopBar from '@/components/TopBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Payment {
  id: string;
  date: string;
  description: string;
  amount: string;
}

interface Card {
  id: string;
  cardNumber: string;
  expiryDate: string;
}

const Payments = () => {
  const [paymentData, setPaymentData] = useState<Payment[]>([
    { id: '1', date: '2023-01-01', description: 'Moto Táxi', amount: 'R$ 14,50' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDelete, setModalVisibleDelete] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardList, setCardList] = useState<Card[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const addPayment = () => {
    const id = (paymentData.length + 1).toString();
    const date = (new Date()).toISOString().split('T')[0];
    let description = "";
    const amount = "R$ " + (Math.random() * 100).toFixed(2);
    const amountNumber = parseFloat(amount.replace("R$ ", ""));
    if (amountNumber > 30) {
      description = "Entrega de Pacote";
    }
    else {
      description = "Moto Táxi";
    }
    setPaymentData(oldData => [...oldData, { id, date, description, amount }]);
  };

  const removePayment = (id: string) => {
    setPaymentData(oldData => oldData.filter(item => item.id !== id));
  };

  const addCard = () => {
    const id = (cardList.length + 1).toString();
    setCardList([...cardList, { id, cardNumber, expiryDate }]);
    setCardNumber('');
    setExpiryDate('');
    setModalVisible(false);
  };

  const removeCard = () => {
    if (selectedCardId) {
      setCardList(oldData => oldData.filter(item => item.id !== selectedCardId));
      setSelectedCardId(null);
      setModalVisibleDelete(false);
    }
  };

  const formatCardNumber = (number: string) => {
    return number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  // Função para formatar a data de expiração
  const formatExpiryDate = (date: string) => {
    const cleaned = date.replace(/\s?/g, '');
    if (cleaned.length > 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const renderRightActions = (id: string) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => removePayment(id)}>
      <Ionicons name="trash" size={32} color="white" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Payment }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.itemContainer}>
        <Ionicons name="cash" size={32} color="green" style={styles.icon} />
        <View style={styles.itemTextContainer}>
          <ThemedText style={styles.itemText}>{item.description}</ThemedText>
          <ThemedText style={styles.itemSubText}>{item.date}</ThemedText>
        </View>
        <ThemedText style={styles.itemAmount}>{item.amount}</ThemedText>
      </View>
    </Swipeable>
  );

  const renderCardItem = ({ item }: { item: Card }) => (
    <View style={styles.cardItemContainer}>
      <Ionicons name="card" size={32} color="blue" style={styles.icon} />
      <TouchableOpacity
        style={styles.itemTextContainer}
        onPress={() => {
          setSelectedCardId(item.id);
          setModalVisibleDelete(true);
        }}
      >
        <ThemedText style={styles.itemText}>Cartão: {item.cardNumber}</ThemedText>
        <ThemedText style={styles.itemSubText}>Expira em: {item.expiryDate}</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <TopBar />
      <ThemedView style={styles.containerText}>
        {paymentData.length > 0 && (
          <ThemedText style={styles.text}>Histórico de Pagamentos</ThemedText>
        )}
        <ThemedView style={styles.btn}>
          <TouchableOpacity onPress={addPayment} style={styles.buttonAdd}>
            <Ionicons name="add-circle" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.buttonAdd}>
            <Ionicons name="card" size={24} color="#fff" />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      <FlatList
        data={paymentData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      {cardList.length > 0 && (
        <ThemedText style={styles.text}>Cartões Salvos</ThemedText>
      )}
      <FlatList
        data={cardList}
        renderItem={renderCardItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ThemedText style={styles.modalText}>Adicionar Cartão de Crédito/Débito</ThemedText>
            <TextInput onChangeText={() => {}} style={styles.input} placeholder="Nome do Titular" />
            <TextInput
              style={styles.input}
              placeholder="Número do Cartão"
              value={cardNumber}
              onChangeText={(text) => setCardNumber(formatCardNumber(text))}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Data de Expiração MM/AA"
              value={expiryDate}
              onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
            />
            <TouchableOpacity style={styles.button} onPress={addCard}>
              <ThemedText style={styles.buttonText}>Adicionar</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
              <ThemedText style={styles.buttonText}>Cancelar</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleDelete}
        onRequestClose={() => setModalVisibleDelete(!modalVisibleDelete)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ThemedText style={styles.modalText}>Excluir Cartão</ThemedText>
            <TouchableOpacity style={styles.button} onPress={removeCard}>
              <ThemedText style={styles.buttonText}>Confirmar</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisibleDelete(!modalVisibleDelete)}>
              <ThemedText style={styles.buttonText}>Cancelar</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
  },
  containerText: {
    backgroundColor: 'transparent',
    padding: 10,
    top: 50,
  },
  listContainer: {
    padding: 10,
    top: 100,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
  },
  itemSubText: {
    fontSize: 14,
    color: 'gray',
  },
  itemAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  btn: {
    display:"flex",
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  buttonAdd: {
    backgroundColor: '#4F8EF7',
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 100,
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 10,
    marginLeft: 10,
    top: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: 300,
    textAlign:"center",
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    marginVertical: 10,
  },
  buttonClose: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Payments;
