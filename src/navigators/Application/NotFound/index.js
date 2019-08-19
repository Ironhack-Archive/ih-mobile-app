import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from '../../styles'
import ShadowedButton from '../../styles/ShadowedButton'
import treasure from './treasure-box.png'

const tagline = {
  textAlign: 'center',
  paddingTop: 12,
  paddingBottom: 16,
  fontWeight: '500',
  fontSize: 16,
}

const NotFound = ({ navigation }) => (
  <View style={styles.content.center}>
    <Image source={treasure} resizeMode='contain' style={styles.image.fullWidth}/>
    <View style={{ flex: 2 }}>
      <Text style={styles.heading.head}>
        {'Unfortunately, it looks like\nthere’s nothing here…'}
      </Text>
      <Text style={tagline}>
        Wait! Isn’t it a treasure?
      </Text>
      <ShadowedButton huge onPress={() => navigation.goBack()}>
        {'That’s cool!\nTake me back now!'}
      </ShadowedButton>
    </View>
  </View>
)

export default NotFound
