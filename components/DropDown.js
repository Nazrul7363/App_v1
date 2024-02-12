import {View, Text} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Pcategories({arr ,placeholder ,onValueChange  }) {
  const defaultplaceholder=placeholder;
  const [items,setItems] = useState(arr.map(item => ({label: item, value: item})));

  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);

  const handleValueChange = (selectedValue) => {
    setValue(selectedValue);
    if (onValueChange) {
      onValueChange(selectedValue);
    }
  };

  return (
    <View>
      <DropDownPicker
        placeholder={defaultplaceholder}
        open={open}
        value={value}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        items={items}
        searchable={true}
        containerStyle={{height: 40,width:160,zIndex: open ? 1000 : 0}}
        style={{backgroundColor: '#ffffff'}}
      />
    </View>
  );
}
