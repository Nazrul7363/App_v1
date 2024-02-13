import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Home from './screens/Home';
import EyeGlass from './screens/EyeGlass';
import SunGlass from './screens/SunGlass';
import ComputerGlass from './screens/ComputerGlass';
import ReadingGlass from './screens/ReadingGlass';
import PowerLens from './screens/PowerLens';
import ContactLens from './screens/ContactLens';
import LogoTitle from './components/LogoTitle';
import HeaderRight from './components/HeaderRight';
import CartPage from './components/CartPage';
import ProductPage from './components/ProductPage'


const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2490ef',
    secondary: '#2490ef',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitle:(props)=> <LogoTitle {...props}/>,
            headerRight: (props) => <HeaderRight {...props} />,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="EyeGlass" component={EyeGlass} />
          <Stack.Screen name="SunGlass" component={SunGlass} />
          <Stack.Screen name="ComputerGlass" component={ComputerGlass} />
          <Stack.Screen name="ReadingGlass" component={ReadingGlass} />
          <Stack.Screen name="PowerLens" component={PowerLens} />
          <Stack.Screen name="ContactLens" component={ContactLens} />
          <Stack.Screen name="CartPage" component={CartPage} />
          <Stack.Screen name="ProductPage" component={ProductPage} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
