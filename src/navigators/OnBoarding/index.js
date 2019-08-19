import { createStackNavigator } from 'react-navigation'

import Home from './Home'
import Wizard from './Wizard'
import { SignUp, SignIn } from './Auth'

const OnBoarding = createStackNavigator({
  Home,
  Wizard,
  SignUp,
  SignIn,
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      shadowRadius: 0,
      shadowOffset: {
        height: 0
      },
    },
    headerTransparent: true,
    headerBackTitle: null,
  }
})

export default OnBoarding
