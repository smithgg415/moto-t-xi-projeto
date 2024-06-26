import React from 'react';
import { StyleSheet, View, FlatList, Image, Platform } from 'react-native';
import TopBar from '@/components/TopBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';

const paymentData = [
  { id: '1', date: '2023-01-01', description: 'Moto Táxi', amount: 'R$ 14,50' },
  { id: '2', date: '2023-02-26', description: 'Moto Táxi', amount: 'R$ 17,90' },
  { id: '3', date: '2023-12-10', description: 'Entrega de Pacote', amount: 'R$ 11,99' },
  { id: '4', date: '2023-05-12', description: 'Moto táxi', amount: 'R$ 07,00' },
  { id: '5', date: '2023-11-23', description: 'Entrega de Pacote', amount: 'R$ 13,89' },
  { id: '6', date: '2023-01-25', description: 'Moto Táxi', amount: 'R$ 7,75' },

];

const Payments = () => {
  const renderItem = ({ item }: { item: { id: string, date: string, description: string, amount: string } }) => (
    <View style={styles.itemContainer}>
      <Ionicons name="cash" size={32} color="green" style={styles.icon} />
      <View style={styles.itemTextContainer}>
        <ThemedText style={styles.itemText}>{item.description}</ThemedText>
        <ThemedText style={styles.itemSubText}>{item.date}</ThemedText>
      </View>
      <ThemedText style={styles.itemAmount}>{item.amount}</ThemedText>
    </View>
  );

  return (
    <View style={styles.container}>
      <TopBar />
      <ThemedView style={styles.containerText}>
        <ThemedText style={styles.text}>Histórico de Pagamentos</ThemedText>
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
});

export default Payments;
