import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const FileUploadPage = () => {
  const [fileUri, setFileUri] = useState(null); // Estado para almacenar la URI de la imagen

  const pickImage = async () => {
    // Pide permiso para acceder a la galería
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Es necesario permitir el acceso a la galería.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log("Resultado de la selección de imagen:", result); // Log para depuración

    // Accede a la URI correctamente
    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri; // Accede a la URI de la imagen
      console.log("URI de la imagen seleccionada:", uri); // Log para depuración
      setFileUri(uri); // Establecer la URI en el estado
    } else {
      console.log("Selección de imagen cancelada.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subida de Archivos</Text>
      <Button title="Seleccionar Imagen" onPress={pickImage} />

      {fileUri && (
        <View style={styles.imageContainer}>
          <Text>Imagen seleccionada:</Text>
          <Image 
            source={{ uri: fileUri }} 
            style={styles.image} 
            resizeMode="contain" 
          />
          <Text>URI de la imagen: {fileUri}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%', // Ajusta el ancho del contenedor
    height: 300, // Ajusta la altura del contenedor
    overflow: 'hidden', // Asegúrate de que no se desborde
  },
  image: {
    width: '100%', // La imagen ocupa el 100% del ancho del contenedor
    height: '100%', // La imagen ocupa el 100% de la altura del contenedor
  },
});

export default FileUploadPage;
