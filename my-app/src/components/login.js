import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Aquí puedes manejar la respuesta exitosa (por ejemplo, guardar el token en AsyncStorage)
        Alert.alert('Login exitoso');
      } else {
        // Aquí manejas los errores de la API
        Alert.alert('Error', data.error || 'Hubo un problema en el inicio de sesión');
      }
    } catch (error) {
      // Manejo de errores de red o cualquier otro error
      console.error('Error:', error);
      alert('Error', 'Hubo un problema en el inicio de sesión');
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('./MobileHub.png')} // Asegúrate de que la imagen esté en el directorio correcto
        style={styles.image}
      />
      <View>
        <Text>Email:</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
        <Text>Password:</Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Login" onPress={handleLogin} color="black"/>
      </View>
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
    width: 200,
    height: 200, 
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
  }
});

export default LoginScreen;