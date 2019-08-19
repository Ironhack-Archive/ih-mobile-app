import React from 'react'
import { Text, TextInput, View, Linking, Platform, Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import SafeArea from '../../styles/SafeArea'
import styles from '../../styles'
import { textFieldBackground, paleGrey, darkBlueGrey, brightLightBlue } from '../../styles/colors'

const SignLogView = ({ children, keyboardVisible }) => (
  <SafeArea style={{ backgroundColor: paleGrey }}>
    <KeyboardAwareScrollView
      enableOnAndroid
      scrollEnabled={Platform.select({ ios: keyboardVisible, android: keyboardVisible })}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {children}
    </KeyboardAwareScrollView>
  </SafeArea>
)


const marginHorizontal = margin => ({
  marginRight: margin,
  marginLeft: margin
})

const marginVertical = margin => ({
  marginTop: 10,
  marginBottom: 10
})

const paddingVertical = margin => ({
  paddingRight: 20,
  paddingLeft: 20
})

const staticTextFieldStyle = {
  height: 48,
  borderRadius: 200,
  backgroundColor: textFieldBackground,
  color: darkBlueGrey
}

const textFieldStyle = ({ margin }) => [
  marginVertical(10),
  marginHorizontal(margin),
  paddingVertical(20),
  staticTextFieldStyle
]

const TextField = ({ placeholder, value, onChangeText, secureTextEntry, textContentType, keyboardType }) => (
  <TextInput
    clearButtonMode='always'
    elevation={2}
    placeholder={placeholder}
    style={[ textFieldStyle({ margin: 40 }), styles.shadow.light ]}
    value={value}
    onChangeText={onChangeText}
    textContentType={textContentType}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
  />
)

const DisplayError = ({ value, state }) => {
  const style = { textAlign: 'center', color: 'red' }
  if (state.error) {
    return <Text style={style}>{value}</Text>
  } else {
    return null
  }
}

const Link = ({ to, children }) => (
  <Text
    style={{ color: brightLightBlue, textDecorationLine: 'underline' }}
    onPress={() => Linking.openURL(to).catch(console.log)}
  >
    {children}
  </Text>
)

const LegalNotice = props => (
  <View style={[ { alignItems: 'center', paddingTop: 12 }, styles.padding.largeBottom ]}>
    <Text>By pressing 'Join', you agree to</Text>
    <Text>our <Link to='https://www.ironhack.com/en/legal-notice'>terms & conditions</Link></Text>
  </View>
)

export { LegalNotice, DisplayError, TextField, SignLogView }
