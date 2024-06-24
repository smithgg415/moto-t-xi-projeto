import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import TopBar from '@/components/TopBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function Activities() {
  const [selectedDate, setSelectedDate] = useState('');
  const activities = [
    { id: 1, title: 'Corrida 1', date: '2022-01-01' },
    { id: 2, title: 'Corrida 2', date: '2022-01-02' },
    { id: 3, title: 'Corrida 3', date: '2022-01-03' },
    { id: 4, title: 'Corrida 4', date: '2022-01-04' },
    { id: 5, title: 'Corrida 5', date: '2022-01-05' },
    { id: 6, title: 'Corrida 6', date: '2022-01-06' },
    { id: 7, title: 'Corrida 7', date: '2002-01-19' },
  ];

  const filteredActivities = activities.filter(activity => {
    if (!selectedDate) return true;
    return activity.date === selectedDate;
  });

  return (
    <View style={styles.container}>
      <TopBar />
      <ThemedView style={styles.filter}>
        <TextInput 
          style={styles.input} 
          placeholder="Digite a data (YYYY-MM-DD)" 
          placeholderTextColor="#ccc"
          value={selectedDate} 
          onChangeText={setSelectedDate} 
        />
        <Ionicons name="search" size={24} color="#fff" style={styles.icon} />
      </ThemedView>
      <ThemedView style={styles.activies}>
        <ThemedText style={styles.text}>Acesse suas atividades</ThemedText>
      </ThemedView>
      <ThemedView style={styles.containerActivies}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {filteredActivities.map(activity => (
            <TouchableOpacity key={activity.id} style={styles.btn}>
              <ThemedText style={styles.btnText}>{activity.title}</ThemedText>
              <ThemedText style={styles.btnText}>{activity.date}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  activies: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"transparent"
  },
  containerActivies: {
    backgroundColor: '#ffffff',
    width: '90%',
    height: '60%',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  btn: {
    backgroundColor: '#4F8EF7',
    borderRadius: 10,
    marginBottom: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    color: 'white',
  },
  scroll: {
    width: '100%',
  },
  icon: {
    marginLeft: 10,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 50,
  },
  input: {
    height: 40,
    backgroundColor: '#ffffff',
    borderColor: '#4F8EF7',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    width: '70%',
  },
});

