// src/pages/TextToSpeechPage.js
import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

const TextToSpeechPage = () => {
  const [text, setText] = useState(''); // Estado para almacenar el texto del campo de entrada

  const speak = () => {
    if (text) {
      Speech.speak(text); // Leer el contenido del campo de texto
    } else {
      Speech.speak("Por favor, introduce un texto"); // Si no hay texto, avisa al usuario
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Text to Speech</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe algo aquí"
        onChangeText={setText}
        value={text}
      />
      <Button title="Leer texto" onPress={speak} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default TextToSpeechPage;
