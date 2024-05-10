import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
} from 'react-native';
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

  const fetchLikedQuotes = () => {
    setLoading(true);
    axios
      .get(`https://jokerdiary.onrender.com/api/quotes/getLikedQuotes`)
      .then(response => {
        setLikedQuotes(response.data.LikedQuotes);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
        setRefreshing(false);
      });
  };

  const removeLikedQuote = quoteId => {
    setLikedQuotes(prevQuotes =>
      prevQuotes.filter(quote => quote._id !== quoteId),
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await axios.get(
        `https://jokerdiary.onrender.com/api/quotes/getLikedQuotes`,
      );
      const result = response.data.LikedQuotes;
      setLikedQuotes(result);
    } catch (error) {
      console.error('Error fetching new data:', error);
    }

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
          <QuoteCard quote={item} onUnlike={removeLikedQuote} />
        )}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.noLikeQuotesContainer}>
            <Text style={styles.noLikeQuotes}>No Like Quotes </Text>
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
