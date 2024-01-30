import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { PermissionsAndroid } from 'react-native';
import { useEffect } from 'react';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location';



const App = () => {
 
  useEffect(() => {
    const requestPermission = async () => {
      console.log("RequestPermission got called");

      try {
        const backgroundgranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          {
            title: 'Background Location Permission',
            message: 'We need access to your location for live quality updates.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Background permission granted");
          // Do your thing!
        } else {
          console.log("Background permission not granted");
        }
      } catch (error) {
        console.error("Error requesting background permission:", error);
      }
    };

    requestPermission();
  }, []);



  RNLocation.configure({
    distanceFilter: 100, // Meters
    desiredAccuracy: {
      ios: 'best',
      android: 'balancedPowerAccuracy',
    },
    // Android only
    androidProvider: 'auto',
    interval: 5000, // Milliseconds
    fastestInterval: 10000, // Milliseconds
    maxWaitTime: 5000, 
    // iOS Only
    activityType: 'other',
    allowsBackgroundLocationUpdates: false,
    headingFilter: 1, // Degrees
    headingOrientation: 'portrait',
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: true,
  });
  let locationSubscription = null;
  let locationTimeout = null;


  
  ReactNativeForegroundService.add_task(
    () => {
      const perlocation = async () => {
        try {
          const granted = await RNLocation.requestPermission({
            ios: 'whenInUse',
            android: {
              detail: 'coarse',
            },
          });
  
          if (granted) {
            return new Promise((resolve, reject) => {
              const locationSubscription = RNLocation.subscribeToLocationUpdates(
                (locations) => {
                  if (locations && locations.length > 0) {
                    const latitude = locations[0]?.latitude ?? null;
                    const longitude = locations[0]?.longitude ?? null;
  
                    if (latitude !== null && longitude !== null) {
                      const currentLocation = `${latitude},${longitude}`;
                      resolve(currentLocation);
                    } else {
                      console("NOthing inside location");
                      resolve(null);
                    }
                  } else {
                    console("NOthing inside subscribeTolocation");
                    resolve(null);
                  }
                }
              );
            });
          }
          else{
            console.log("not granted ")
          }
        } catch (error) {
          console.error('Error requesting location permission:', error);
          throw error;
        }
      };
  
      perlocation().then((currentLocation) => {
        console.log('Current Location:', currentLocation);
      }) .catch((error) => {
        console.error('Error:', error);
        // Handle the error appropriately, e.g., log it or perform other actions
      });
      console.log("IIII");
      
    },
    {
      delay: 100,
      onLoop: true,
      taskId: 'taskid',
      onError: (e) => console.log('Error logging:', e),
    }
  );
  
 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredView}>
        <Text>
          HomePage
        </Text>
      </View>
    </SafeAreaView>
  );
}

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
