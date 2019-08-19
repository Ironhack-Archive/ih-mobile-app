import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { brightLightBlue } from '../styles/colors'

const beginWrapperStyle = {
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row'
}

const beginTextStyle = {
  fontWeight: '700',
  fontSize: 16
}

const FullButton = ({ textColor, backgroundColor, content, onPress, iconName, style, containerStyle, textStyle }) => {
  const color = textColor || 'white'
  const background = backgroundColor || brightLightBlue
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <View style={[ beginWrapperStyle, { backgroundColor: background }, containerStyle ]}>
        {iconName ? <Ionicons name={iconName} size={25} color={color} style={{ paddingRight: 12 }}/> : null}
        <Text style={[ beginTextStyle, { color }, textStyle ]}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
export { FullButton }
