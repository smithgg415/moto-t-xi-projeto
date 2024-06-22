import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, ScrollView, View,  Image, Platform } from 'react-native';
import TopBar from '@/components/TopBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
export default function DeliveryFood() {
  return (
    <View style={styles.container}>
      <TopBar />
      <ThemedView>
        <ThemedText style={styles.text}>Tem uma lanchonete precisando fazer entrega?</ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor:"gray"
  },
  text: {
    fontSize: 20,
  }
});