import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Share,
  NativeModules,
  Platform,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../consts/Colors';

const {Clipboard} = NativeModules;

export const QuoteCard = ({quote, onLikePress}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(quote.liked);

  const handleCopy = () => {
    copyToClipboard(quote.title);
    setCopied(true);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: quote.title,
      });
    } catch (error) {
      console.error('Error sharing quote:', error.message);
    }
  };

  const handleLikePress = async () => {
    try {
      console.log('Like button pressed');
      const response = await axios.post(
        `https://jokerdiary.onrender.com/api/quotes/likeQuote/${quote._id}`,
        console.log('Quote ID:', quote._id),
      );
      console.log('Like response:', response.data);
      if (response.data.success) {
        onLikePress(quote, !liked);
        setLiked(!liked);
      }
    } catch (error) {
      console.error('Error liking quote:', error);
    }
  };

  const copyToClipboard = text => {
    if (Platform.OS === 'android') {
      Clipboard.setString(text);
    } else {
      Clipboard.setString(text);
      alert('This feature is not supported on iOS');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.card}>
        <Text style={styles.category}>{quote.category}</Text>
        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>{quote.title}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLikePress}>
            <MaterialCommunityIcon
              name={liked ? 'heart' : 'heart-outline'}
              size={30}
              color={liked ? COLORS.liked : COLORS.dark}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: COLORS.dark,
                textAlign: 'center',
              }}>
              {liked ? 'Unlike' : 'Like'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCopy}>
            <MaterialCommunityIcon
              name={copied ? 'check-circle' : 'clipboard-outline'}
              size={30}
              color={copied ? COLORS.primary : COLORS.dark}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: copied ? COLORS.primary : COLORS.dark,
                textAlign: 'center',
              }}>
              {copied ? 'Copied' : 'Copy'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleShare}>
            <MaterialCommunityIcon
              name="share-outline"
              size={30}
              color={COLORS.dark}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: COLORS.dark,
                textAlign: 'center',
              }}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const QuoteScreen = ({route}) => {
  const {category} = route.params;
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchQuotes();
  }, [category]);

  const fetchQuotes = () => {
    setLoading(true);
    axios
      .get(
        `https://jokerdiary.onrender.com/api/quotes/getQuotes?category=${category}`,
      )
      .then(response => {
        setQuotes(response.data.Quote);
        setLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
        setRefreshing(false);
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
      {quotes && quotes.length > 0 ? (
        <FlatList
          data={quotes}
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
        <View style={styles.noQuotesContainer}>
          <Text style={styles.noQuotes}>No Quotes Related To {category}</Text>
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

  card: {
    backgroundColor: COLORS.white,
    padding: 5,
    margin: 15,
  },

  quoteContainer: {
    backgroundColor: '#333',
    padding: 80,
    borderRadius: 10,
    marginBottom: 20,
  },

  quote: {
    fontSize: 22,
    color: '#fff',
    width: '100%',
    textAlign: 'center',
    lineHeight: 30,
  },

  category: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 5,
    padding: 5,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },

  button: {
    padding: 10,
    borderRadius: 5,
  },

  noQuotesContainer: {
    flex: 1,
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

export default QuoteScreen;
