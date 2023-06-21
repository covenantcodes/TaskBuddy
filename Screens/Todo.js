import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, Image, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
    <LinearGradient colors={['#131d40', '#861ed3']} style={styles.container}>
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
    // borderColor: 'white',
    // borderWidth: 2,
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
    paddingVertical: 8,
    color: 'white',
  },
});

export default Todo;
