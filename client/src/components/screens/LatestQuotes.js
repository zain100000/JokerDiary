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

const LatestQuotes = () => {
  const [latestQuotes, setLatestQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLatestQuotes();
  }, []);

  const fetchLatestQuotes = () => {
    setLoading(true);
    axios
      .get('https://messagestime.com/api/quotes/latestQuotes')
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

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await axios.get(
        `https://messagestime.com/api/quotes/latestQuotes`,
      );
      const result = response.data.LatestQuotes;
      setLatestQuotes(result);
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
        data={latestQuotes}
        renderItem={({item}) => <QuoteCard quote={item} />}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.noLatestQuotesContainer}>
            <Text style={styles.noLatestQuotes}>No Latest Quotes </Text>
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

  noLatestQuotesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },

  noLatestQuotes: {
    fontSize: 20,
    color: COLORS.dark,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default LatestQuotes;
