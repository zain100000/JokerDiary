import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../consts/Colors';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Joker's Diary");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Animatable.View
        style={styles.content}
        animation="fadeIn"
        duration={2000}>
        <Text style={styles.heading}>Joker's Diary</Text>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark,
  },

  heading: {
    fontSize: 35,
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: '800',
  },
});

export default Splash;
