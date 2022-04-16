import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
          'OpenSans-Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
          'OpenSans-Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
          'OpenSans-Light': require('../../assets/fonts/OpenSans-Light.ttf'),
          'OpenSans-SemiBold': require('../../assets/fonts/OpenSans-SemiBold.ttf'),
          'OpenSans-Italic': require('../../assets/fonts/OpenSans-Italic.ttf'),
          'OpenSans-ExtraBold':require('../../assets/fonts/OpenSans-ExtraBold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
