/**
 * @format
 */
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import { NativeModules, AppRegistry, DeviceEventEmitter } from "react-native";
import App from './App';
import {name as appName} from './app.json';
import RNLocation from 'react-native-location';



ReactNativeForegroundService.register();

AppRegistry.registerComponent(appName, () => App);
