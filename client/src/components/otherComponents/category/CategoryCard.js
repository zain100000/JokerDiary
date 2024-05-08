import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';

const CategoryCard = ({category, image, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={image} style={styles.image} />
      <Text style={styles.category}>{category}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // for Android shadow
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CategoryCard;
