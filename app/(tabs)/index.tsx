import { StyleSheet, ScrollView, View, TouchableOpacity, Image, ImageBackground, Modal } from 'react-native';
import TopBar from '@/components/TopBar';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import * as Notify from 'expo-notifications';

export default function HomeScreen() {
  
  Notify.setNotificationHandler ({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão para acessar localização negada');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const navigation = useNavigation();
  // const [modalVisible, setModalVisible] = useState(true);

  return (
    <>
      <ScrollView style={styles.scrollview}>
        <TopBar />
        <View style={styles.container}>
          {location && (
            <ThemedView style={styles.containerMap}>
              <MapView style={styles.map} initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
                <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} title="Localização atual" description="Esta é a sua localização atual" />
              </MapView>
            </ThemedView>
          )}
          <ScrollView horizontal={true} style={styles.rowServices} showsHorizontalScrollIndicator={false}>
            <ThemedView style={styles.servicesContainer}>
              <TouchableOpacity style={styles.services} onPress={() => navigation.navigate("deliverypackage")}>
                <FontAwesome5 name="box" size={48} color="#cd853f" />
              </TouchableOpacity>
              <ThemedText style={styles.serviceName}>Entrega</ThemedText>
              <ThemedText style={styles.serviceName}>de pacotes</ThemedText>
            </ThemedView>
            <ThemedView style={styles.servicesContainer}>
              <TouchableOpacity style={styles.services} onPress={() => navigation.navigate("mototaxi")}>
                <FontAwesome6 name="motorcycle" size={50} color="#000" />
              </TouchableOpacity>
              <ThemedText style={styles.serviceName}>Moto</ThemedText>
              <ThemedText style={styles.serviceName}>Táxi</ThemedText>
            </ThemedView>
            <ThemedView style={styles.servicesContainer}>
              <TouchableOpacity style={styles.services} onPress={() => navigation.navigate("deliveryfood")}>
                <Ionicons name="fast-food" size={50} color="#FA8072" />
              </TouchableOpacity>
              <ThemedText style={styles.serviceName}>Entrega</ThemedText>
              <ThemedText style={styles.serviceName}> de Comida</ThemedText>
            </ThemedView>
          </ScrollView>
          <ScrollView horizontal={true} style={{ width: "100%" }} showsHorizontalScrollIndicator={false}>
            <ThemedView style={styles.item}>
              <Image source={require('../../assets/images/moto.jpg')} style={styles.image} />
              <ThemedText style={styles.title}>Viaje com Agilidade</ThemedText>
              <ThemedText style={styles.subText}>Temos pilotos próprios e experientes, com boas avaliações.</ThemedText>
              <FontAwesome5 name="motorcycle" size={40} color="black" style={styles.icon} />
            </ThemedView>
            <ThemedView style={styles.item}>
              <Image source={require('../../assets/images/mapa.jpg')} style={styles.image} />
              <ThemedText style={styles.title}>Acompanhe em tempo Real
              </ThemedText>
              <ThemedText style={styles.subText}>Compartilhe sua localização com amigos, ela sempre fica ativa durante uma corrida.</ThemedText>
              <Ionicons name="location" size={40} color="black" style={styles.icon} />
            </ThemedView>
            <ThemedView style={styles.item}>
              <ImageBackground source={require('../../assets/images/avaliacao.png')} style={styles.image}>
                <ThemedView style={{ backgroundColor: "transparent", flexDirection: "row", bottom: -55 }}>
                  <Ionicons name="star" size={40} color="yellow" />
                  <Ionicons name="star" size={40} color="yellow" />
                  <Ionicons name="star" size={40} color="yellow" />
                  <Ionicons name="star" size={40} color="yellow" />
                  <Ionicons name="star" size={40} color="yellow" />
                </ThemedView>
              </ImageBackground>
              <ThemedText style={styles.title}>Avalie os pilotos</ThemedText>
              <ThemedText style={styles.subText}>Avalie como foi a viagem, nos conte o que você achou.</ThemedText>
              <Ionicons name="people" size={40} color="black" style={styles.icon} />
            </ThemedView>
          </ScrollView>
          <ScrollView horizontal={true} style={{ width: "100%" }} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.itemRowTwo}>
              <Image source={require('../../assets/images/image.jpg')} style={styles.image} />
              <ThemedText style={styles.title}>Adicione até 3 paradas</ThemedText>
              <ThemedText style={styles.subTextRowTwo}>Precisa parar durante a viagem em algum lugar? Adicione paradas.</ThemedText>
              <AntDesign name="pluscircleo" size={40} color="black" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemRowTwo} onPress={() => navigation.navigate("mototaxi")}>
              <Image source={require('../../assets/images/loc.jpg')} style={styles.image} />
              <ThemedText style={styles.title}>Vamos lá?!</ThemedText>
              <ThemedText style={styles.subTextRowTwo}>Tudo pronto? Agora é só pedir um moto táxi!</ThemedText>
              <Ionicons name="caret-forward-circle-outline" size={40} color="black" style={styles.icon} />
            </TouchableOpacity>
          </ScrollView>
        </View>
        {/*
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ImageBackground source={require('../../assets/images/avaliacao.png')} style={styles.modalImage}>
                <ThemedText style={styles.modalTitle}>Peça sua corrida agora mesmo!</ThemedText>
                <ThemedText style={styles.modalDescription}>Rápido, seguro e com pilotos avaliados. Solicite já!</ThemedText>
              </ImageBackground>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        */}
      </ScrollView>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 22,
  // },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   padding: 35,
  //   height: 600,
  //   width: 350,
  //   alignItems: 'center',
  //   elevation: 10,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3,
  //   shadowRadius: 4,
  // },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  // buttonClose: {
  //   backgroundColor: 'red',
  //   position: "absolute",
  //   right: -5,
  //   top: -10,
  //   height: 50,
  //   width: 50,
  //   borderRadius: 50,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  // modalImage: {
  //   width: 300,
  //   height: 500,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // modalTitle: {
  //   textAlign: 'center',
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   color: 'white',
  //   marginBottom: 10,
  // },
  // modalDescription: {
  //   textAlign: 'center',
  //   fontSize: 18,
  //   color: 'white',
  //   marginBottom: 20,
  // },
  container: {
    flex: 1,
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: 330,
    height: 200,
    borderRadius: 20,
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  containerMap: {
    marginTop: 100,
    width: 330,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  scrollview: {
    height: "100%",
    backgroundColor: 'gray',
  },
  rowServices: {
    backgroundColor: "transparent",
    flexDirection: 'row',
    marginBottom: 20,
  },
  services: {
    margin: 10,
    backgroundColor: 'yellow',
    padding: 15,
    borderRadius: 10,
    width: 150,
    height: 100,
    justifyContent: "center",
    alignItems: 'center',
  },
  servicesContainer: {
    backgroundColor: "transparent",
  },
  serviceName: {
    textAlign: 'center',
    fontSize: 25,
    color: "white",
    fontWeight: 'bold',
  },
  item: {
    width: 300,
    height: 220,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
    padding: 10,
    color: 'black',
  },
  subText: {
    top: -10,
    fontSize: 15,
    textAlign: 'justify',
    padding: 10,
    color: 'gray',
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  itemRowTwo: {
    width: 370,
    height: 190,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 10,
  },
  subTextRowTwo: {
    top: -18,
    fontSize: 15,
    textAlign: 'justify',
    padding: 10,
    color: 'gray',
  },
});
