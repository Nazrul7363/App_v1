import React from 'react';
import { Linking, View } from 'react-native';
import { Text, Icon, MD3Colors } from 'react-native-paper';

const LinkComponent = ({ name, url }) => {
  const handleUpdate = async ({ URL }) => {
    try {
      const supported = await Linking.canOpenURL(URL);
      if (!supported) {
        console.log("Can't handle url: " + URL);
      } else {
        await Linking.openURL(URL);
      }
    } catch (err) {
      console.error('An error occurred', err);
    }
  };

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 25,
    }}>
      <Icon
        source={require('../icons/linklogo.png')}
        size={20}
      />
      <Text
        onPress={() => handleUpdate({ URL: url })}
        style={{
          color: '#3d9cd2',
          fontSize: 18,
          paddingLeft:5
        }}>
        {name}
      </Text>
    </View>
  );
  
  
};

export default LinkComponent;
