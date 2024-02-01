/**
 * @format
 */
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import { NativeModules, AppRegistry, DeviceEventEmitter } from "react-native";
import App from './App';
import {name as appName} from './app.json';
import RNLocation from 'react-native-location';

// import ic_launcher from './android/app/src/main/res/mipmap-hdpi/ic_launcher.png'



ReactNativeForegroundService.register();
var taskid=144;

  ReactNativeForegroundService.start({
    id: 1244,
    title: "Foreground Service",
    message: "We are live World",
    icon: "ic_launcher",
    button: true,
    button2: true,
    buttonText: "Button",
    button2Text: "Another Button",
    buttonOnPress: "cray",
    setOnlyAlertOnce: true,
    color: "#000000",
    progress: {
      max: 100,
      curr: 50,
    },
  });
  

AppRegistry.registerComponent(appName, () => App);
