import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {Button, Text} from 'react-native-paper';
import ProductLinks from '../components/ProductLinks';


export default function Home({navigation}) {
  return (
    
    <SafeAreaView style={styles.viewStyle}>
      <ScrollView>
        <View>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => navigation.navigate('EyeGlass')}
            buttonColor="#E29393"
            labelStyle={{fontSize: 18}}>
            Eye Glasses
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => navigation.navigate('SunGlass')}
            buttonColor="#808080"
            labelStyle={{fontSize: 18}}>
            Sun Glasses
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => navigation.navigate('ComputerGlass')}
            buttonColor="#E9D047"
            labelStyle={{fontSize: 18}}>
            Computer Glasses
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => navigation.navigate('ReadingGlass')}
            buttonColor="#008080"
            labelStyle={{fontSize: 18}}>
            Reading Glasses
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => navigation.navigate('PowerLens')}
            buttonColor="#F1AA53"
            labelStyle={{fontSize: 18}}>
            Power Lenses
          </Button>
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => navigation.navigate('ContactLens')}
            buttonColor="#8282FF"
            labelStyle={{fontSize: 18}}>
            Contact Lenses
          </Button>
        </View>

        <ProductLinks />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    
    backgroundColor: '#ffffff',
  
    
  },
  button: {
    margin: 15,
    borderRadius: 3,
    marginLeft: 30,
    marginRight: 30,
    padding: 5,
    
  },
});
