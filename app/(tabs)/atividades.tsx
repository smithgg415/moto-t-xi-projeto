import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import TopBar from '@/components/TopBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Activity {
  id: string;
  title: string;
  date: string;
}

export default function Activities() {
  const [atividadesData, setAtividadesData] = useState<Activity[]>([
    { id: "1", title: 'Moto Táxi', date: '2000-03-21' },
  ]);

  const addAtividades = () => {
    const id = (atividadesData.length + 1).toString();
    const title = Math.random() < 0.5 ? 'Moto Táxi' : 'Entrega de Pacote';
    const date = (new Date()).toISOString().split('T')[0];
    setAtividadesData(oldData => [...oldData, { id: id, title, date }]);
  };

  const removeActivity = (id: string) => {
    setAtividadesData(oldData => oldData.filter(item => item.id !== id));
  };

  const renderRightActions = (id: string) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeActivity(id)}
      >
        <Ionicons name="trash" size={32} color="white" />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: { id: string, title: string, date: string } }) => (
    <Swipeable
      renderRightActions={() => renderRightActions(item.id)}
    >
      <View style={styles.itemContainer}>
        <Ionicons name="newspaper-outline" size={32} color="black"  />
        <View>
          <ThemedText>{item.title}</ThemedText>
        </View>
        <ThemedText>{item.date}</ThemedText>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <TopBar />
      <ThemedView style={styles.activies}>
        <ThemedText style={styles.text}>Acesse suas atividades</ThemedText>
      </ThemedView>
      <ThemedView style={styles.btnContainer}>
          <TouchableOpacity onPress={addAtividades} style={styles.btnAdd}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </ThemedView>
      <ThemedView style={styles.containerActivies}>
        <FlatList
          data={atividadesData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
  },
  text: {
    top:30,
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
  },
  btnAdd: {
    top:30,
    width: "100%",
    height:50,
    backgroundColor: '#4F8EF7',
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activies: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "transparent"
  },
  containerActivies: {
    top:30,
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
  btnContainer: {
    width:200,
    height:50,
    backgroundColor: 'transparent',
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
  itemContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: '100%',
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
