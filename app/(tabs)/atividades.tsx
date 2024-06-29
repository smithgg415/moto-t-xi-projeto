import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import TopBar from '@/components/TopBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

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

    const renderItem = ({ item }: { item: { id: string, title: string, date: string } }) => (
        <View style={styles.itemContainer}>
            <Ionicons name="newspaper" size={32} color="black" style={styles.icon} />
            <View style={styles.itemTextContainer}>
                <ThemedText style={styles.itemText}>{item.title}</ThemedText>
                <ThemedText style={styles.itemSubText}>{item.date}</ThemedText>
            </View>
            <TouchableOpacity style={{ backgroundColor: "red", padding: 5, borderRadius: 5, marginLeft: 5 }} onPress={() => removeActivity(item.id)}>
                <ThemedText>
                    <Ionicons name="trash" size={32} color="white" style={styles.iconTrash} />
                </ThemedText>
            </TouchableOpacity>
        </View>

    );

    return (
        <View style={styles.container}>
            <TopBar />
            <ThemedView style={styles.activies}>
                <ThemedText style={styles.text}>Acesse suas atividades</ThemedText>
            </ThemedView>

            <ThemedView style={styles.containerAdd}>
                <TouchableOpacity onPress={addAtividades} style={{width:"100%", justifyContent:"center", alignItems:"center"}}>
                    <Ionicons name="add-circle" size={24} color="#fff" />
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.containerActivies}>
                <FlatList data={atividadesData} renderItem={renderItem} keyExtractor={(item) => item.id} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} />
            </ThemedView>
        </View>
    );
}

const styles = StyleSheet.create({

    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
    },
    iconTrash: {
        marginRight: 10,
    },
    itemTextContainer: {
        flex: 1,
    },
    itemText: {
        fontSize: 18,
    },
    itemSubText: {
        fontSize: 14,
        color: 'gray',
    },
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
    activies: {
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "transparent"
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
        top:30
    },
    containerAdd: {
        width:200,
        height:50,
        backgroundColor: '#4F8EF7',
        borderRadius: 10,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        top:20,
    },
    btnText: {
        fontSize: 18,
        color: 'white',
    },
    scroll: {
    },
    icon: {
        marginRight:20
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
