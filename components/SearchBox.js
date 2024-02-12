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
      <Text style={styles.searchText}>
        Search Box
        <Text style={styles.optText}>(All Fields Optional)</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  searchText: {
    fontSize: 25,
    fontStyle: 'normal',
    color: 'grey',
    marginBottom: 10,
  },
  optText: {
    fontSize: 15,
    color: 'grey',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInpStyle: {
    flex: 1,
    marginRight: 20,

  },
  dropDownContainer: {
    flex: 1,
  },
});
