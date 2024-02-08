import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function LogoTitle({ navigation }) {
  const handlePress = () => {
    navigation?.navigate('Home');
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        style={{ width: 100, height: 50 }}
        source={require('../icons/Logo-high-resolution-2048x1024.png')}
      />
    </TouchableOpacity>
  );
}
