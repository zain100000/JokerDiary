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
  TextInput,
} from 'react-native';
import axios from 'axios';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../consts/Colors';

const {Clipboard} = NativeModules;

export const QuoteCard = ({quote, onLikePress, onUnLikePress}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(quote.liked);
  const [unliked, setUnLiked] = useState(quote.unliked);

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
      const response = await axios.post(
        `https://jokerdiary.onrender.com/api/quotes/likeQuote/${quote._id}`, // Add / before quote._id
      );
      if (response.status >= 200 && response.status < 300) {
        alert('Quote Liked!');
      }
    } catch (error) {
      console.error('Error liking quote:', error);
    }
  };

  const handleUnLikePress = async () => {
    try {
      const response = await axios.post(
        `https://jokerdiary.onrender.com/api/quotes/unlikeQuote/${quote._id}`,
      );
      if (response.status >= 200 && response.status < 300) {
        alert('Quote Unliked!');
      }
    } catch (error) {
      console.error('Error unliking quote:', error);
    }
  };

  const copyToClipboard = text => {
    if (Platform.OS === 'android') {
      Clipboard.setString(text);
    } else {
      Clipboard.setString(text);
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
          <TouchableOpacity
            style={styles.button}
            onPress={liked ? handleUnLikePress : handleLikePress}>
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
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredQuotes = quotes.filter(quote =>
    quote.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={COLORS.dark} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
        placeholder="Search Quotes"
        placeholderTextColor={COLORS.dark}
      />
      {filteredQuotes.length > 0 ? (
        <FlatList
          data={filteredQuotes}
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
          <Text style={styles.noQuotes}>
            {category ? `No Quotes Related to ${category}` : 'No Quotes Found'}
          </Text>
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

  input: {
    height: 40,
    borderColor: COLORS.dark,
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: '600',
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
