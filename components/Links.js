import React from 'react';
import {Linking} from 'react-native';
import {Text, Icon, MD3Colors} from 'react-native-paper';

const LinkComponent = ({name, url}) => {
  const handleUpdate = async ({URL}) => {
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
    <Text
      onPress={() => handleUpdate({URL: url})}
      variant="bodyLarge"
      style={{color: 'blue',paddingBottom:15,}}>
      <Icon  source="camera" color={MD3Colors.error50} size={20} 
      />

      {name}
    </Text>
  );
};

export default LinkComponent;
