import React, {useEffect, useState,useCallback} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Button, Linking} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location'

import {Alert} from 'react-native';
import GetLocation from 'react-native-get-location';
import Dialog from "react-native-dialog";


const App = () => {
  const [isTripStarted, setTripStarted] = useState(false);
  const [loct,setLoct]=useState();
  const [visible ,setVisible]=useState(false);

  const URL = "https://abvcogjjg.cloudwaysapps.com/ercproxy/version.php/?version=2.0.1";

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
  
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });
  
        console.log('Current Location:', location);
        return location;

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
      message: 'Location is live ',
      icon: 'ic_launcher',
      button: true,
      buttonText: 'Testing',
      setOnlyAlertOnce: true,
      color: '#000000'
      
    });

    ReactNativeForegroundService.add_task(
      async () => {
        try {
          const loc = await perlocation();
          setLoct(loc);


          console.log('Current Locationss:', loc);
        } catch (error) {
          console.error('Error getting location:', error);
        }
      },

      {
        delay: 15000,
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

 


  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleUpdate = async ({URL}) => {
    await Linking.canOpenURL(URL).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + URL);
      } else {
        return Linking.openURL(URL);
      }
    }).catch(err => console.error('An error occurred', err));
  };
  


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredView}>
        <Text>HomePage</Text>
        <Button title="Start Trip" style={{ marginTop: 10 }} onPress={() => clickedOnStartTrip()} />

        <Button title="Stop Trip" onPress={() => clickedOnStopTrip()} />
        <Button title="Show Dialogue" onPress={() => showDialog()} />

       

        <Dialog.Container visible={visible}>
        <Dialog.Title>Account delete</Dialog.Title>
        <Dialog.Description>
          Update Available . Do You Want to Update ?
        </Dialog.Description>
        <Dialog.Button label="Close" onPress={handleCancel} />
        <Dialog.Button label="Update" onPress={() => handleUpdate({URL})} />
      </Dialog.Container>


        <Text>{JSON.stringify(loct)}</Text>

        

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
