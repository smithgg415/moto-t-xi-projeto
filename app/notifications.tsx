import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, FlatList, Text, Button, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Notify from 'expo-notifications';

const notifications = [
  {
    id: '1',
    title: 'Pedido Confirmado',
    content: 'Seu pedido foi confirmado com sucesso!',
    icon: 'checkmark-circle',
    time: '30 minutos atrás',
  },
  {
    id: '2',
    title: 'Entrega a Caminho',
    content: 'O entregador está a caminho.',
    icon: 'bicycle',
    time: '10 minutos atrás',
  },
  {
    id: '3',
    title: 'Pedido Entregue',
    content: 'Seu pedido foi entregue.',
    icon: 'checkmark-circle',
    time: '2 minutos atrás',
  },
  {
    id: '4',
    title: 'Nova Promoção',
    content: 'Aproveite a nova promoção!',
    icon: 'gift',
    time: '1 hora atrás',
  },
  {

    id: '5',
    title: 'Moto Táxi cancelado',
    content: 'Seu pedido foi cancelado.',
    icon: 'close-circle',
    time: '3 horas atrás',
  }
];
let nome = "Luís";

export default function Notifications() {
  const handleNotificationLocal = async () => {
    await Notify.scheduleNotificationAsync({
      content: {
        title: `Se arrume, ${nome}!`,
        body: "Seu moto táxi está a caminho!",
        data: {}
      },
      trigger: {
        seconds: 1
      }
    });
  }
  const renderItem = ({ item }: { item: typeof notifications[number] }) => (
    <View style={styles.notification}>
      <Ionicons name={item.icon as any} size={40} color="black" style={styles.notificationIcon} />
      <View style={styles.notificationText}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationContent}>{item.content}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ThemedView style={styles.topBar}>
        <TouchableOpacity style={styles.messages}>
          <Entypo name="message" size={35} color="black" />
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.containerText}>
      </ThemedView>
      <Button title="Enviar Notificação " onPress={handleNotificationLocal} />
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsList}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  topBar: {
    paddingTop: 40,
    paddingHorizontal: 10,
    width: '100%',
    height: 60,
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  messages: {
    right: 0,
    position: 'absolute',
    margin: 10,
    borderRadius: 10,
  },
  containerText: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationsList: {
    padding: 20,
  },
  notification: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationIcon: {
    marginRight: 15,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationContent: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});
