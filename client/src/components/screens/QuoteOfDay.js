import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';
import COLORS from '../consts/Colors';

const QuoteOfTheDayScreen = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuoteOfTheDay();
  }, []);

  const fetchQuoteOfTheDay = () => {
    setLoading(true);
    axios
      .get('https://jokerdiary.onrender.com/api/quotes/getQuoteOfDay')
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
        <View style={[styles.loadingContainer, styles.container]}>
          <ActivityIndicator size="large" color={COLORS.dark} />
        </View>
      ) : (
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>{quote.title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  quoteContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.light,
    borderRadius: 10,
  },

  quoteText: {
    fontSize: 18,
    color: COLORS.dark,
    textAlign: 'center',
  },
});

export default QuoteOfTheDayScreen;
