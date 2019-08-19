import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator, withNavigationFocus } from 'react-navigation'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import { CourseCard, ExerciseCard, CongratsPage } from './Course'
import CoursesNavigator from './Courses'
import Postulate from './Postulate'
import Profile from './Profile'

import { brightLightBlue } from '../styles/colors'

const chooseIconName = routeName => {
  switch (routeName) {
    case 'CoursesNavigator': return 'md-home'
    case 'Profile': return 'md-person'
    case 'Postulate': return 'hexagon'
  }
}

const tabBarAppearance = ({ navigation }) => ({
  tabBarIcon: ({ focused, horizontal, tintColor }) => {
    const { routeName } = navigation.state
    const iconName = chooseIconName(routeName)
    return routeName === 'Postulate' ? <MaterialCommunityIcons name={iconName} size={35} color={tintColor}/> : <Ionicons name={iconName} size={35} color={tintColor}/>
  },
})

const tabBarOptions = {
  showLabel: false,
  activeTintColor: brightLightBlue,
  inactiveTintColor: 'rgb(161, 169, 179)',
  activeBackgroundColor: 'white',
  inactiveBackgroundColor: 'white',
  style: {
    borderTopWidth: 0,
  },
}

const Application = createBottomTabNavigator({
  CoursesNavigator,
  CourseCard: {
    screen: CourseCard,
    navigationOptions: {
      tabBarVisible: false,
      tabBarButtonComponent: () => null,
    },
  },
  ExerciseCard: {
    screen: ExerciseCard,
    navigationOptions: {
      tabBarVisible: false,
      tabBarButtonComponent: () => null,
    },
  },
  CongratsPage: {
    screen: withNavigationFocus(CongratsPage),
    navigationOptions: {
      tabBarVisible: false,
      tabBarButtonComponent: () => null,
    },
  },
  BadgePage: {
    screen: withNavigationFocus(CongratsPage),
    navigationOptions: {
      tabBarVisible: false,
      tabBarButtonComponent: () => null,
    }
  },
  Profile,
  Postulate,
}, {
  initialRouteName: 'CoursesNavigator',
  defaultNavigationOptions: tabBarAppearance,
  tabBarOptions
})

export default Application
