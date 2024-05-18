import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {QuoteCard} from '../otherComponents/quote/QuoteScreen';
import COLORS from '../consts/Colors';

const LikedQuotes = () => {
  const [likedQuotes, setLikedQuotes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLikedQuotes();
  }, []);

  const fetchLikedQuotes = async () => {
    setLoading(true);
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      const quotes = result
        .map(req => JSON.parse(req[1]))
        .filter(item => item !== null);
      setLikedQuotes(quotes);
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching liked quotes:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const removeLikedQuote = quoteId => {
    setLikedQuotes(prevQuotes =>
      prevQuotes.filter(quote => quote._id !== quoteId),
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLikedQuotes();
    setRefreshing(false);
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
      <FlatList
        data={likedQuotes}
        renderItem={({item}) => (
          <QuoteCard
            quote={{...item, liked: true}}
            onUnlike={removeLikedQuote}
          />
        )}
        keyExtractor={item => item._id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.noLikeQuotesContainer}>
            <Text style={styles.noLikeQuotes}>No Liked Quotes</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noLikeQuotesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },

  noLikeQuotes: {
    fontSize: 20,
    color: COLORS.dark,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LikedQuotes;
