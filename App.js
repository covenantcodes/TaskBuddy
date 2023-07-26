import React from 'react';
import {StyleSheet} from 'react-native';
import Todo from './Screens/Todo';
import { useFonts } from "expo-font";
import Fab from './Components/Fab'

const App = () => {
      // FONTS

      const [fontsLoaded] = useFonts({

        // RALEWAY
        RalewayThin: require("./assets/fonts/RalewayThin.ttf"),
        RalewayLight: require("./assets/fonts/Raleway-Light.ttf"),
        RalewayExtraLight: require("./assets/fonts/Raleway-ExtraLight.ttf"),
        RalewayMedium: require("./assets/fonts/Raleway-Medium.ttf"),
        RalewayRegular: require("./assets/fonts/Raleway-Regular.ttf"),
        RalewaySemiBold: require("./assets/fonts/Raleway-SemiBold.ttf"),
        RalewayBold: require("./assets/fonts/Raleway-Bold.ttf"),
        RalewayExtraBold: require("./assets/fonts/Raleway-ExtraBold.ttf"),
        RalewayHeavy: require("./assets/fonts/Raleway-Heavy.ttf"),

        // POPPINS
        PoppinsThin: require("./assets/fonts/Poppins/Poppins-Thin.ttf"),
        PoppinsThinItaltic: require("./assets/fonts/Poppins/Poppins-ThinItalic.ttf"),
        PoppinsLight: require("./assets/fonts/Poppins/Poppins-Light.ttf"),
        PoppinsExtraLight: require("./assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
        PoppinsMedium: require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
        PoppinsRegular: require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
        PoppinsSemiBold: require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
        PoppinsBold: require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
        PoppinsExtraBold: require("./assets/fonts/Poppins/Poppins-ExtraBold.ttf"),

      });
    
      if (!fontsLoaded) { 
          return null;
      }
  return (
      <Todo/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  }
})

export default App;
