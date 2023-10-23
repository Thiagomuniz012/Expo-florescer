import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();


  const isEmailValid = (text) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(text);
  };

  const handleLogin = () => {
    if (!isEmailValid(email)) {
      alert('Por favor, insira um email válido.');
      return;
    }

    if (email === 'email@gmail.com' && password === '1212') {
      navigation.navigate('MenuScreen');
    } else {
      alert('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>

<Image
  style={{ width: 340, height: 180, marginBottom: 150, marginTop: -150 }}
  source={{ uri: "https://i.imgur.com/zIjUXo1.png" }}
/>

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Digite seu email"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Digite sua senha"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 16,
    padding: 8,
  },
  button: {
    backgroundColor: '#FF914D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  }
});
