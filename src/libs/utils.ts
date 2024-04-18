import {Alert, Linking} from 'react-native';

export const handleWatchTrailer = (url: string | null) => {
  if (url) {
    Linking.openURL(url).catch(e => {
      Alert.alert('Trailer not found');
    });
  } else {
    Alert.alert('Trailer not found');
  }
};
