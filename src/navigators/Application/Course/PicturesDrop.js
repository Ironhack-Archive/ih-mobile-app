import React from 'react'
import { Dimensions, View, Text, Image, ImageStore, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native'
import { Permissions, ImagePicker, FileSystem } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import loader from './images/loader.gif'

import Timer from './Timer'
import styles from '../../styles'
import { brightLightBlue, darkPaleGrey } from '../../styles/colors'
import upload from './images/upload.png'
import camera from './images/camera.png'

const mapDispatchToProps = dispatch => ({
  updateState: state => {
    dispatch({
      type: 'UPDATE_ACTUAL_EXERCISE',
      value: state,
    })
  },
})

const mapStateToProps = ({ actualExercise }) => ({ actualExercise })

const askForPicturesPermissions = () => new Promise(resolve => {
  Alert.alert(
    'Pictures permissions',
    'We need to access your photos for uploading them to validate your exercise. We won’t use them for another reason. Promise.',
    [
      { text: 'No!', onPress: () => resolve('NO') },
      { text: 'Ok!', onPress: () => resolve('OK') },
    ]
  )
})

const askForCameraPermissions = () => new Promise(resolve => {
  Alert.alert(
    'Camera permissions',
    'We need to access your camera for uploading them to validate your exercise. We won’t use them for another reason. Promise.',
    [
      { text: 'No!', onPress: () => resolve('NO') },
      { text: 'Ok!', onPress: () => resolve('OK') },
    ]
  )
})

const takePhoto = async (updateState, updateGlobal) => {
  const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA)
  if (status !== 'granted') {
    const isPeopleOk = await askForCameraPermissions()
    if (isPeopleOk === 'OK') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA)
      if (newPermission.status === 'granted') {
        pickImage(updateState, updateGlobal)
      }
    }
  } else {
    pickImage(updateState, updateGlobal)
  }
}

const pickImage = async (updateState, updateGlobal) => {
  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    // aspect: [ 4, 3 ],
    base64: true,
  })
  if (!result.cancelled) {
    updateState({ loading: true })
    const apiURL = 'https://api.cloudinary.com/v1_1/babywolf/image/upload'
    const file = 'data:image/jpeg;base64,' + result.base64
    let data = {
      "file": file,
      "upload_preset": "vueu08y1",
    }
    const res = await fetch(apiURL, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    })

    let data3 = await res.json()
    updateState({ loading: false, content: file })
    updateGlobal({ image: data3.secure_url })
  }
}

const uploadPhoto = async (updateState, updateGlobal) => {
  const { status } = await  Permissions.getAsync(Permissions.CAMERA_ROLL)
  if (status !== 'granted') {
    const isPeopleOk = await askForPicturesPermissions()
    if (isPeopleOk === 'OK') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (newPermission.status === 'granted') {
        selectImage(updateState, updateGlobal)
      }
    }
  } else {
    selectImage(updateState, updateGlobal)
  }
}

const selectImage = async (updateState, updateGlobal) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      // aspect: [ 4, 3 ],
      base64: true,
    })
    if (!result.cancelled) {
      updateState({ loading: true })
      const apiURL = 'https://api.cloudinary.com/v1_1/babywolf/image/upload'
      const file = 'data:image/jpeg;base64,' + result.base64
      let data = {
        "file": file,
        "upload_preset": "vueu08y1",
      }
      const res = await fetch(apiURL, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      })

      let data3 = await res.json()
      updateState({ loading: false, content: file })
      updateGlobal({ image: data3.secure_url })
    }
  }

class PicturesDrop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  componentDidMount() {
    this.props.updateState({})
  }

  render() {
    const { timer } = this.props
    const updateLocalState = (localState) => this.setState(localState)
    const { height } = Dimensions.get('window')
    const size = timer ? height * 0.2 : height * 0.3

    return (
      <View>
        {timer ? <Timer init={timer} startColor={brightLightBlue} stopColor={darkPaleGrey}/> : null}
        <View elevation={2} style={[
          {
            height: size,
            backgroundColor: 'white',
            borderRadius: 10,
            marginHorizontal: 24,
            marginTop: 6,
            marginBottom: 24,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          },
          styles.shadow.light,
        ]}>
          {this.state.content
            ? <View style={{ flex: 1 }}>
                <View style={{ flex: 1, position: 'absolute', right: 6, zIndex: 10000 }}>
                  <TouchableOpacity onPress={() => {
                    this.setState({ loading: false, content: undefined })
                    this.props.updateState({})
                  }}>
                    <Ionicons name='md-close' size={35} color={brightLightBlue}/>
                  </TouchableOpacity>
                </View>
                <Image source={{ uri: this.state.content }} resizeMode='contain' style={{ flex: 1, height: size }}/>
              </View>

            : this.state.loading
              ? <Image source={loader} resizeMode='contain' style={{ width: 250, height: 250 }}/>
              : <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => takePhoto(updateLocalState, this.props.updateState)}>
                    <Image
                      source={camera}
                      resizeMode='contain'
                      style={{ width:  size * 0.5, height: size * 0.5 }}
                    />
                  </TouchableOpacity>
                  <View style={{ padding: 6 }}/>
                  <TouchableOpacity onPress={() => uploadPhoto(updateLocalState, this.props.updateState)}>
                    <Image
                      source={upload}
                      resizeMode='contain'
                      style={{ width:  size * 0.5, height: size * 0.5 }}
                    />
                  </TouchableOpacity>
                </View>
          }
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PicturesDrop)
