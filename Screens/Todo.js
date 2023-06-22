import React, {useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image, TextInput, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const GlassmorphismTextInput = ({ placeholder }) => {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
      />
    </View>
  );
};


const Todo = () => {
  const [status, setStatus] =useState('Pending');
  const [taskBtnText, setTaskBtnText] = useState('Start Task');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleButtonPress = () =>{ 
      if (status == 'Pending') {
          setStatus('In-Progress');
          setTaskBtnText("Done With Task");

      } else if  (status == "In-Progress") {
            setStatus("Completed");
            setTaskBtnText("Great Work - Welldone");
            setIsButtonDisabled(true);
      }
  }


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

      />

      {/* TASK BUTTON */}
        <TouchableOpacity style={styles.taskButton}>
            <LinearGradient colors={['#256afe', '#8124d7']} style={styles.gradient}>
              <Ionicons name="add" size={20} color="white" />
              <Text style={styles.buttonText}>Add Task</Text>
            </LinearGradient>
          </TouchableOpacity>


        {/* List of Tasks */}

        <View style={styles.taskHeader}>
              <Text style={styles.taskHeaderText}>Tasks</Text>

              <View style={styles.taskBox}>
                        <View style={styles.statusHeader}>
                                  <Text style={styles.taskText}>Complete React Native For SkillsForge </Text>
                                      <TouchableOpacity style={styles.actionMenu}>
                                              <Ionicons name="md-ellipsis-horizontal-sharp" size={20} color="white" />
                                      </TouchableOpacity>
                          </View>
                        <View style={styles.taskStatusBox}>
                                  <View style={styles.statusHeader}>
                                       <Text style={styles.statusText}>Status </Text>
                                        <Text style={[styles.btnText, 
                                            status == 'In-Progress'
                                            ? {color: "#FF8C00"}
                                            : status == 'Completed'
                                            ?{color: "#03C03C", fontFamily:"RalewayBold"}
                                            :{color: "white"}
                                        ]}>
                                        {status}
                                        </Text>
                                  </View>
                                  <View style={styles.statusButtonContainer}>
                                           <TouchableOpacity style={[styles.statusButton,  
                                            status == 'In-Progress'
                                            ? {backgroundColor: "#FF8C00"}
                                            : status  == 'Completed'
                                            ? {backgroundColor: "#03C03C"}
                                            : {backgroundColor: "#256afe"}
                                           ]}
                                                  onPress={handleButtonPress}
                                                  disabled={isButtonDisabled}
                                           >
                                                  <Text style={styles.btnText}>{taskBtnText}</Text>
                                          </TouchableOpacity>
                                    
                                  </View>
                        </View>
              </View>


              <FlatList 

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

  taskBox:{
    marginTop: 15,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },

  taskText:{
    fontFamily: "RalewayMedium",
    color: "white",
    width: "90%"
  },

  statusText:{
    fontFamily: "RalewayBold",
    color: "white",
  },

  taskStatusBox:{
    marginTop: 15,
  },

  statusHeader:{
        flexDirection: "row",
        justifyContent: "space-between"
  },

  statusButtonContainer:{
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "white",
  },

  statusButton:{
      paddingHorizontal:10,
      textAlign: "center",
      padding: 10,
  },

  btnText:{
    fontFamily: "RalewayMedium",
    textAlign:"center",
    color: "white"
  },

});

export default Todo;
