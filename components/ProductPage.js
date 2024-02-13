import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import DropDown from './DropDown';
import ProductLinks from './ProductLinks';

const ProductPage = ({route}) => {
  const {product} = route.params;
  console.log(product);
  const loc = ['Central Hub ', 'Sivsagar', 'Tezpur'];

  const productInfoArray = Object.entries(product).map(([key, value]) => ({
    key,
    value: String(value),
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: product.image}} style={styles.image} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.title}>{product.title}</Text>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <Text
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
              color: '#999A9A',
              fontSize: 20,
              fontWeight:'bold'
            }}>
            {'\u20B9'} 2139.87
          </Text>
          <Text style={{marginLeft: 5, fontSize: 20,fontWeight:'bold'}}>
            {' '}
            {product.price} (inc. GST)
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 20,
            fontWeight: 'bold',
            paddingTop: 40,
            paddingBottom: 10,
          }}>
          Select Location :{' '}
        </Text>
        <View style={{height: 100, zIndex: 30}}>
          <DropDown arr={loc} placeholder={'Select Location'} />
        </View>
        <View>
          <Text style={{fontSize: 30, fontWeight: 300, paddingVertical: 20}}>
            Additional Information{' '}
          </Text>
          <FlatList
            data={productInfoArray}
            keyExtractor={item => item.key}
            renderItem={({item}) => (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{width: 200, padding: 20, backgroundColor: '#c1c2c2'}}>
                  <Text style={{fontSize: 20}}>{item.key}</Text>
                </View>

                <View
                  style={{width: 200, padding: 20, backgroundColor: '#eaeaea'}}>
                  <Text style={{fontSize: 20}}>{item.value}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      <ProductLinks />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 350,
    height: 300,
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 40,
  },
  productInfo: {},
  title: {
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 10,
    textAlign: 'left',
  },
  price: {
    fontSize: 20,
  },
});

export default ProductPage;
