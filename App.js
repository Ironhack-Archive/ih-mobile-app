import React from 'react'
import { Provider } from 'react-redux'

import ResetPersistenceKey from './src/ResetPersistenceKey'
import Main from './src/Main'
import store from './src/store'
import NavigationService from './src/NavigationService'

const NAVIGATION_PERSISTENCE_KEY = null // __DEV__ ? 'NavigationStateDev' : null

const PersistentMain = () => {
  if (NAVIGATION_PERSISTENCE_KEY) {
    return <Main persistenceKey={NAVIGATION_PERSISTENCE_KEY} ref={navigatorRef => {
      console.log(navigatorRef)
      NavigationService.setTopLevelNavigator(navigatorRef)
    }}/>
  } else {
    return <Main/>
  }
}

const App = () => (
  <Provider store={store}>
    {/* <ResetPersistenceKey persistenceKey={'userID'}/> */}
    <PersistentMain/>
  </Provider>
)

export default App
