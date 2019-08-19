import React from 'react'
import { createSwitchNavigator, createAppContainer } from "react-navigation"

import OnBoarding from './navigators/OnBoarding'
import Loading from './navigators/Loading'
import Application from './navigators/Application'
import './firebase'

const AppNavigator = createSwitchNavigator({
  Loading,
  OnBoarding,
  Application,
}, {
  initialRouteName: 'Loading',
  headerMode: 'none'
})

export default createAppContainer(AppNavigator)
