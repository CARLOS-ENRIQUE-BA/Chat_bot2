import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const SensorsPage = () => {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const subscription = Accelerometer.addListener(accelerometerData => { //Escucha continuamente las actualizaciones del acelerómetro.
      // Suavizar los datos promediando
      const alpha = 0.1; // Factor de suavizado
      setData(prevData => ({
        x: prevData.x + alpha * (accelerometerData.x - prevData.x),
        y: prevData.y + alpha * (accelerometerData.y - prevData.y),
        z: prevData.z + alpha * (accelerometerData.z - prevData.z),
      }));
    });

    Accelerometer.setUpdateInterval(100); // Actualizar cada 100 ms

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>X: {data.x.toFixed(2)}</Text>
      <Text style={styles.text}>Y: {data.y.toFixed(2)}</Text>
      <Text style={styles.text}>Z: {data.z.toFixed(2)}</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default SensorsPage;
