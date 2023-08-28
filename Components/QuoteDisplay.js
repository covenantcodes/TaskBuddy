import { useState, useEffect } from "react";
import {View, Text, StyleSheet} from 'react-native';
import axios from "axios";

const QuoteDisplay = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] =useState('');


  // Quotes API Link: https://api-ninjas.com/api/quotes

  useEffect(() => {
    const category = 'success';
    const apiKey = 'e/Dx6GYzHOgHRjtiI6aemw==QYvYY2j9bi92pkpg'; 

    axios.get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
      headers: {
        'X-Api-Key': 'e/Dx6GYzHOgHRjtiI6aemw==QYvYY2j9bi92pkpg'
      },
    })
    .then(response => {
      if (response.status === 200) {
        const quoteData = response.data;
        if (quoteData && quoteData.length > 0) {
          const randomIndex = Math.floor(Math.random() * quoteData.length);
          const randomQuote = quoteData[randomIndex].quote;
          setQuote(randomQuote);
        }
      } else {
        console.error('Error:', response.status, response.data);
      }
    })
    .catch(error => {
      console.error('Request failed:', error);
    });
  }, []);

  return (
    <View style={styles.quotesContainer}>
      <Text style={styles.quotesText}>
          {quote}
      </Text>
      <Text style={styles.quotesAuthor}>
          {author}
      </Text>
    </View>
  );
  
};


const styles = StyleSheet.create({

  quotesContainer: {
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    borderColor: "white",
    paddingVertical : 10,
    paddingHorizontal : 15
  },

  quotesText:{
    color: "white",
    fontFamily: 'RalewayMediumItalic',
    fontSize: 14,
    textAlign: "left"
  },

  quotesAuthor:{
    color: "white",
    textAlign: "right",
    fontFamily: 'RalewayMediumItalic',

  }
})

export default QuoteDisplay;
