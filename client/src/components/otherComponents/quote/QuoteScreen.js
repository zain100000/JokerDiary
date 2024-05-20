import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Share,
  PermissionsAndroid,
  Alert,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../consts/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

export const QuoteCard = ({quote, onUnlike}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    checkIfLiked();
  }, []);

  const checkIfLiked = async () => {
    try {
      const likedQuote = await AsyncStorage.getItem(`liked_${quote._id}`);
      if (likedQuote) {
        setLiked(true);
      }
    } catch (error) {
      console.error('Error checking liked status:', error);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: quote.image,
      });
    } catch (error) {
      console.error('Error sharing quote:', error.message);
    }
  };

  const handleLikePress = async () => {
    try {
      await AsyncStorage.setItem(`liked_${quote._id}`, JSON.stringify(quote));
      setLiked(true);
      const response = await axios.post(
        `https://messagestime.com/api/quotes/likeQuote/${quote._id}`,
      );
      if (response.status >= 200 && response.status < 300) {
        console.log('Quote liked successfully');
      }
    } catch (error) {
      console.error('Error liking quote:', error);
    }
  };

  const handleUnLikePress = async () => {
    try {
      await AsyncStorage.removeItem(`liked_${quote._id}`);
      setLiked(false);
      const response = await axios.post(
        `https://messagestime.com/api/quotes/unlikeQuote/${quote._id}`,
      );
      if (response.status >= 200 && response.status < 300) {
        console.log('Quote unliked successfully');
        if (typeof onUnlike === 'function') {
          onUnlike(quote._id);
        }
      }
    } catch (error) {
      console.error('Error unliking quote:', error);
    }
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message:
              'This app needs access to your storage to save quotes as images.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const handleSavePress = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) return;

    const downloadDest = `${RNFS.DocumentDirectoryPath}/${quote._id}.jpg`;

    const options = {
      fromUrl: quote.image,
      toFile: downloadDest,
    };

    try {
      const response = await RNFS.downloadFile(options).promise;
      if (response.statusCode === 200) {
        await CameraRoll.save(downloadDest, {type: 'photo'});
        Alert.alert('Image Saved');
      }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.card}>
        <View style={styles.quoteContainer}>
          <Image
            source={{uri: quote.image}}
            style={styles.image}
            resizeMode="contain"
          />
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

          <TouchableOpacity style={styles.button} onPress={handleSavePress}>
            <MaterialCommunityIcon
              name="download"
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
              Save
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

  useEffect(() => {
    fetchQuotes();
  }, [category]);

  const fetchQuotes = () => {
    setLoading(true);
    axios
      .get(`https://messagestime.com/api/quotes/getQuotes?category=${category}`)
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

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await axios.get(
        `https://messagestime.com/api/quotes/getQuotes?category=${category}`,
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
      <FlatList
        showsVerticalScrollIndicator={false}
        data={quotes}
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

  card: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    padding: 10,
    marginBottom: 40,
  },

  quoteContainer: {
    width: '100%',
    aspectRatio: 2 / 3,
    objectFit: 'contain',
    borderRadius: 10,
    overflow: 'hidden',
  },

  image: {
    flex: 1,
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  category: {
    color: COLORS.dark,
    fontSize: 16,
    marginBottom: 5,
    left: 5,
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
