import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {QuoteCard} from '../otherComponents/quote/QuoteScreen';
import COLORS from '../consts/Colors';

const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchQuoteOfTheDay();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await axios.get(
        `https://jokerdiary.onrender.com/api/quotes/getRandomQuotes`,
      );
      const result = response.data.Quote;
      setLikedQuotes(result);
    } catch (error) {
      console.error('Error fetching new data:', error);
    }

    setRefreshing(false);
  };

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
        setQuote(null);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={COLORS.dark} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {quote ? (
          <QuoteCard quote={quote} />
        ) : (
          <View style={styles.noQuoteOfDayContainer}>
            <Text style={styles.noQuoteOfDay}>No Quote Of The Day </Text>
          </View>
        )}
      </ScrollView>
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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noQuoteOfDayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },

  noQuoteOfDay: {
    fontSize: 20,
    color: COLORS.dark,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default QuoteOfTheDay;
