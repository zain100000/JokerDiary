import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const QuotesLists = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [deleting, setDeleting] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const getApiData = async () => {
    const url = 'https://jokerdiary.onrender.com/api/quotes/getQuotes';

    try {
      const response = await axios.get(url);
      const result = response.data.Quote;
      setData(result);
      setIsLoading(false);
      setSelectAll(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const filterData = () => {
    return data.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await axios.get(
        'https://jokerdiary.onrender.com/api/quotes/getQuotes',
      );
      const result = response.data.Quote;
      setData(result);
    } catch (error) {
      console.error('Error fetching new data:', error);
    }

    setRefreshing(false);
  };

  const handleUpdateQuote = selectedQuote => {
    navigation.navigate('Update Quote', {selectedQuote});
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedItems(!selectAll ? data.map(item => item._id) : []);
  };

  const handleIndividualCheckbox = itemId => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleIndividualDelete = async id => {
    Alert.alert('Delete Quote', 'Are you sure you want to delete this quote?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            setIsLoading(true);
            await axios.delete(
              `https://jokerdiary.onrender.com/api/quotes/removeQuotes/${id}`,
            );
            setData(prevData => prevData.filter(item => item._id !== id));
          } catch (error) {
            console.error('Error deleting Quote:', error);
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  const handleDeleteSelected = async () => {
    Alert.alert(
      'Delete Quotes',
      'Are you sure you want to delete selected quotes?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              setIsLoading(true);
              await Promise.all(
                selectedItems.map(async id => {
                  await axios.delete(
                    `https://jokerdiary.onrender.com/api/quotes/removeQuotes/${id}`,
                  );
                }),
              );
              setData(prevData =>
                prevData.filter(item => !selectedItems.includes(item._id)),
              );
              setSelectedItems([]);
              setSelectAll(false);
            } catch (error) {
              console.error('Error deleting selected Quotes:', error);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleDeleteSelected}
          disabled={selectedItems.length === 0}>
          <FontAwesome5 name={'trash'} size={25} color={'red'} />
        </TouchableOpacity>

        <TextInput
          style={styles.searchInput}
          placeholder="Search Quote By Title"
          value={searchText}
          placeholderTextColor={'#00bcd4'}
          onChangeText={text => setSearchText(text)}
        />
      </View>

      <View style={styles.listHeader}>
        <TouchableOpacity onPress={handleSelectAll}>
          <FontAwesome5
            name={selectAll ? 'check-square' : 'square'}
            size={18}
            color={selectAll ? 'blue' : '#000'}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Title</Text>
        <Text style={styles.headerText}>Category</Text>
        <Text style={styles.headerText}>Actions</Text>
      </View>

      <FlatList
        data={filterData()}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <TouchableOpacity>
              <FontAwesome5
                name={
                  selectedItems.includes(item._id) ? 'check-square' : 'square'
                }
                size={20}
                color={selectedItems.includes(item._id) ? 'blue' : 'black'}
                onPress={() => handleIndividualCheckbox(item._id)}
              />
            </TouchableOpacity>
            <Text style={styles.titleText}>{item.title}</Text>
            <View>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleUpdateQuote(item)}>
                <FontAwesome5 name="pencil-alt" size={20} color={'#000'} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleIndividualDelete(item._id)}>
                <FontAwesome5 name={'trash'} size={20} color={'red'} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <View style={{flex: 1, alignItems: 'center'}}>
        {isLoading && <ActivityIndicator size="large" color="blue" />}
        {!filterData().length && !isLoading && (
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
            No Quotes!
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
  },

  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    marginLeft: 10,
  },

  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    marginHorizontal: 5,
    marginVertical: 5,
  },

  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    padding: 10,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginVertical: 5,
  },

  titleText: {
    color: '#000',
    marginLeft: -30,
  },

  categoryText: {
    fontWeight: 'bold',
    color: '#777',
  },

  actions: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
});

export default QuotesLists;
