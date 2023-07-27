import { useState, useEffect } from "react";
import {View, Text, StyleSheet} from 'react-native';
import axios from "axios";

const QuoteDisplay = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Define the options for the Axios request
    const options = {
      method: 'GET',
      url: 'https://timshim-quotes-v1.p.rapidapi.com/quotes',
      headers: {
        'X-RapidAPI-Key': '46f3b80208msh6edd160caa5d069p1fb545jsnbeddc7987da5',
        'X-RapidAPI-Host': 'timshim-quotes-v1.p.rapidapi.com'
      }
    };

    // Make the Axios request to fetch the quote
    const fetchQuote = async () => {
      try {
        const response = await axios.request(options);
        // Assuming response.data is an array of quotes, get the first quote
        const firstQuote = response.data[0];
        if (firstQuote && firstQuote.text) {
          setQuote(firstQuote.text);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuote(); // Call the function to fetch the quote when the component mounts
  }, []);

  return (
    <View style={styles.quotesContainer}>
      <Text style={styles.quotesText}>
        {quote}
      </Text>
    </View>
  );
  
};


const styles = StyleSheet.create({

  quotesContainer: {
    borderWidth: 1,
    borderColor: "white",
    paddingVertical : 20
  },

  quotesText:{
    color: "white",
  }
})

export default QuoteDisplay;
