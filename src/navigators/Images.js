import React from 'react'
import { View, Image } from 'react-native'
import styles from './styles'

const roundedImageStyle = (size, borderWidth) => ({
  width: size,
  height: size,
  borderRadius: size/2,
  borderWidth,
  borderColor: '#f9f9f9'
})

const RoundedImage = ({ borderWidth, size, source }) => (
  <Image
    style={roundedImageStyle(size, borderWidth)}
    source={source}
  />
)

const circleContainerStyle = backgroundColor => [
  { backgroundColor: backgroundColor },
  styles.container.round,
  styles.padding.medium,
  styles.shadow.light
]

const CircledImage = ({ backgroundColor, source, size }) => (
  <View style={circleContainerStyle('#fefefe')}>
    <RoundedImage source={source} size={size} borderWidth={1}/>
  </View>
)

export { RoundedImage, CircledImage }
