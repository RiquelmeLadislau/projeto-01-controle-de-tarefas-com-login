import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../Theme'; // Sobe duas pastas para achar o Theme

export default function Login({ onLogin }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SILENT <Text style={{color: theme.blood}}>HILL</Text></Text>
      <TextInput 
        style={styles.input} 
        placeholder="Quem é você?" 
        placeholderTextColor="#444" 
        onChangeText={setUser} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        placeholderTextColor="#444" 
        secureTextEntry 
        onChangeText={setPass} 
      />
      <TouchableOpacity style={styles.btn} onPress={() => onLogin(user, pass)}>
        <Text style={styles.btnText}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 25, justifyContent: 'center' },
  logo: { fontSize: 40, fontWeight: 'bold', color: theme.fog, textAlign: 'center', marginBottom: 40, letterSpacing: 5 },
  input: { backgroundColor: '#111', color: '#FFF', padding: 15, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: theme.rust },
  btn: { backgroundColor: '#000', padding: 18, alignItems: 'center', borderWidth: 1, borderColor: theme.blood },
  btnText: { color: theme.blood, fontWeight: 'bold', letterSpacing: 2 },
});