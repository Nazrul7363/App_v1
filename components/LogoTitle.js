import { View, Text ,Image} from 'react-native'
import React from 'react'

export default function LogoTitle() {
  return (
    <Image
      style={{ width: 100, height: 50 }}
      source={require('../icons/Logo-high-resolution-2048x1024.png')}
    />
  )
}