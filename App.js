import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [data, setData] = useState(''); // Dato almacenado
  const [inputValue, setInputValue] = useState(''); // Dato ingresado

  // Cargar el dato almacenado al iniciar la aplicación
  useEffect(() => {
    getData();
  }, []);

  // Guardar el dato ingresado por input
  const saveData = async () => {
    try {
      await AsyncStorage.setItem('dato', inputValue);
      console.log('Dato guardado correctamente.');
      setData(inputValue);
      setInputValue('');
    } catch (error) {
      console.log('Error al guardar el dato:', error);
    }
  };

  // Obtener el dato almacenado en el dispositivo
  const getData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('dato');
      if (storedData !== null) {
        setData(storedData);
      }
    } catch (error) {
      console.log('Error al obtener el dato:', error);
    }
  };

  // Eliminar el dato almacenado en el dispositivo
  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('dato');
      console.log('Dato eliminado correctamente.');
      setData('');
    } catch (error) {
      console.log('Error al eliminar el dato:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dato almacenado: {data}</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Ingresa un dato"
      />
      <Button title="Guardar Dato" onPress={saveData} />
      <Button title="Eliminar Dato" onPress={deleteData} color="#FF0000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
});
