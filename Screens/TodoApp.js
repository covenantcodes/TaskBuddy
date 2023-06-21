import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');

  const addTodo = () => {
    if (todoText.trim() !== '') {
      const newTodo = { id: Date.now(), text: todoText, status: 'pending' };
      setTodos([...todos, newTodo]);
      setTodoText('');
    }
  };

  const updateTodoStatus = (id, status) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Create Todo:</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 5, marginBottom: 10 }}
        value={todoText}
        onChangeText={setTodoText}
      />
      <Button title="Add Todo" onPress={addTodo} />
      <Text>All Todos:</Text>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>{item.text}</Text>
            <Button
              title="Pending"
              onPress={() => updateTodoStatus(item.id, 'pending')}
              disabled={item.status === 'pending'}
            />
            <Button
              title="In Progress"
              onPress={() => updateTodoStatus(item.id, 'inProgress')}
              disabled={item.status === 'inProgress'}
              style={styles.inProgressButton}
            />
            <Button
              title="Completed"
              onPress={() => updateTodoStatus(item.id, 'completed')}
              disabled={item.status === 'completed'}
              style={styles.completedButton}
            />
            <Button
              title="Delete"
              onPress={() => deleteTodo(item.id)}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  statusButton: {
    backgroundColor: '#ff9800',
    color: '#fff',
    marginLeft: 5,
  },
  inProgressButton: {
    backgroundColor: '#9c27b0',
    color: '#fff',
    marginLeft: 5,
  },
  completedButton: {
    backgroundColor: '#607d8b',
    color: '#fff',
    marginLeft: 5,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    marginLeft: 5,
  },
})
export default TodoApp;
