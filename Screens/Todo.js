import React, {
  useState, 
  useCallback, 
  useMemo, 
  useRef,
  useEffect
} from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  Image, 
  TextInput, 
  FlatList, 
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons
    } from '@expo/vector-icons';
import TodoCard from './TodoCard';
import GlassmorphismTextInput from '../Components/GlassmorphismTextInput';
import Fab from '../Components/Fab';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import axios from 'axios';
import QuoteDisplay from '../Components/QuoteDisplay.js';


const Todo = () => {
  
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);


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
          <View style={styles.profileImageContainer}>
              <Image
                source={require('../assets/pic.png')}
                style={styles.profileImage}
              />
              <View style={styles.greetingsContainer}>
              {/* <Text style={styles.greetingsText}>Hi, Covenant</Text> */}
                 <Text style={styles.timeText}>{greeting}</Text>
              </View>
          </View>
          <TouchableOpacity style={styles.notificationContainer}>
            <FontAwesome
              name='bell-o'
              size={20}
              color="white"
            />
          </TouchableOpacity>
      </View>

      {/* DAILY QUOTES */}
      <View style={styles.quoteContainer}>
          <Text style={styles.quoteHeaderText}>Daily Quotes</Text>
          <QuoteDisplay/>
      </View>

  {/* List of Tasks */}
  <View style={styles.taskHeader}>
        <Text style={styles.taskHeaderText}>Tasks</Text>
        <SafeAreaView style={styles.taskListContainer}>
          <FlatList
            data={todos}
            renderItem={renderTodo}
            keyExtractor={(item) => item.id.toString()}
          />
        </SafeAreaView>
      </View>
      <View style={styles.fabBox}>
          <Fab
             onPress={handlePresentModalPress}
          />
      </View>

      {/* BOTTOMSHEET */}
      <BottomSheetModalProvider>
      <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={styles.bottomSheetBackground} 
          handleIndicatorStyle={bottomSheetHandleStyle}
          >         
            <View style={styles.contentContainer}>
                  <View style={styles.closeModal}>
                      <MaterialCommunityIcons
                        name="close-circle-outline"
                        size={35}
                        color="white"
                        onPress={handleDismissModalPress}
                      />
                  </View>
                   {/* TEXT INPUT */}
                   <GlassmorphismTextInput 
                  placeholder="Enter your task" 
                  value={todoText}
                  onChangeText={setTodoText}
                  />

                  {/* TASK BUTTON */}
              <TouchableOpacity style={styles.taskButton}
                  onPress={addTodo}>
                  <LinearGradient colors={['#256afe', '#8124d7']} style={styles.gradient}>
                      <Ionicons name="add" size={20} color="white" />
                       <Text style={styles.buttonText}>Add Task</Text>
                  </LinearGradient>
                  </TouchableOpacity>
              </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>

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

  profileImageContainer:{
    borderWidth:1,
    flexDirection:"row",
    alignItems: "center"
  },

  greetingsContainer:{
    alignItems: "center",
  },

  // greetingsText: {
  //   borderWidth: 1,
  //   borderColor: "white",
  //   marginLeft: 10,
  //   fontSize: 18,
  //   fontFamily: 'RalewayLight',
  //   color: 'white',
  // },

  timeText: {
    marginLeft: 10,
    color: 'white',
    fontSize: 18,
    fontFamily: 'RalewayBold',
  },

  notificationContainer:{
    alignItems: "center",
    justifyContent:"center",
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },

  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
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
  
  taskHeader: {
    paddingTop: 20,
    paddingHorizontal: 10,
    flex: 1,
  },

  taskHeaderText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'RalewayBold',
  },

  taskListContainer: {
    flex: 1,
    paddingVertical: 20
  },

  fabBox:{
    alignItems: 'center'
  },

  bottomSheetBackground: {
    backgroundColor: '#3d439b'
  },

  contentContainer:{
    paddingHorizontal: 20
  },

  closeModal:{
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  quoteContainer:{
    paddingTop: 10
  },

  quoteHeaderText:{
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontFamily: "RalewaySemiBold",
    color: 'white'
  }
});

const bottomSheetHandleStyle = {
  backgroundColor:'#3d439b'
}

export default Todo;
