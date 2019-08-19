import React from 'react'
import { StyleSheet, Text, View, Image, Platform, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import styles from './index'
import { Constants } from 'expo'

const AndroidSafe = ({ style, children }) => (
  <View style={[ style, styles.container.full, { marginTop: Constants.statusBarHeight } ]}>
    {children}
  </View>
)

export const isIPhoneRounded = () => {
  const dimensions = Dimensions.get('window')
  return (Platform.OS === 'ios' && (isIPhoneX(dimensions) || isIPhoneXR(dimensions)))
}

const isIPhoneX = ({ width, height }) => width === 812 || height === 812

const isIPhoneXR = ({ width, height }) => width === 896 || height === 896

const IosSafe = ({ style, children, paddingTop, paddingBottom, xBackgroundBottomColor, xBackgroundTopColor }) => {
  const iPhoneRounded = isIPhoneRounded()
  if (iPhoneRounded) {
    return (
      <View style={[ style, styles.container.full ]}>
        <View style={{ paddingTop: paddingTop === null || paddingTop === undefined ? 30 : paddingTop, backgroundColor: xBackgroundTopColor }}/>
        {children}
        <View style={{ paddingBottom: paddingBottom === null || paddingBottom === undefined ? 32 : paddingBottom, backgroundColor: xBackgroundBottomColor }}/>
      </View>
    )
  } else {
    return (
      <SafeAreaView style={[ style, styles.container.full ]}>
        {children}
      </SafeAreaView>
    )
  }
}

const SafeArea = ({ style, children, paddingTop, paddingBottom, xBackgroundBottomColor, xBackgroundTopColor }) => {
  return Platform.select({
    ios: (
      <IosSafe
        style={style}
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        xBackgroundBottomColor={xBackgroundBottomColor}
        xBackgroundTopColor={xBackgroundTopColor}
      >
        {children}
      </IosSafe>
    ),
    android: <AndroidSafe style={style}>{children}</AndroidSafe>,
  })
}

export default SafeArea
