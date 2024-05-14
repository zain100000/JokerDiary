import React, {useEffect, useState} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {AppOpenAd, AdEventType, TestIds} from 'react-native-google-mobile-ads';
import Splash from '../../screens/Splash';

const adUnitId = __DEV__
  ? TestIds.APP_OPEN
  : 'ca-app-pub-9640203073053510/3944622359';

const openApp = AppOpenAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

const OpenAppAdComponent = () => {
  const navigation = useNavigation();
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = openApp.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setAdLoaded(true);
        openApp.show();
      },
    );

    const unsubscribeClosed = openApp.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        navigation.dispatch(StackActions.replace('Splash'));
      },
    );

    openApp.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, [navigation]);

  if (!adLoaded) {
    return <Splash />;
  }

  return null;
};

export default OpenAppAdComponent;
