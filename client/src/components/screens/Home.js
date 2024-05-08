import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import axios from 'axios';

const Home = () => {
  const [data, setData] = useState([]);

  const getApiData = async () => {
    const url = 'http://localhost:5000/api/quotes/getQuotes';

    try {
      const response = await axios.get(url);
      const result = response.data.Quote;
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View>
              <View>
                <Text>{item.title}</Text>
                <Text>{item.category}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
