import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

import styles from '../../styles'
import SafeArea from '../../styles/SafeArea'
import { coursesBackground, freshGreen, darkerPaleGrey } from '../../styles/colors'
import { RoundedImage } from '../../Images'

const selectBackgroundColor = completion => {
  if (completion) {
    return freshGreen
  } else {
    return darkerPaleGrey
  }
}

const selectStyle = (length, index, completion) => {
  return {
    borderBottomRightRadius: index + 1 === length ? 5 : undefined,
    borderTopRightRadius: index + 1 === length ? 5 : undefined,
    borderBottomLeftRadius: index === 0 ? 5 : undefined,
    borderTopLeftRadius: index === 0 ? 5 : undefined,
    backgroundColor: selectBackgroundColor(completion),
    flex: 1,
  }
}

const renderProgressionBar = (length, completion) => (_, index) => {
  const style = selectStyle(length, index, completion >= index)
  return (
    <View style={style} key={index}/>
  )
}

const ProgressionBar = ({ cards, completion }) => {
  const progression = cards.map(renderProgressionBar(cards.length, completion))
  return (
    <View style={{
      height: 5,
      backgroundColor: darkerPaleGrey,
      borderRadius: 10,
      margin: 12,
      flexDirection: 'row'
    }}>
      {progression}
    </View>
  )
}

const LockOverlay = ({ visible }) => {
  if (visible) {
    return (
      <View style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Ionicons name='md-lock' size={80} color='white'/>
      </View>
    )
  } else {
    return null
  }
}

const TouchableOrView = ({ children, visible, navigation, id }) => {
  const style_ = { width: '40%', margin: 12 }
  if (visible) {
    return (
      <TouchableOpacity
        onPress={() => navigation.push('CourseOverview', { id }) }
        style={style_}>
        {children}
      </TouchableOpacity>
    )
  } else {
    return (
      <View style={style_}>
        {children}
      </View>
    )
  }
}

const isPreviousFinished = ({ courses, completion }, id) => {
  const index = courses.findIndex(course => course.id === id)
  if (index <= 0) {
    return true
  } else {
    return (completion[courses[index - 1].id] || {}).isCompleted || false
  }
}

const isMoving = (state, id) => {
  const { courses, completion } = state
  const index = courses.findIndex(course => course.id === id)
  if (index + 1 === courses.length) {
    if ((completion[id] || {}).isCompleted || !isPreviousFinished(state, id)) {
      return false
    } else {
      return true
    }
  } else {
    if (!((completion[id] || {}).isCompleted) && isPreviousFinished(state, id)) {
      return true
    } else {
      return false
    }
  }
}

class CourseCardOverview extends React.Component {
  constructor(props) {
    super(props)
    this.AnimationRef
  }

  // componentDidMount() {
  //   const moving = isMoving(this.props.state, this.props.course.id)
  //   if (moving) {
  //     this.AnimationRef.pulse()
  //   }
  // }

  componentDidUpdate() {
    const moving = isMoving(this.props.state, this.props.course.id)
    if (moving) {
      setTimeout(() => this.AnimationRef.pulse(), 50)
    }
  }

  render() {
    const { course, navigation, state } = this.props
    const { completion } = state
    const { id } = course
    const previousFinished = isPreviousFinished(state, id)
    const { card } = completion[id] || {}

    return (
      <TouchableOrView visible={previousFinished} navigation={navigation} id={id}>
        <Animatable.View ref={ref => this.AnimationRef = ref} style={{ borderRadius: 10, backgroundColor: 'white', flex: 1 }}>
          <View style={{ padding: 12, flex: 1 }}>
            <RoundedImage size={60} source={course.data.picture} borderWidth={1}/>
          </View>
          <Text style={{ fontSize: 16, paddingRight: 12, paddingLeft: 12, fontWeight: '500' }}>{course.data.title}</Text>
          <ProgressionBar cards={course.cards} completion={card || -1}/>
        </Animatable.View>
        <LockOverlay visible={!previousFinished}/>
      </TouchableOrView>
    )
  }
}

const courseView = (state, navigation) => course => (
  <CourseCardOverview
    course={course}
    key={course.id}
    navigation={navigation}
    state={state}
  />
)

const TouchableOrViewIronhack = ({ children, visible, navigation }) => {
  const style_ = { width: '40%', margin: 12 }
  if (visible) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('JoinPage') }
        style={style_}>
        {children}
      </TouchableOpacity>
    )
  } else {
    return (
      <View style={style_}>
        {children}
      </View>
    )
  }
}

class JoinIronhack extends React.Component {
  constructor(props) {
    super(props)
    this.AnimationRef
  }

  componentDidUpdate() {
    const { completion } = this.props
    const visible = ((completion || {})['course-5'] || {}).isCompleted
    const moving = visible !== null && visible !== undefined
    if (moving) {
      setTimeout(() => this.AnimationRef.pulse(), 50)
    }
  }

  render() {
    const { completion, navigation } = this.props
    const visible = ((completion || {})['course-5'] || {}).isCompleted
    const isVisible = visible !== null && visible !== undefined
    return (
      <TouchableOrViewIronhack visible={isVisible} navigation={navigation}>
        <Animatable.View ref={ref => this.AnimationRef = ref} style={{ borderRadius: 10, backgroundColor: 'white', flex: 1 }}>
          <View style={{ padding: 12, flex: 1 }}>
            <RoundedImage size={60} source={require('./6.jpg')} borderWidth={1}/>
          </View>
          <Text style={{ fontSize: 16, paddingRight: 12, paddingLeft: 12, fontWeight: '500' }}>Continue your Journey at Ironhack</Text>
          <View style={{
            height: 5,
            margin: 12,
          }}/>
        </Animatable.View>
        <LockOverlay visible={!isVisible}/>
      </TouchableOrViewIronhack>
    )
  }
}

const CoursesCards = ({ state, navigation }) => {
  const courses = (state.courses || []).map(courseView(state, navigation))
  return (
    <SafeArea style={{ backgroundColor: coursesBackground }} paddingBottom={0}>
      <View style={{ backgroundColor: coursesBackground, flex: 1 }}>
        <Text style={[ styles.heading.huge ]}>My Design Thinking Journey</Text>
        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            ...courses,
            <JoinIronhack completion={state.completion} navigation={navigation} key='final'/>
          ]}
        </ScrollView>
      </View>
    </SafeArea>
  )
}

export default connect(state => ({ state }))(CoursesCards)
