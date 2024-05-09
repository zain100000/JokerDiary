import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import BgImage from '../../assets/bg_img.jpg';
import COLORS from './Colors';

const CustomDrawer = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView
        contentContainerStyle={{backgroundColor: COLORS.white}}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Image source={BgImage} style={styles.image} />
          </View>
        </View>
        <View style={{flex: 1, backgroundColor: COLORS.white, paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },

  headerContainer: {
    height: 170,
  },

  image: {
    width: '100%',
    height: '100%',
  },
});
