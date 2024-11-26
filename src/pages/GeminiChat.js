import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import * as Speech from "expo-speech";
import { Ionicons } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const API_KEY = "AIzaSyAs55jqEi3-v0MarSzwS-tE3_11qHdaux4"; // Reemplaza con tu clave de API

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem('messages');
        if (storedMessages) {
          const parsedMessages = JSON.parse(storedMessages);
          setMessages(parsedMessages); // Carga todos los mensajes al iniciar
        }
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    loadMessages();
  }, []);

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      showMessage({
        message: "No Internet",
        description: "Please check your internet connection.",
        type: "warning",
        icon: "warning",
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    const userMessage = { text: userInput, user: true };

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, userMessage];
      AsyncStorage.setItem('messages', JSON.stringify(updatedMessages)); // Guarda todo el historial
      return updatedMessages;
    });

    try {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // Toma solo los últimos 5 mensajes como contexto
      const lastFiveMessages = messages.slice(-5).map(msg => msg.text).join("\n");

      const response = await model.generateContent(lastFiveMessages + "\n" + userInput);
      const text = response.response.text();

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, { text, user: false }];
        AsyncStorage.setItem('messages', JSON.stringify(updatedMessages)); // Actualiza el historial
        return updatedMessages;
      });
      setLoading(false);
      setUserInput("");

      if (text) {
        Speech.speak(text, { language: "en-US" });
        setIsSpeaking(true);
      }
    } catch (error) {
      console.error("Error al procesar el mensaje:", error);
      showMessage({
        message: "Error",
        description: "There was an error processing your request. Please try again.",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
      setLoading(false);
    }
  };

  const stopSpeaking = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    }
  };

  const clearInput = () => {
    setUserInput("");
    setMessages([]);
    AsyncStorage.removeItem('messages');
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.user ? styles.userMessageContainer : styles.botMessageContainer,
      ]}
    >
      <Image
        source={
          item.user
            ? require('../../assets/img/personIcon.jpg')
            : require('../../assets/img/botIcon.png')
        }
        style={styles.avatar}
      />
      <Text
        style={item.user ? styles.userMessageText : styles.botMessageText}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
      />
      {loading && <ActivityIndicator size="large" color="#2196F3" />}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.clearIcon}
          onPress={clearInput}
        >
          <Ionicons name="trash-bin" size={24} color="white" />
        </TouchableOpacity>
        <TextInput
          placeholder="Type a message"
          onChangeText={setUserInput}
          value={userInput}
          onSubmitEditing={sendMessage}
          style={styles.input}
          placeholderTextColor="black"
          multiline={true}
          textAlignVertical="top"
        />
        <TouchableOpacity style={styles.sendIcon} onPress={sendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.stopButton}
        onPress={stopSpeaking}
        disabled={!isSpeaking}
      >
        <Text style={styles.stopButtonText}>Stop Voice</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
  },
  messageContainer: { 
    flexDirection: 'row',
    padding: 10, 
    marginVertical: 5,
  },
  userMessageContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    padding: 10,
    flexDirection: 'row-reverse',
    maxWidth: '80%', // Limita el ancho máximo del mensaje
    marginHorizontal: 10,
    flexShrink: 1, // Permite que el contenedor se ajuste al contenido
  },
  botMessageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#2196F3",
    borderRadius: 15,
    padding: 10,
    paddingRight: 20,  // Añadido más espacio a la derecha para evitar el desbordamiento
    flexDirection: 'row',
    maxWidth: '80%', // Limita el ancho máximo del mensaje
    marginHorizontal: 10, // Añade margen horizontal
    flexShrink: 1, // Permite que el contenedor se ajuste al contenido
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 10,
    marginTop: 5,
  },
  userMessageText: { 
    color: "white", 
    fontSize: 16,
    paddingLeft: 50,
    flexWrap: 'wrap',
  },
  botMessageText: {
    color: "white",
    fontSize: 16,
    paddingRight: 50,
    flexWrap: 'wrap',  // Permite que el texto haga saltos de línea si es necesario
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    marginHorizontal: 10,
    minHeight: 40, // Ajuste mínimo de altura para el TextInput
  },
  clearIcon: {
    padding: 10,
    backgroundColor: "#FF5722",
    borderRadius: 50,
  },
  sendIcon: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 50,
  },
  stopButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  stopButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default GeminiChat;
