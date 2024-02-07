import { SafeAreaView, View, StyleSheet } from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';
import Links from './Links';

export default function ProductLinks() {
  return (
    <SafeAreaView style={styles.productStyle}>
      <Text style={{ paddingBottom: 30 }} variant="titleLarge">
        Products
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        
        <View style={styles.linkContainer}>
          <Links name={'Computer Glasses'} url={'https://reactnative.dev/docs/flexbox'} />
          <Links name={'Reading Glasses'} url={'https://reactnative.dev/docs/flexbox'} />
          <Links name={'Power Lenses'} url={'https://reactnative.dev/docs/flexbox'} />
        </View>
        
        <View style={styles.linkContainer}>
          <Links name={'Eye Glasses'} url={'https://reactnative.dev/docs/flexbox'} />
          <Links name={'Sun Glasses'} url={'https://reactnative.dev/docs/flexbox'} />
          <Links name={'Contact lenses'} url={'https://reactnative.dev/docs/flexbox'} />
        </View>
      </View>
      <Text style={{ paddingTop: 40, paddingBottom: 30 }} variant="titleLarge">
        Useful Links
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        
        <View style={styles.linkContainer}>
          <Links
            name={'Cancel Refund & Shipping Policy'}
            url={'https://reactnative.dev/docs/flexbox'}
          />
          <Links
            name={'Warranty Policy | Terms & Conditions'}
            url={'https://reactnative.dev/docs/flexbox'}
          />
          <Links name={'Upload Prescription'} url={'https://reactnative.dev/docs/flexbox'} />
          <Links name={'Contact Us'} url={'https://reactnative.dev/docs/flexbox'} />
        </View>
        
        <View style={styles.linkContainer}>
          <Links name={'Privacy Policy'} url={'https://reactnative.dev/docs/flexbox'} />
          <Links name={'Disclaimer'} url={'https://reactnative.dev/docs/flexbox'} />
          <Links name={'About Us'} url={'https://reactnative.dev/docs/flexbox'} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productStyle: {
    backgroundColor: '#F3F3F3',
    padding: 30,
  },
  linkContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: '50%',
  },
});
