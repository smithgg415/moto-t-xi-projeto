import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Text, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

interface Notificacao {
  id: string;
  title: string;
  content: string;
  icon: string;
  time: string;
}
let nome = "Luís";
const notificationTemplates = [
  { title: 'Pedido Confirmado', content: 'Seu pedido foi confirmado com sucesso!', icon: 'checkmark-circle' },
  { title: `Se arrume ${nome}`, content: 'Seu moto táxi está a caminho!', icon: 'bicycle' },
  { title: 'Aproveite esse cupom!', content: 'Aproveite 50% de desconto na próxima compra!', icon: 'gift' },
  { title: 'Mensagem Recebida', content: 'Você recebeu uma nova mensagem!', icon: 'mail' },
  { title: 'Atualização Disponível', content: 'Uma nova atualização está disponível para o seu aplicativo.', icon: 'download' }
];

export default function Notifications() {
  const [notificationData, setNotificationData] = useState<Notificacao[]>([
    { id: '1', title: 'Pedido Confirmado', content: 'Seu pedido foi confirmado com sucesso!', icon: 'checkmark-circle', time: '30 minutos atrás' },
  ]);

  const addNotification = () => {
    const id = (notificationData.length + 1).toString();
    const randomTemplate = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
    const time = 'Agora';
    setNotificationData(oldData => [...oldData, { id, ...randomTemplate, time }]);
  };

  const removeNotification = (id: string) => {
    setNotificationData(oldData => oldData.filter(item => item.id !== id));
  };

  const renderRightActions = (id: string) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => removeNotification(id)}>
      <Ionicons name="trash" size={30} color="white" />
    </TouchableOpacity>
  );

  const renderItem = ({ item }: { item: Notificacao }) => (
    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
      <View style={styles.notification}>
        <Ionicons name={item.icon as any} size={40} color="black" style={styles.notificationIcon} />
        <View style={styles.notificationText}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationContent}>{item.content}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemedView style={styles.topBar}>
        <TouchableOpacity style={styles.messages}>
          <Entypo name="message" size={35} color="black" />
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={{backgroundColor:"transparent", alignItems:"center"}}>
        <TouchableOpacity style={{ backgroundColor: "#007bff", width: 100, marginTop:10 ,alignItems: "center", padding: 10, borderRadius: 15 }} onPress={addNotification}>
          <Ionicons name="add-circle" color="white" size={40} />
        </TouchableOpacity>
      </ThemedView>
      <FlatList
        data={notificationData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsList}
      />
    </GestureHandlerRootView>
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
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    top: 20,
    marginLeft: 10,
    height: 70,
    borderRadius: 10,
  },
});
