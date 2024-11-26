import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const QRPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted'); // Se guarda si se concede el permiso
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScannedData(data); // Guarda los datos del QR escaneado
  };

  const handleScanAgain = () => {
    setScannedData(null); // Resetea el estado para escanear de nuevo
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scannedData ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scannedData && (
        <View style={styles.scannedContainer}>
          <Text style={styles.scannedText}>
            Información del QR: {scannedData}
          </Text>
          <Button title="Volver a escanear" onPress={handleScanAgain} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannedContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semi-transparente
    padding: 10,
    borderRadius: 5,
  },
  scannedText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10, // Espaciado entre el texto y el botón
  },
});

export default QRPage;
