import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Button} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';
import {Alert} from 'react-native';

const App = () => {
  const [isTripStarted, setTripStarted] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      console.log('RequestPermission got called');

      try {
        const backgroundgranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          {
            title: 'Background Location Permission',
            message:
              'We need access to your location for live quality updates.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Background permission granted');
        } else {
          console.log('Background permission not granted');
        }
      } catch (error) {
        console.error('Error requesting background permission:', error);
      }
    };

    requestPermission();
  }, []);

  RNLocation.configure({
    distanceFilter: 100,
    desiredAccuracy: {
      ios: 'best',
      android: 'balancedPowerAccuracy',
    },

    androidProvider: 'auto',
    interval: 5000,
    fastestInterval: 10000,
    maxWaitTime: 5000,

    activityType: 'other',
    allowsBackgroundLocationUpdates: false,
    headingFilter: 1,
    headingOrientation: 'portrait',
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
  });

  const perlocation = async () => {
    try {
      const granted = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
        },
      });

      if (granted) {
        console.log('permission granted', granted);
        return new Promise((resolve, reject) => {
          const locationSubscription = RNLocation.subscribeToLocationUpdates(
            locations => {
              if (locations && locations.length > 0) {
                locationSubscription();
                resolve(locations);
              } else {
                locationSubscription();
                resolve(null);
              }
              locationSubscription();
            },
          );
        });
      } else {
        console.log('not granted ');
        throw new Error('Location permission not granted');
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      throw error;
    }
  };

  const startForegroundService = () => {
    ReactNativeForegroundService.start({
      id: 1244,
      title: 'Foreground Service',
      message: 'We are live World',
      icon: 'ic_launcher',
      button: true,
      buttonText: 'Testing',
      setOnlyAlertOnce: true,
      color: '#000000',
      progress: {
        max: 100,
        curr: 50,
      },
    });

    ReactNativeForegroundService.add_task(
      async () => {
        try {
          const loc = await perlocation();

          console.log('Current Location:', loc);
        } catch (error) {
          console.error('Error getting location:', error);
        }
      },

      {
        delay: 1500,
        onLoop: true,
        taskId: 'taskid',
        onError: e => console.log('Error logging:', e),
      },
    );
  };

  const clickedOnStartTrip = () => {
    if (!isTripStarted) {
      startForegroundService();
      Alert.alert('Trip started');
      setTripStarted(true);
    } else {
      Alert.alert('Trip Already Started');
    }
  };

  const clickedOnStopTrip = async () => {
    if (isTripStarted) {
      ReactNativeForegroundService.remove_task('taskid');

      ReactNativeForegroundService.stop();

      if (ReactNativeForegroundService.is_task_running('taskid')) {
        Alert.alert('Task is still running');
      } else {
        Alert.alert('Task removed');
        setTripStarted(false);
      }
    } else {
      Alert.alert('Trip is already Stopped');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredView}>
        <Text>HomePage</Text>
        <Button title="Start Trip" onPress={() => clickedOnStartTrip()} />

        <Button title="Stop Trip" onPress={() => clickedOnStopTrip()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
