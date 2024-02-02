/**
 * @format
 */
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import { NativeModules, AppRegistry, DeviceEventEmitter } from "react-native";
import App from './App';
import {name as appName} from './app.json';
import RNLocation from 'react-native-location';



ReactNativeForegroundService.register();



const close = () => {
  console.log("close button of notification is getting displayed");

}



  ReactNativeForegroundService.start({
    id: 1244,
    title: "Foreground Service",
    message: "We are live World",
    icon: "ic_launcher",
    button:true,
    buttonText:"Testing",
    setOnlyAlertOnce: true,
    color: "#000000",
    progress: {
      max: 100,
      curr: 50,
    },
  });
  

AppRegistry.registerComponent(appName, () => App);
