import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Text, TextInput} from 'react-native-paper';
import DropDown from '../components/DropDown';

export default function SearchBox() {
  const [keywords, setKeywords] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleKeywordsChange = text => {
    setKeywords(text);
  };

  const arr = [
    'None',
    'Default sorting',
    'Sort by popularity',
    'Sort by average rating',
    'Sort by latest',
    'Sort by price: low to high',
    'Sort by price: high to low',
    'Sort by name',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.biggerText}>
        Search Box
        <Text style={styles.smallerText}>(All Fields Optional)</Text>
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.textInpStyle}>
          <TextInput
            label="Search Keyword"
            value={keywords}
            onChangeText={handleKeywordsChange}
            mode="outlined"
          />
        </View>
        <View style={styles.dropDownContainer}>
          <DropDown
            arr={arr}
            placeholder={'Sort By'}
            onValueChange={value => setSortBy(value)}
          />
        </View>
      </View>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    left: 5,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  biggerText: {
    fontSize: 25,
    fontStyle: 'normal',
    color: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  smallerText: {fontSize: 15, color: 'grey'},
  dropdownStyle: {
    top: 5,
  },
  textInpStyle: {
    paddingRight: 20,
    width: 170,
  },
  dropdownStyle: {
    padding: 7,
  },
});
