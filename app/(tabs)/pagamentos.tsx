import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, ScrollView, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
export default function Payments() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView>
        <ThemedText style={styles.text}>Acesse seus pagamentos</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
  }
});