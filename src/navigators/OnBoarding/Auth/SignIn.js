import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

import * as firebase from '../../../firebase'
import ShadowedButton from '../../styles/ShadowedButton'
import styles from '../../styles'
import { CircledImage } from '../../Images'
import { DisplayError, TextField, SignLogView } from './common'
import { textFieldBackground } from '../../styles/colors'
import { updateUserAndFetchData } from '../../../store/actions'

const mapStateToProps = ({ user, keyboardVisible }) => {
  return {
    user,
    keyboardVisible,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onValidate: user => {
      dispatch(updateUserAndFetchData(user))
    }
  }
}

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: false
    }
  }

  onChangeEmail = (text) => {
    this.setState(state => ({
      ...state,
      email: text.toLowerCase(),
      error: false
    }))
  }

  onChangePassword = (text) => {
    this.setState(state => ({
      ...state,
      password: text,
      error: false
    }))
  }

  signIn = async () => {
    try {
      const { email, password } = this.state
      const credential = await firebase.auth.signIn(email, password)
      this.props.onValidate(credential.user)
      this.props.navigation.navigate('Application')
    } catch (error) {
      this.setState({ ...this.state, error: true })
    }
  }

  render() {
    return (
      <SignLogView keyboardVisible={this.props.keyboardVisible}>
        <View style={[ styles.content.center, { flex: 2 } ]}>
          <CircledImage
            backgroundColor={textFieldBackground}
            source={require('./Icon-Robot.png')}
            size={120}
          />
        </View>
        <View style={{ flex: 3 }}>
          <DisplayError state={this.state} value='Wrong identifier or password.'/>
          <TextField
            placeholder='E-Mail'
            onChangeText={this.onChangeEmail}
            value={this.state.email}
            textContentType='emailAddress'
            keyboardType='email-address'
          />
          <TextField
            placeholder='Password'
            onChangeText={this.onChangePassword}
            value={this.state.password}
            secureTextEntry={true}
            textContentType='password'
            // keyboardType='visible-password'
          />
          <ShadowedButton
            style={styles.padding.largeTop}
            onPress={this.signIn}
          >
            Enter
          </ShadowedButton>
        </View>
      </SignLogView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
