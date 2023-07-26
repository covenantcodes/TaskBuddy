import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

const GlassmorphismTextInput =({ placeholder, value, onChangeText})=> {
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
 }


const styles = StyleSheet.create({
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
 })
export default GlassmorphismTextInput;