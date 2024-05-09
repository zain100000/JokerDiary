import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import {QuoteCard} from '../otherComponents/quote/QuoteScreen';
import COLORS from '../consts/Colors';

const LatestQuotesScreen = () => {
  const [latestQuotes, setLatestQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLatestQuotes();
  }, []);

  const fetchLatestQuotes = () => {
    setLoading(true);
    axios
      .get('https://jokerdiary.onrender.com/api/quotes/latestQuotes')
      .then(response => {
        setLatestQuotes(response.data.LatestQuotes);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        console.error('Error fetching latest quotes:', error);
        setLoading(false);
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setLatestQuotes([]); // Clear existing quotes before fetching new ones
    fetchLatestQuotes();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={[styles.loadingContainer, styles.container]}>
          <ActivityIndicator size="large" color={COLORS.dark} />
        </View>
      ) : latestQuotes.length === 0 ? (
        <View style={[styles.loadingContainer, styles.container]}>
          <Text style={styles.noQuotes}>No Latest Quotes</Text>
        </View>
      ) : (
        <FlatList
          data={latestQuotes}
          renderItem={({item}) => <QuoteCard quote={item} />}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.dark]}
              tintColor={COLORS.dark}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  noQuotes: {
    fontSize: 20,
    color: COLORS.dark,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LatestQuotesScreen;
