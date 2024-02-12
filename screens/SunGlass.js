import {ScrollView, SafeAreaView, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import SearchBox from '../components/SearchBox';
import ProductFilters from '../components/ProductFilters';
import FetchProduct from '../components/FetchProduct';
import ProductLinks from '../components/ProductLinks';

export default function SUnGlass() {
  const productUrl="https://api.escuelajs.co/api/v1/products";
  return (
    <SafeAreaView style={{padding: 5, flexDirection: 'column'}}>
      <ScrollView>
        <SearchBox />
        <ProductFilters />
        <View style={{paddingLeft: 10, paddingRight: 30 ,justifyContent:'center' ,alignItems:'center'}}>
          <FetchProduct URL={productUrl} />
        </View>
        <ProductLinks />
      </ScrollView>
      
    </SafeAreaView>
  )
}