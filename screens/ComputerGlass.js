import { View, Text ,SafeAreaView } from 'react-native'
import React from 'react'
import SearchBox from '../components/SearchBox'


const ComputerGlass = () => {
  return (
    <SafeAreaView>
      <View style={{marginTop:30}}>
        <SearchBox />
      </View>
    </SafeAreaView>
  )
}

export default ComputerGlass