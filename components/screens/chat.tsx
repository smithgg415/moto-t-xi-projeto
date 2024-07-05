import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, TextInput, Text, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: '2', text: 'Ok, estarei esperando.', sender: 'usuario' },
    { id: '1', text: 'Olá, estou a caminho!', sender: 'motoqueiro' },
  ]);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: message, sender: 'usuario' }]);
      setMessage('');
    }
  };

  const renderItem = ({ item }: { item: { id: string, text: string, sender: string } }) => (
    <View style={[styles.messageContainer, item.sender === 'usuario' ? styles.userMessage : styles.motoqueiroMessage]}>
      <ThemedText style={styles.messageText}>{item.text}</ThemedText>
    </View>
  );
  const pilots = [
    { name: "João", photo: require('../assets/images/icon.png') },
    { name: "Maria", photo: require('../assets/images/avaliacao.png') },
    { name: "José", photo: require('../assets/images/mapa.jpg') },
    { name: "Ana", photo: require('../assets/images/moto.jpg')}
  ];
  
  const randomPilot = pilots[Math.floor(Math.random() * pilots.length)];
  
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.pilot}>
        <ThemedView style={styles.perfilImage}>
        <Image source={randomPilot.photo} style={styles.image}/>
        </ThemedView>
        <ThemedText style={styles.namePilot}>{randomPilot.name}</ThemedText>
      </ThemedView>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatContainer}
        inverted
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  chatContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  messageContainer: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    maxWidth: '75%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
  },
  motoqueiroMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'gray',
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
  },
  pilot: {
    width: "100%",
    height: 130,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  perfilImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  namePilot: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  }
});
