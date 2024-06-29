import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Image, Platform, Button, TouchableOpacity, Animated } from 'react-native';
import TopBar from '@/components/TopBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Payment {
  id: string;
  date: string;
  description: string;
  amount: string;
}


const Payments = () => {

  const [paymentData, setPaymentData] = useState<Payment[]>([
    { id: '1', date: '2023-01-01', description: 'Moto Táxi', amount: 'R$ 14,50' },
  ])

  const addPayment = () => {
    const id = paymentData.length + 1;
    const date = (new Date()).toISOString().split('T')[0];
    const description = Math.random() < 0.5 ? 'Moto Táxi' : 'Entrega de Pacote';
    const amount = "R$ " + (Math.random() * 100).toFixed(2);
    setPaymentData(oldData => [...oldData, { id: id.toString(), date, description, amount }])
  }

  const removePayment = (id: string) => {
    setPaymentData(oldData => oldData.filter(item => item.id !== id))
  }
  const renderItem = ({ item }: { item: { id: string, date: string, description: string, amount: string } }) => (
    <View style={styles.itemContainer}>
      <Ionicons name="cash" size={32} color="green" style={styles.icon} />
      <View style={styles.itemTextContainer}>
        <ThemedText style={styles.itemText}>{item.description}</ThemedText>
        <ThemedText style={styles.itemSubText}>{item.date}</ThemedText>
      </View>
      <ThemedText style={styles.itemAmount}>{item.amount}</ThemedText>
      <TouchableOpacity style={{ backgroundColor: "red", padding: 5, borderRadius: 5, marginLeft: 5, alignItems:"center" }} onPress={() => removePayment(item.id)}>
        <ThemedText>
          <Ionicons name="trash" size={32} color="white" style={styles.icon} />
        </ThemedText>
      </TouchableOpacity>
    </View>
  );




  return (
    <View style={styles.container}>
      <TopBar />
      <ThemedView style={styles.containerText}>
        <ThemedText style={styles.text}>Histórico de Pagamentos</ThemedText>

        <ThemedView style={styles.btn}>
          <TouchableOpacity onPress={() => { addPayment() }} style={styles.buttonAdd}>
            <Ionicons name="add-circle" size={24} color="#fff" />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      <FlatList
        data={paymentData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

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
  containerText: {
    backgroundColor: 'transparent',
    padding: 10,
    top: 50
  },
  listContainer: {
    padding: 10,
    top: 100
  },
  itemContainer: {
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
  }
});

export default Payments;
