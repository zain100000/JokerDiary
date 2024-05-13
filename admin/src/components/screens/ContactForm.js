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

const ContactForm = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [deleting, setDeleting] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const getApiData = async () => {
    const url = 'https://messagestime.com/api/contact/getContactForm';

    try {
      const response = await axios.get(url);
      const result = response.data.Contact;
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
      item.name.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await axios.get(
        'https://messagestime.com/api/contact/getContactForm',
      );
      const result = response.data.Contact;
      setData(result);
    } catch (error) {
      console.error('Error fetching new data:', error);
    }

    setRefreshing(false);
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
    Alert.alert(
      'Delete Contact Form',
      'Are you sure you want to delete this form?',
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
              await axios.delete(
                `https://messagestime.com/api/contact/removeContactForm/${id}`,
              );
              setData(prevData => prevData.filter(item => item._id !== id));
            } catch (error) {
              console.error('Error deleting Contact Form:', error);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
    );
  };

  const handleDeleteSelected = async () => {
    Alert.alert(
      'Delete Contact Form',
      'Are you sure you want to delete selected forms?',
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
                    `https://messagestime.com/api/contact/removeContactForm/${id}`,
                  );
                }),
              );
              setData(prevData =>
                prevData.filter(item => !selectedItems.includes(item._id)),
              );
              setSelectedItems([]);
              setSelectAll(false);
            } catch (error) {
              console.error('Error deleting selected Forms:', error);
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
          placeholder="Search Form By Name"
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
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Email</Text>
        <Text style={styles.headerText}>Mobile</Text>
        <Text style={styles.headerText}>Message</Text>
        <Text style={styles.headerText}>Actions</Text>
      </View>

      <FlatList
        data={filterData()}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <TouchableOpacity style={{top: 14}}>
              <FontAwesome5
                name={
                  selectedItems.includes(item._id) ? 'check-square' : 'square'
                }
                size={20}
                color={selectedItems.includes(item._id) ? 'blue' : 'black'}
                onPress={() => handleIndividualCheckbox(item._id)}
              />
            </TouchableOpacity>
            <View style={styles.itemContainer}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.emailText}>{item.email}</Text>
              <Text style={styles.mobileText}>{item.mobile}</Text>
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
            <View style={styles.actions}>
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
            No Data Yet!
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
    justifyContent: 'space-around',
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
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    margin: 10,
  },

  headerText: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#000',
    padding: 10,
  },

  listItem: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingHorizontal: 10,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },

  nameText: {
    color: '#000',
    left: 15,
  },

  emailText: {
    color: '#000',
    width: 80,
  },

  mobileText: {
    color: '#000',
    width: 50,
    right: 60,
  },

  messageText: {
    color: '#000',
    right: 70,
    width: 50,
  },

  actions: {
    right: 25,
    top: 15,
  },
});

export default ContactForm;
