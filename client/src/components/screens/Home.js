import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import CategoryCard from '../otherComponents/category/CategoryCard';
import COLORS from '../consts/Colors';

const HomeScreen = ({navigation}) => {
  const categories = [
    {name: 'Joker'},
    {name: 'Alone'},
    {name: 'Angry'},
    {name: 'Attitude'},
    {name: 'Breakup'},
    {name: 'Emotional'},
    {name: 'Family'},
    {name: 'Fathers Day'},
    {name: 'Friends'},
    {name: 'Funny'},
    {name: 'Good Morning'},
    {name: 'Good Night'},
    {name: 'Happiness'},
    {name: 'Inspirational'},
    {name: 'Love'},
    {name: 'Mothers Day'},
    {name: 'Motivational'},
    {name: 'Relationship'},
    {name: 'Sad'},
    {name: 'Trust'},
  ];

  const [searchText, setSearchText] = useState('');

  const handleCategoryPress = category => {
    navigation.navigate('QuoteScreen', {category});
  };

  const chunkArray = (arr, size) => {
    return Array.from({length: Math.ceil(arr.length / size)}, (_, i) =>
      arr.slice(i * size, i * size + size),
    );
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Categories"
        placeholderTextColor={COLORS.dark}
        onChangeText={setSearchText}
        value={searchText}
      />
      <ScrollView>
        {filteredCategories.length === 0 ? (
          <View style={styles.noCategories}>
            <Text style={styles.text}>No Categories Found</Text>
          </View>
        ) : (
          chunkArray(filteredCategories, 2).map((chunk, index) => (
            <View key={index} style={styles.cardRow}>
              {chunk.map((cat, catIndex) => (
                <CategoryCard
                  key={catIndex}
                  category={cat.name}
                  onPress={() => handleCategoryPress(cat.name)}
                />
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  noCategories: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  text: {
    color: COLORS.dark,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
