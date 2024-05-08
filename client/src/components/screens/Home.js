import React from 'react';
import {View} from 'react-native';
import CategoryCard from '../otherComponents/category/CategoryCard';

const HomeScreen = ({navigation}) => {
  const categories = [{name: 'Joker'}, {name: 'Love'}];

  const handleCategoryPress = category => {
    navigation.navigate('QuoteScreen', {category});
  };

  return (
    <View>
      {categories.map((cat, index) => (
        <CategoryCard
          key={index}
          category={cat.name}
          onPress={() => handleCategoryPress(cat.name)}
        />
      ))}
    </View>
  );
};

export default HomeScreen;
