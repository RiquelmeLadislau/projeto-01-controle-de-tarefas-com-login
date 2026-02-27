import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { theme } from './Theme';

// IMPORTAÇÃO DA PÁGINA EXTERNA
import Login from './src/pages/Login';

export default function App() {
  const [page, setPage] = useState('login'); 
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [priority, setPriority] = useState('Média');
  const [filter, setFilter] = useState('Todas');

  const handleLogin = (u, p) => {
    if (u.toLowerCase() === 'james' && p === '1234') {
      setUser(u);
      setPage('selection');
    } else {
      Alert.alert('AVISO', 'Credenciais incorretas.');
    }
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), title: newTaskTitle, priority, completed: false }]);
    setNewTaskTitle('');
    setPage('list');
  };

  // --- RENDERS CONDICIONAIS ---

  if (page === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  if (page === 'selection') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>BEM-VINDO, {user.toUpperCase()}</Text>
        <TouchableOpacity style={styles.btn} onPress={() => setPage('list')}>
          <Text style={styles.btnText}>ACESSAR INVENTÁRIO</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPage('login')} style={{marginTop: 30}}>
          <Text style={{color: theme.blood, textAlign: 'center'}}>SAIR</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (page === 'add') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>NOVA MANIFESTAÇÃO</Text>
        <TextInput style={styles.input} value={newTaskTitle} onChangeText={setNewTaskTitle} placeholder="in my restless dreams i see that town.Silent Hill" placeholderTextColor="#444" />
        <TouchableOpacity style={styles.btn} onPress={addTask}><Text style={styles.btnText}>REGISTRAR</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setPage('list')} style={{marginTop: 20}}><Text style={{color: theme.fog, textAlign: 'center'}}>Cancelar</Text></TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 40}}>
        <Text style={styles.title}>INVENTÁRIO</Text>
        <TouchableOpacity onPress={() => setPage('selection')}><Text style={{color: theme.blood}}>Voltar</Text></TouchableOpacity>
      </View>
      
      <FlatList 
        data={tasks}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={{color: '#FFF'}}>{item.title}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addBtn} onPress={() => setPage('add')}>
        <Text style={{color: '#FFF', fontSize: 24}}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 25, justifyContent: 'center' },
  title: { fontSize: 22, color: theme.fog, fontWeight: 'bold', marginBottom: 20 },
  btn: { backgroundColor: '#000', padding: 18, alignItems: 'center', borderWidth: 1, borderColor: theme.blood },
  btnText: { color: theme.blood, fontWeight: 'bold' },
  input: { backgroundColor: '#111', color: '#FFF', padding: 15, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: theme.rust },
  card: { backgroundColor: theme.card, padding: 15, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: theme.rust },
  addBtn: { width: 55, height: 55, backgroundColor: theme.blood, alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center' }
});