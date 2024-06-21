import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, ScrollView ,Image, Platform, View } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Activies() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView>
        <ThemedText>Atividades</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'gray',
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
});