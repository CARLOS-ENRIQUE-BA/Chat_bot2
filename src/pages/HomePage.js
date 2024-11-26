// src/pages/HomePage.js
import React from 'react';
import { View, Text, Button, StyleSheet, Image, Linking } from 'react-native';

const HomePage = () => {
  const openGitHubRepo = () => {
    Linking.openURL('https://github.com/CARLOS-ENRIQUE-BA/cel-phone-tools');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Universidad Politécnica de Chiapas</Text>
      <Text style={styles.subtitle}>Ingeniería en Software</Text>
      <Text style={styles.subtitle}>Carlos Enrique Barriga Aguilar</Text>
      <Text style={styles.subtitle}>221188</Text>
      <Text style={styles.subtitle}>Programación para moviles II</Text>
      <Text style={styles.subtitle}>9-A</Text>
      <Button title="Ver Repositorio en GitHub" onPress={openGitHubRepo} />
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
  image: {
    width: 200, // Ajusta el ancho según tus necesidades
    height: 200, // Ajusta la altura según tus necesidades
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Centra el texto
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center', // Centra el texto
  },
});

export default HomePage;
