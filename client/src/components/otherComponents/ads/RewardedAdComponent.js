import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, SafeAreaView} from 'react-native';
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import {useNavigation} from '@react-navigation/native';

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-9640203073053510/5341464504';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const RewardedAdComponent = () => {
  const navigation = useNavigation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
        rewarded.show();
      },
    );

    const unsubscribeClosed = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        navigation.replace("Joker's Diary");
      },
    );

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, [navigation]);

  if (!loaded) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}>
        <View>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </SafeAreaView>
    );
  }

  return null;
};

export default RewardedAdComponent;
