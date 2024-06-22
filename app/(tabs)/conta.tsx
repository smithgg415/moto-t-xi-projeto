import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';

const Account = () => {
  let user = ["Pedro Toledo", "pedro@outlook.com", "(11) 99999-9999", "São Paulo, SP", "José Bonifácio, 44", "3"];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require('../../assets/images/icon.png')}
        />
        <Text style={styles.name}>{user[0]}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="mail" size={24} color="#4F8EF7" />
          <Text style={styles.infoText}>{user[1]}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call" size={24} color="#4F8EF7" />
          <Text style={styles.infoText}>{user[2]}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location" size={24} color="#4F8EF7" />
          <Text style={styles.infoText}>{user[3]}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location" size={24} color="#4F8EF7" />
          <Text style={styles.infoText}>Endereços cadastrados: <ThemedText style={{color:"#4f8ef7"}}>{user[4]}</ThemedText></Text>
        </View>
        <TouchableOpacity style={styles.infoRow}>
          <Ionicons name="card" size={24} color="#4F8EF7" />
          <Text style={styles.infoText}>Cartões cadastrados: <ThemedText style={{ color: '#4F8EF7' }}>{user[5]}</ThemedText></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: 'yellow',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4F8EF7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  name: {
    marginTop: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    overflow: 'hidden',
  },
  infoText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#555',
  },
});

export default Account;
