import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import styles from '../../styles'
import { brightLightBlue } from '../../styles/colors'
import SafeArea, { isIPhoneRounded } from '../../styles/SafeArea'
import Courses from './Courses'
import CourseOverview from './CourseOverview'
import { FullButton } from '../common'
import Picture from './6.jpg'

const JoinPage = ({ navigation }) => (
  <SafeArea paddingBottom={0}>
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name='md-close' color={brightLightBlue} size={35} style={{ paddingTop: 24, paddingLeft: 24 }}/>
      </TouchableOpacity>
      <Image source={Picture} resizeMode='contain' style={styles.image.responsive}/>
      <ScrollView>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <Text style={styles.heading.huge}>Congratulations!</Text>
          <Text style={[styles.heading.head, { padding: 12 }]}>You've made it!</Text>
          <Text style={{ fontSize: 16, padding: 6, textAlign: 'center', width: '80%' }}>You went through all courses and finished everything!</Text>
          <Text style={{ fontSize: 16, padding: 6, textAlign: 'center', width: '80%' }}>It's time to continue your journey with us at Ironhack!</Text>
        </View>
      </ScrollView>
      <FullButton
        content='Apply'
        onPress={() => navigation.navigate('Postulate')}
        containerStyle={{ height: 60 }}
        textStyle={{ fontSize: 20 }}
      />
    </View>
  </SafeArea>
)

const CoursesNavigator = createStackNavigator({
  Courses,
  CourseOverview,
  JoinPage,
}, {
  initialRouteName: 'Courses',
  headerMode: 'none',
})

export default CoursesNavigator
