import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'

import { updateUserAndFetchData } from '../../../store/actions'
import * as firebase from '../../../firebase'
import ShadowedButton from '../../styles/ShadowedButton'
import styles from '../../styles'
import { CircledImage } from '../../Images'
import { LegalNotice, DisplayError, TextField, SignLogView } from './common'
import { textFieldBackground } from '../../styles/colors'

const mapStateToProps = ({ user, keyboardVisible }) => {
  return {
    user,
    keyboardVisible,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onValidate: (userID, email, name) => {
      dispatch(updateUserAndFetchData(userID, name, email))
    }
  }
}

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
    }
  }

  onChangeName = (text) => {
    this.setState(state => ({
      ...state,
      name: text,
      error: false
    }))
  }

  onChangeEmail = (text) => {
    this.setState(state => ({
      ...state,
      email: text.toLowerCase(),
    }))
  }

  signUp = async () => {
    const { email, name } = this.state
    const userID = uuid()
    this.props.onValidate(userID, email, name)
    this.props.navigation.navigate('Application')
  }

  render() {
    return (
      <SignLogView keyboardVisible={this.props.keyboardVisible}>
        <View style={{ paddingTop: 45 }}/>
        <View style={styles.container.full}>
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <CircledImage
              backgroundColor={textFieldBackground}
              source={require('./Icon-Robot.png')}
              size={120}
            />
          </View>
          <TextField
            placeholder='First & Last Name'
            onChangeText={this.onChangeName}
            value={this.state.name}
          />
          <TextField
            placeholder='E-Mail'
            onChangeText={this.onChangeEmail}
            value={this.state.email}
            textContentType='emailAddress'
            keyboardType='email-address'
          />
          <ShadowedButton style={styles.padding.largeTop} onPress={this.signUp}>
            Join
          </ShadowedButton>
        </View>
        <LegalNotice/>
      </SignLogView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
