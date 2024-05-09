import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {QuoteCard} from '../otherComponents/quote/QuoteScreen';
import COLORS from '../consts/Colors';

const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuoteOfTheDay();
  }, []);

  const fetchQuoteOfTheDay = () => {
    setLoading(true);
    axios
      .get('https://jokerdiary.onrender.com/api/quotes/getRandomQuotes')
      .then(response => {
        setQuote(response.data.Quote);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching quote of the day:', error);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.dark} />
      ) : (
        quote && <QuoteCard quote={quote} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

export default QuoteOfTheDay;
