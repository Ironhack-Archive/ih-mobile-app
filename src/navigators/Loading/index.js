import React from 'React'
import { StyleSheet, View, Image, Dimensions, Keyboard, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'
import { Font } from 'expo'

import SafeArea from '../styles/SafeArea'
import styles from '../styles'
import { updateUserAndFetchData, updateKeyboard } from '../../store/actions'

const mapStateToProps = ({ user }) => {
  return {
    user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onValidate: user => {
      dispatch(updateUserAndFetchData(user))
    },
    updateKeyboard: keyboardDisplayed => {
      dispatch(updateKeyboard(keyboardDisplayed))
    },
  }
}

class Loading extends React.Component {
  constructor(props) {
    super(props)
    this.fetchLogIn()
    Keyboard.addListener('keyboardDidShow', (event) => {
      const size = Dimensions.get('window').height - event.endCoordinates.height
      props.updateKeyboard(size)
    })
    Keyboard.addListener('keyboardDidHide', () => props.updateKeyboard(null))
  }

  async fetchLogIn() {
    await Font.loadAsync({
      'Roboto Slab': require('../../../assets/fonts/RobotoSlab-Regular.ttf'),
      'Roboto Slab Bold': require('../../../assets/fonts/RobotoSlab-Bold.ttf'),
      'Roboto Slab Light': require('../../../assets/fonts/RobotoSlab-Light.ttf'),
      'Roboto Slab Thin': require('../../../assets/fonts/RobotoSlab-Thin.ttf'),
      'Roboto Mono Bold': require('../../../assets/fonts/RobotoMono-Bold.ttf'),
    })
    const userID = JSON.parse(await AsyncStorage.getItem('userID'))
    if (userID) {
      this.props.onValidate(userID)
      this.props.navigation.navigate('Application')
    } else {
      this.props.navigation.navigate('OnBoarding')
    }
  }

  render() {
    return (
      <SafeArea style={{ justifyContent: 'center' }}>
        <Image
          source={require('./images/loader.gif')}
          style={styles.image.fullResponsiveImage}
          resizeMode='contain'
        />
      </SafeArea>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading)
