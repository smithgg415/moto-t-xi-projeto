import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, ScrollView, View, Image, Platform, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Entypo from '@expo/vector-icons/Entypo';
export default function Notifications() {
  return (
    <View style={styles.container}>

      <ThemedView style={styles.topBar}>
        <TouchableOpacity style={styles.messages}>
          <Entypo name="message" size={35} color="black" />
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={styles.containerText}>
        <ThemedText style={styles.text}>Veja suas notificações</ThemedText>
      </ThemedView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: "gray"
  },
  text: {
    fontSize: 20,
  },
  topBar: {
    top: 40,
    width: '100%',
    height: 60,
    backgroundColor: 'yellow',
  },
  messages: {
    right: 0,
    position: 'absolute',
    margin: 10,
    borderRadius: 10
  },
  containerText: {
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});