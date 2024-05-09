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
      .get('https://jokerdiary.onrender.com/api/quotes/randomQuote')
      .then(response => {
        setQuote(response.data.quote);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching quote of the day:', error);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quote of the Day</Text>
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
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.dark,
  },
});

export default QuoteOfTheDay;
