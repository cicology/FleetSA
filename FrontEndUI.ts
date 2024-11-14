import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

// Mock data for vehicles
const vehiclesData = [
  { id: '1', name: 'Truck 001', status: 'Active', location: { latitude: 37.78825, longitude: -122.4324 } },
  { id: '2', name: 'Van 002', status: 'Inactive', location: { latitude: 37.78925, longitude: -122.4344 } },
  { id: '3', name: 'Car 003', status: 'Active', location: { latitude: 37.78725, longitude: -122.4304 } },
];

export default function FleetManagementScreen() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  // Function to simulate fetching data
  const fetchData = async () => {
    try {
      // Simulate a delay for fetching data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Set the vehicles data here if fetching from an API
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle vehicle selection and center the map
  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    const { latitude, longitude } = vehicle.location;
    setMapRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  const renderVehicleItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.vehicleItem,
        selectedVehicle?.id === item.id && styles.selectedVehicleItem,
      ]}
      onPress={() => handleVehicleSelect(item)}
    >
      <Feather name={item.status === 'Active' ? 'truck' : 'x-circle'} size={24} color={item.status === 'Active' ? '#4CAF50' : '#F44336'} />
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleName}>{item.name}</Text>
        <Text style={styles.vehicleStatus}>{item.status}</Text>
      </View>
      <Feather name="chevron-right" size={24} color="#A0A0A0" />
    </TouchableOpacity>
  );

  const { width, height } = Dimensions.get('window');

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView ref={mapRef} style={styles.map} region={mapRegion}>
          {vehiclesData.map(vehicle => (
            <Marker
              key={vehicle.id}
              coordinate={vehicle.location}
              title={vehicle.name}
              description={vehicle.status}
            />
          ))}
        </MapView>
      </View>

      <FlatList
        data={vehiclesData}
        renderItem={renderVehicleItem}
        keyExtractor={item => item.id}
      />

      {selectedVehicle && (
        <View style={styles.vehicleDetail}>
          <Text style={styles.vehicleDetailText}>Selected Vehicle: {selectedVehicle.name}</Text>
          <Text style={styles.vehicleDetailText}>Status: {selectedVehicle.status}</Text>
          <Text style={styles.vehicleDetailText}>Location: {`Lat: ${selectedVehicle.location.latitude}, Lng: ${selectedVehicle.location.longitude}`}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '70%', // 70% of the screen height
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedVehicleItem: {
    backgroundColor: '#e0f7fa',
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: 10,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vehicleStatus: {
    fontSize: 14,
    color: '#666',
  },
  vehicleDetail: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  vehicleDetailText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
