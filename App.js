import React, {useEffect, useState,useCallback} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Button, Linking} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import RNLocation from 'react-native-location'
import {Alert} from 'react-native';
import GetLocation from 'react-native-get-location';
import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarCodeScanner from './components/BarCodeScanner'

const App = () => {
  const [isTripStarted, setTripStarted] = useState(false);
  const [loct,setLoct]=useState();
  const [visible ,setVisible]=useState(false);
  const [getCount, setCount]=useState();
  const [showScanner, setShowScanner] = useState(false);

  const URL = "https://phpstack-560575-3696471.cloudwaysapps.com/ercproxy/version.php/?version=2.0.1";


  useEffect(() => {
    const requestPermission = async () => {
      if(ReactNativeForegroundService.is_task_running(12)){
        console.log("Task is running")
        setTripStarted(true);
        const countValue=parseFloat(await AsyncStorage.getItem('count')) || 0;
        console.log("value",countValue);
        setCount(countValue);
      }
      else{
        console.log("Task is not running");
      }


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
  const fetchApi=async (count)=>{
    console.log("ssss Checking count in fetch",count);

   
    await fetch('https://dummyjson.com/products/1')
     .then(async(res) => {
       if(res.status===200){
         console.log("Data Fetching Succesfully after 15 sec and status code is 200 and count is ", count);
         
         console.log("Checking count after increment ");
         await AsyncStorage.setItem('count',count.toString());
       }
       else{
         console.log("Satus not ok",res.status);
         await AsyncStorage.setItem('count',count.toString());
       }
     }).catch(async(error)=>{
      console.log("Fetching error");
      await AsyncStorage.setItem('count',count.toString());
     });
   }


  const startForegroundService = (count) => {
    let ForeCount=count;
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
          console.log("checking count before fetching call",ForeCount);
          ForeCount=ForeCount+1;
          const loc = await perlocation();
          const resp=await fetchApi(ForeCount);
          setLoct(loc);
          let cValue=await AsyncStorage.getItem('count');
          setCount(cValue);


         
        } catch (error) {
          console.error('Error getting location:', error);
        }
      },
      {
        delay: 15000,
        onLoop: true,
        taskId: 12,
        onError: e => console.log('Error logging:', e),
      },
    );
  };


 


 const clickedOnStartTrip = async () => {
    if (!isTripStarted) {
      let count=0;
      startForegroundService(count);


      setTripStarted(true);
      Alert.alert('Trip started');


    } else {
      Alert.alert('Trip Already Started');
    }
  };  


  const clickedOnStopTrip = async () => {
    if (isTripStarted) {
      ReactNativeForegroundService.remove_task();
     
      ReactNativeForegroundService.stop();
     
      if (ReactNativeForegroundService.is_task_running()) {
        Alert.alert('Task is still running');
      } else {
        Alert.alert('Task removed');
        setTripStarted(false);
        await AsyncStorage.setItem('count',"0");
      }
    } else {
      Alert.alert('Trip already Stopped');
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
        setVisible(false);
      }
    }).catch(err => console.error('An error occurred', err));
  };

  const toggleScanner = () => {
    setShowScanner(!showScanner);
  };
 




  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredView}>
        <Text>HomePage</Text>
        <Button title="Start Trip"  onPress={() => clickedOnStartTrip()} />
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
        <Text>count: {getCount}</Text>

        <Button title="Open Scanner" onPress={() => toggleScanner()} />

      {showScanner && <BarCodeScanner />}


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
