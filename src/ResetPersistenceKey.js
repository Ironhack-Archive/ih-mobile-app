import React from 'react'
import { AsyncStorage } from 'react-native'

class ResetPersistenceKey extends React.Component {
  constructor(props) {
    super(props)
    this.removePersistenceKey()
  }

  render() {
    return null
  }

  removePersistenceKey = async () => {
    try {
      await AsyncStorage.removeItem(this.props.persistenceKey)
      console.log('Persistence Key Resetted')
    } catch (error) {
      console.error(error)
    }
  }
}

export default ResetPersistenceKey
