import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Alert, Modal, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { useState } from 'react';

export default function App() {
  const [userLocation, setUserLocation] = useState({ latitude: '', longitude: '' });
  const [modalVisible, setModalVisible] = useState(false);

  async function GetLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location services.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
      return;
    }

    try {
      let { coords } = await Location.getCurrentPositionAsync();

      if (coords) {
        const { latitude, longitude } = coords;

        setUserLocation({ latitude, longitude });
        setModalVisible(true); // Show modal with location data
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch location. Please try again later.');
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Show My Location" onPress={GetLocation} />

      {/* Modal for showing latitude and longitude */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Latitude: {userLocation.latitude}</Text>
          <Text style={styles.modalText}>Longitude: {userLocation.longitude}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

