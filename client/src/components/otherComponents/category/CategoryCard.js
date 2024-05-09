import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import COLORS from '../../consts/Colors';

const CategoryCard = ({category, onPress}) => {
  const getEmoji = () => {
    switch (category.toLowerCase()) {
      case 'joker':
        return '🃏';
      case 'alone':
        return '😔';
      case 'angry':
        return '😠';
      case 'attitude':
        return '😎';
      case 'breakup':
        return '💔';
      case 'emotional':
        return '😢';
      case 'family':
        return '👪';
      case 'fathers day':
        return '👨‍👧‍👦';
      case 'friends':
        return '👫';
      case 'funny':
        return '😄';
      case 'good morning':
        return '🌞';
      case 'good night':
        return '🌙';
      case 'happiness':
        return '😊';
      case 'inspirational':
        return '🌟';
      case 'love':
        return '❤️';
      case 'mothers day':
        return '👩‍👧‍👦';
      case 'motivational':
        return '💪';
      case 'relationship':
        return '💑';
      case 'sad':
        return '😞';
      case 'trust':
        return '🤝';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: getCategoryColor(category)}]}
      onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.emoji}>{getEmoji()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getCategoryColor = category => {
  switch (category.toLowerCase()) {
    case 'joker':
      return '#ffb6c1';
    case 'alone':
      return '#f1c40f';
    case 'angry':
      return '#e74c3c';
    case 'attitude':
      return '#3498db';
    case 'breakup':
      return '#e74c3c';
    case 'emotional':
      return '#8e44ad';
    case 'family':
      return '#27ae60';
    case 'fathers day':
      return '#2c3e50';
    case 'friends':
      return '#9b59b6';
    case 'funny':
      return '#f39c12';
    case 'good morning':
      return '#e67e22';
    case 'good night':
      return '#16a085';
    case 'happiness':
      return '#c0392b';
    case 'inspirational':
      return '#7f8c8d';
    case 'love':
      return '#1abc9c';
    case 'mothers day':
      return '#d35400';
    case 'motivational':
      return '#3498db';
    case 'relationship':
      return '#e74c3c';
    case 'sad':
      return '#9b59b6';
    case 'trust':
      return '#16a085';
    default:
      return '#bdc3c7';
  }
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    marginTop: 10,
  },

  content: {
    alignItems: 'center',
  },

  category: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: COLORS.white,
  },

  emoji: {
    fontSize: 30,
  },
});

export default CategoryCard;
