import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
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
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchQuotes();
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
      {likedQuotes && likedQuotes.length > 0 ? (
        <FlatList
          data={likedQuotes}
          renderItem={({item}) => <QuoteCard quote={item} />}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.dark]}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.noLikeQuotesContainer}>
          <Text style={styles.noLikeQuotes}>No Like Quotes </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  noLikeQuotesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  noLikeQuotes: {
    fontSize: 20,
    color: COLORS.dark,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LikedQuotes;
