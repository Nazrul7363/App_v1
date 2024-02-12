import {
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import SearchBox from '../components/SearchBox';
import ProductFilters from '../components/ProductFilters';
import FetchProduct from '../components/FetchProduct';
import ProductLinks from '../components/ProductLinks';

export default function EyeGlass() {
  const productUrl = 'https://fakestoreapi.com/products';
  return (
    <SafeAreaView style={{padding: 5, flexDirection: 'column'}}>
      <ScrollView>
        <View
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SearchBox />
          <ProductFilters />
          <TouchableOpacity
            style={{right: 150, margin: 20}}
            onPress={() => console.log('pressed')}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../icons/twoArrow.png')}
            />
          </TouchableOpacity>
          <FetchProduct URL={productUrl} />
        </View>
        <ProductLinks />
      </ScrollView>
    </SafeAreaView>
  );
}
