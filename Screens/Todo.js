import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image, TextInput, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import TodoCard from './TodoCard';

const GlassmorphismTextInput = ({ placeholder, value, onChangeText}) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};


const Todo = () => {
   const [todos, setTodos] = useState([]);
   const [todoText, setTodoText] = useState("");

  const addTodo = () => {
      if(todoText && todoText.trim() !==''){
          const  newTodo = {id: Date.now(), text: todoText, status: 'Pending'};
          setTodos([...todos, newTodo]);
          setTodoText('');
      } 
  }

  const deleteTodo = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  }
  
  const editTodo = (todoId, editedText) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, text: editedText };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  
  const renderTodo = ({ item }) => (
    <TodoCard todo={item} deleteTodo={deleteTodo} editTodo={editTodo} />
  );


  const currentTime = new Date();
  const hours = currentTime.getHours();
  let greeting;

  if (hours < 12) {
    greeting = 'Good Morning';
  } else if (hours < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  return (
    <LinearGradient colors={['#0d132a', '#44196c']} style={styles.container}>
      <StatusBar backgroundColor="#131d40" barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.greetingsText}>Hii</Text>
          <Text style={styles.timeText}>{greeting}</Text>
        </View>
        <View>
          <Image
            source={require('../assets/pic.png')}
            style={styles.profileImage}
          />
        </View>
      </View>

      {/* TEXT INPUT */}
      <GlassmorphismTextInput 
      placeholder="Enter your task" 
      value={todoText}
      onChangeText={setTodoText}
      />

      {/* TASK BUTTON */}
        <TouchableOpacity style={styles.taskButton}
            onPress={addTodo}
        >
            <LinearGradient colors={['#256afe', '#8124d7']} style={styles.gradient}>
              <Ionicons name="add" size={20} color="white" />
              <Text style={styles.buttonText}>Add Task</Text>
            </LinearGradient>
          </TouchableOpacity>


        {/* List of Tasks */}

        <View style={styles.taskHeader}>
              <Text style={styles.taskHeaderText}>Tasks</Text>
              <FlatList 
                    data={todos}
                   renderItem={renderTodo}
                  keyExtractor={(item) => item.id.toString()}
              />
        </View>

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greetingsText: {
    fontSize: 20,
    fontFamily: 'RalewayMedium',
    color: 'white',
  },
  timeText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'RalewayBold',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  textInputContainer: {
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: 'white',
    fontSize: 16,
    fontFamily: 'RalewayMedium',
  },

  taskButton: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
  },
  buttonText: {
    marginLeft: 8,
    color: 'white',
    fontSize: 16,
    fontFamily: 'RalewayMedium',
  },

  taskHeader:{
    paddingTop: 20, 
  },

  taskHeaderText:{
    color: 'white',
    fontSize: 16,
    fontFamily: 'RalewayBold',
  },

});

export default Todo;
