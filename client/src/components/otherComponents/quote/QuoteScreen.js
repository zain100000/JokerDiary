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
  SafeAreaView,
  RefreshControl,
  TextInput,
} from 'react-native';
import axios from 'axios';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../consts/Colors';
import {useNavigation} from '@react-navigation/native';

const {Clipboard} = NativeModules;

export const QuoteCard = ({quote}) => {
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
      const response = await axios.post(
        `https://jokerdiary.onrender.com/api/quotes/likeQuote/${quote._id}`,
      );
      if (response.status >= 200 && response.status < 300) {
        alert('Quote Liked!');
      }
    } catch (error) {
      console.error('Error liking quote:', error);
    }
  };
  const copyToClipboard = text => {
    Clipboard.setString(text);
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
              Like
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
  const navigation = useNavigation();
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

  const filteredQuotes = quotes.filter(quote =>
    quote.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await axios.get(
        `https://jokerdiary.onrender.com/api/quotes/getQuotes?category=${category}`,
      );
      const result = response.data.Quote;
      setQuotes(result);
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

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <MaterialCommunityIcon
            name="chevron-left"
            size={30}
            color={COLORS.dark}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category}</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={text => setSearchQuery(text)}
        value={searchQuery}
        placeholder="Search Quotes"
        placeholderTextColor={COLORS.dark}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredQuotes}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <QuoteCard quote={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.noQuotesContainer}>
            <Text style={styles.noQuotes}>
              {category
                ? `No Quotes Related to ${category}`
                : 'No Quotes Found'}
            </Text>
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

  header: {
    flexDirection: 'row',
    marginBottom: 20,
    padding: 5,
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.dark,
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

  noQuotesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },

  noQuotes: {
    fontSize: 20,
    color: COLORS.dark,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default QuoteScreen;
