import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const QuoteScreen = ({route}) => {
  const {category} = route.params;
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://jokerdiary.onrender.com/api/quotes/getQuotes?category=${category}`,
      )
      .then(response => {
        console.log('Response:', response.data);
        setQuotes(response.data.Quote);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {quotes && quotes.length > 0 ? (
        <FlatList
          data={quotes}
          renderItem={({item}) => (
            <Text style={styles.quote}>{item.title}</Text>
          )}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text>No Quote Related To {category}</Text>
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
  quote: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default QuoteScreen;
