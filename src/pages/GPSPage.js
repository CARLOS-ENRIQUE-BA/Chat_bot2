import React, { useEffect, useState } from 'react';
import { View, Text, Button, Linking, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const GPSPage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

    // Obtener la posición actual
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);  // Guardar la ubicación en el estado
    })();
  }, []);

  const openMaps = () => {
    if (location) {
      const { latitude, longitude } = location.coords;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Latitud: {location ? location.coords.latitude : 'Loading...'}
      </Text>
      <Text style={styles.text}>
        Longitud: {location ? location.coords.longitude : 'Loading...'}
      </Text>
      {location && (
        <Button title="Open in Google Maps" onPress={openMaps} />
      )}
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default GPSPage;
