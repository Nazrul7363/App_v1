import { View, Text ,TouchableOpacity,Image } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import DropDown from './DropDown';

export default function ProductFilters() {
  const productCategories = ['All Categories', 'Eye Glass', 'Women EyeGlasses', 'Men Eyeglasses', 'Unisex Eyeglasses'];
  const productColor = ['a','b','c','d'];
  const productFrameType = [];
  const prductGender = [];
  const productFrameShape = [];
  const productFramematerial = [];
  const productFrameWidth = [];

  const [category, setCategory] = useState();
  const [pcolor,setPcolor]=useState();
  const [pframe, setPframe] = useState();
  const [pgender,setPgender]=useState();
  const [pmaterial, setPmaterial] = useState();
  const [pfwidth,setPfwidth]=useState();
  

  return (
    <View style={{ flexDirection: 'row'}}>
      <View style={{ flexDirection: 'column'}}>
        <View style={{ margin: 10}}>
          <DropDown arr={productCategories} placeholder={'Categories'} onValueChange={(value)=>setCategory(value)} />
        </View>
        <View style={{ margin: 10 }}>
          <DropDown arr={productColor} placeholder={'Product Frame Type'} onValueChange={(value)=>setPcolor(value)}  />
        </View>
        <View style={{ margin: 10 }}>
          <DropDown arr={productCategories} placeholder={'Product Frame Shape'} onValueChange={(value)=>setPframe(value)}  />
        </View>
      </View>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ margin: 10 }}>
          <DropDown arr={productCategories} placeholder={'Color'} onValueChange={(value)=>setPgender(value)}  />
        </View>
        <View style={{ margin: 10 }}>
          <DropDown arr={productCategories} placeholder={'Categories'} onValueChange={(value)=>setPmaterial(value)}  />
        </View>
        <View style={{ margin: 10 }}>
          <DropDown arr={productCategories} placeholder={'Categories'} onValueChange={(value)=>setPfwidth(value)}  />
        </View>
      </View>
     
    </View>
  );
}
