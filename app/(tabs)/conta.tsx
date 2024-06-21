import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Image, Platform } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Account() {
  return (
    <View style={styles.scrollview}>
      <ThemedView>
        <ThemedText style={styles.text}>Acesse sua conta</ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
    justifyContent: 'center',
    alignItems:"center"
  },
  text: {
    fontSize: 20,
  }
});
