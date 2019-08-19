import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from 'react-native-button'
import styles from './index'

const ShadowedButton = ({ huge, style, onPress, children, round, textStyle, textColor, backgroundColor }) => {
  const color = textColor || 'white'
  const background = backgroundColor || 'rgb(51, 195, 255)'
  return (
    <View style={[style, button.shadow]} elevation={2}>
      <Button
        onPress={onPress}
        containerStyle={[ button.container, huge ? button.huge : null, round ? button.round : null, { backgroundColor: background } ]}>
        <View style={styles.content.center}>
          <Text style={[ button.text, textStyle, { color } ]}>{children}</Text>
        </View>
      </Button>
    </View>
  )
}

const button = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    alignItems: 'center'
  },
  container: {
    height: 45,
    width: 150,
    overflow: 'hidden',
    borderRadius: 200,
  },
  huge: {
    width: 200,
    height: 60,
  },
  round: {
    width: 70,
    height: 70,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default ShadowedButton
