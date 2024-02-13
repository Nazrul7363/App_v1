import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {IconButton, Menu, Button} from 'react-native-paper';
import {MD3Colors} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import CartPage from './CartPage'



export default function HeaderRight() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const navigation = useNavigation();

  return (
    <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
      <IconButton
        icon={() => (
          <Image
            source={require('../icons/cartsvg.png')}
            style={{width: 40, height: 40}}
          />
        )}
        color={MD3Colors.error50}
        size={30}
        onPress={() =>navigation.navigate('CartPage')}
      />

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon={() => (
              <Image
                source={require('../icons/menu.jpg')}
                style={{width: 50, height: 50}}
              />
            )}
            color={MD3Colors.error50}
            size={40}
            onPress={openMenu}
          />
        }>
        <Menu.Item onPress={() => {}} title="Home" />
        <Menu.Item onPress={() => {}} title="Account" />
        <Menu.Item onPress={() => {}} title="Upload Prescription" />
        <Menu.Item onPress={() => {}} title="Track Order" />
        <Menu.Item onPress={() => {}} title="Log out" />
        <Menu.Item onPress={closeMenu} title="Close" />
      </Menu>


    </View>
  );
}
