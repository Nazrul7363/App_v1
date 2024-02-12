import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ScrollView,StyleSheet } from 'react-native';


const FetchProduct = ({URL}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const renderProductItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20 }}>
      <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 10 }} />
      <View style={{ marginLeft: 10, flexDirection: 'row' }}>
        <Text style={styles.textStyle}>{item.name}</Text>
        <Text style={styles.textStyle}>{item.price}</Text>
        <Text style={styles.textStyle}>{item.description}</Text>
        <Text style={styles.textStyle}>{item.stock > 0 ? 'In Stock' : 'Out of Stock'}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView horizontal={true}>
      <View>
        {loading ? (
          <Text >Loading...</Text>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderProductItem}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default FetchProduct;

styles=StyleSheet.create({
  textStyle:{
    color:'#000000',
  },
  descriptionStyle:{
    color:'#000000',


  }
})
