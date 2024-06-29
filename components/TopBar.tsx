import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ThemedView } from '@/components/ThemedView';
export default function TopBar() {
    const navigation = useNavigation();
    return (
        <ThemedView style={styles.topBar}>
            <TouchableOpacity style={styles.notification} onPress={() => navigation.navigate("notifications")}>
                <Ionicons name="notifications" size={35} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.messages} onPress={() => navigation.navigate("chat")}>
                <Entypo name="message" size={35} color="black" />
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    topBar: {
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