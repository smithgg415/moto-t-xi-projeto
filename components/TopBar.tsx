import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
export default function TopBar() {
    return (
        <ThemedView style={styles.topBar}>
            <TouchableOpacity style={styles.notification}>
                <Ionicons name="notifications" size={35} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.messages}>
                <Entypo name="message" size={35} color="black" />
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    topBar: {
        top: 20,
        width: '100%',
        height: 60,
        backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    notification: {
        margin: 10,
        borderRadius: 10
    },
    messages: {
        margin: 10,
        borderRadius: 10
    }
});