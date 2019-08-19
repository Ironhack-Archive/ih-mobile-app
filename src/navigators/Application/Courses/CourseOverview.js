import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

import { resetChaptersCompletion } from '../../../store/actions'
import {
  coursesBackground,
  freshGreen,
  beautifulGrey,
  darkPaleGrey,
  paleGrey,
  brightLightBlue,
  darkBlueGrey,
} from '../../styles/colors'
import styles from '../../styles'
import ShadowedButton from '../../styles/ShadowedButton'
import NotFound from '../NotFound'
import SafeArea from '../../styles/SafeArea'
import { FullButton } from '../common'

const overviewWrapper = {
  width: '100%',
  flex: 1,
  backgroundColor: 'white',
  borderRadius: 10,
}

const roundedTopView = {
  flex: 3,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  overflow: 'hidden'
}

const badgeStyle = {
  backgroundColor: freshGreen,
  textAlign: 'center',
  borderRadius: 10,
  paddingTop: 3,
  paddingBottom: 3,
  paddingRight: 12,
  paddingLeft: 12,
}

const mapDispatchToProps = dispatch => ({
  resetChapterCourseCompletion: (completion = {}, courseLength, courseId) => {
    const course = completion[courseId]
    if (course && course.isCompleted && course.card === courseLength + 1) {
      dispatch(resetChaptersCompletion(courseId))
    }
  }
})

const Icons = ({ iconName, number, label }) => (
  <View style={{ alignItems: 'center' }}>
    <Ionicons name={iconName} size={35} color={beautifulGrey}/>
    <Text style={{ fontSize: 28 }}>{number}</Text>
    <Text style={{ fontSize: 20, color: darkPaleGrey }}>{label}</Text>
  </View>
)

const computeNumberOfExercises = course => {
  return course.cards.reduce((totalExercises, card) => {
    return totalExercises + (card.metatype === 'quizz' ? 1 : 0)
  }, 0)
}

const IconSection = ({ course }) => {
  const numberOfExercises = computeNumberOfExercises(course)
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      flex: 1
    }}>
      <Icons
        iconName='md-book'
        number={course.data.numberConcepts || 0}
        label='Concepts'
      />
      <Icons
        iconName='md-time'
        number={course.data.duration || 0}
        label='Minutes'
      />
      <Icons
        iconName='md-star-outline'
        number={numberOfExercises}
        label={numberOfExercises > 1 ? 'Exercises' : 'Exercise'}
      />
    </View>
  )
}

const DisplayText = ({ category }) => {
  if (category) {
    return (
      <View style={badgeStyle}>
        <Text style={{ color: 'white' }}>{category}</Text>
      </View>
    )
  } else {
    return null
  }
}

const Categories = ({ course }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
    <DisplayText category={course.data.categories[0]}/>
  </View>
)

const Title = ({ course }) => (
  <Text style={[
    styles.heading.head,
    { paddingTop: 36, paddingBottom: 24, fontSize: 28 }
  ]}>
    {course.data.title}
  </Text>
)

const Banner = ({ course, resizeMode }) => (
  <Image
    source={course.data.picture}
    style={styles.image.responsive}
    resizeMode={resizeMode}
  />
)

const CourseOverviewContent = ({ course }) => (
  <View style={[ overviewWrapper ]}>
    <View style={roundedTopView}>
      <Banner course={course}/>
    </View>
    <View style={{ flex: 7, paddingLeft: 12, paddingRight: 12 }}>
      <Title course={course}/>
      <Categories course={course}/>
      <IconSection course={course}/>
    </View>
  </View>
)

const ClickCourseContent = ({ navigation, id }) => (
  <TouchableOpacity onPress={() => navigation.navigate('CourseDescription', { id })}>
    <Text style={{ color: darkPaleGrey, fontWeight: '500', fontSize: 14 }}>
      Click to see course content
    </Text>
  </TouchableOpacity>
)

const CallToAction = connect(({ completion }) => ({ completion }), mapDispatchToProps)(({ course, completion, navigation, id, resetChapterCourseCompletion }) => (
  <View style={{
    bottom: 20,
    backgroundColor: 'white',
    borderRadius: 35
  }}>
    <ShadowedButton round onPress={() => {
      if (completion && completion[course.id] && completion[course.id].isCompleted && completion[course.id].card === course.cards.length + 1) {
        resetChapterCourseCompletion(completion, course.cards.length, id)
        navigation.navigate('CourseCard', { id })
      } else {
        if (completion && completion[course.id] && completion[course.id].card === course.cards.length + 1) {
          navigation.navigate('ExerciseCard', { id })
        } else {
          navigation.navigate('CourseCard', { id })
        }
      }
    }}>
      <Ionicons name='md-rocket' size={35}/>
    </ShadowedButton>
  </View>
))

const courseOverviewStyle = [
  { backgroundColor: coursesBackground },
  styles.content.center,
  {
    justifyContent: 'space-around',
    padding: 24,
  }
]

const Overview = ({ courses, navigation }) => {
  const id = navigation.getParam('id', null)
  if (id) {
    const course = courses.find(course => course.id === id)
    if (course) {
      return (
        <SafeArea style={{ backgroundColor: coursesBackground }} paddingBottom={0}>
          <View style={courseOverviewStyle}>
            <CourseOverviewContent course={course}/>
            <CallToAction navigation={navigation} id={id} course={course}/>
            {/* <ClickCourseContent navigation={navigation} id={id}/> */}
          </View>
        </SafeArea>
      )
    } else {
      return <NotFound navigation={navigation}/>
    }
  } else {
    return <NotFound navigation={navigation}/>
  }
}

const mapStateToOverviewProps = ({ courses }) => ({
  courses
})

const CourseOverview = connect(mapStateToOverviewProps)(Overview)

const Divider = () => (
  <View style={{ paddingTop: 18, paddingBottom: 18, paddingRight: 24, paddingLeft: 24 }}>
    <View style={{ borderBottomColor: paleGrey, borderBottomWidth: 1 }}/>
  </View>
)

const DescriptionBanner = ({ course }) => (
  <View style={{ height: 120, width: '100%' }}>
    <Banner course={course} resizeMode='cover'/>
  </View>
)

const completionStatusStyle = {
  textAlign: 'center',
  fontWeight: '500',
  fontSize: 18,
  color: brightLightBlue,
}

const CompletionStatus = ({ course, completion }) => {
  const complete = completion ? completion[course.id] : null
  if (complete && complete.isCompleted) {
    return <Text style={completionStatusStyle}>Completed</Text>
  } else {
    return <Text style={completionStatusStyle}>Not Completed Yet</Text>
  }
}

const descriptionWrapper = {
  flexDirection: 'row',
  padding: 18,
}

const descriptionIndex = {
  fontSize: 18,
  paddingRight: 24,
  color: darkPaleGrey,
}

const descriptionTitle = {
  fontWeight: 'bold',
  fontSize: 18,
  paddingBottom: 6,
}

const descriptionSubTitle = {
  fontSize: 16,
  color: darkBlueGrey,
  paddingBottom: 6,
}

const descriptionCardsNumber = {
  fontSize: 14,
  color: beautifulGrey,
}

const CardsDescription = ({ course }) => {
  return course.cards.map(({ cards, subTitle, title, isCompleted }, index) => {
    const length = cards.length
    const plural = length === 0 || length === 1 ? 'card' : 'cards'
    return (
      <View style={descriptionWrapper} key={index}>
        <Text style={descriptionIndex}>{index + 1}</Text>
        <View>
          <Text style={descriptionTitle}>{title}</Text>
          <Text style={descriptionSubTitle}>{subTitle}</Text>
          <Text style={descriptionCardsNumber}>{`${cards.length} ${plural}`}</Text>
        </View>
      </View>
    )
  })
}

const DescriptionContentSection = ({ index, title, subTitle, subSubTitle }) => (
  <View style={descriptionWrapper}>
    <Text style={descriptionIndex}>{index}</Text>
    <View>
      <Text style={descriptionTitle}>{title}</Text>
      <Text style={descriptionSubTitle}>{subTitle}</Text>
      <Text style={descriptionCardsNumber}>{subSubTitle}</Text>
    </View>
  </View>
)

const DescriptionContent = ({ course, completion }) => (
  <ScrollView>
    <Title course={course}/>
    <Categories course={course}/>
    <Divider/>
    <CompletionStatus course={course} completion={completion}/>
    <Divider/>
    <DescriptionContentSection
      index={1}
      title='Introduction'
      subTitle='About this course and overview'
      subSubTitle=''
    />
    <DescriptionContentSection
      index={2}
      title={course.data.description.title}
      subTitle={course.data.description.subTitle}
      subSubTitle={`${course.cards.length} cards`}
    />
    <DescriptionContentSection
      index={3}
      title={course.data.exerciseDescription.title}
      subTitle={course.data.exerciseDescription.subTitle}
      subSubTitle={course.data.exerciseDescription.subSubTitle}
    />
    <View style={{ paddingBottom: 36 }}/>
  </ScrollView>
)

const Description = ({ navigation, courses, completion }) => {
  const id = navigation.getParam('id', null)
  if (id) {
    const course = courses.find(course => course.id === id)
    if (course) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle='light-content'/>
          <View style={{ flex: 1 }}>
            <DescriptionBanner course={course}/>
            <DescriptionContent course={course} completion={completion}/>
          </View>
          <FullButton
            onPress={() => navigation.navigate('CourseCard', { id })}
            content='Begin the course!'
          />
        </View>
      )
    } else {
      return <NotFound navigation={navigation}/>
    }
  } else {
    return <NotFound navigation={navigation}/>
  }
}

const mapStateToDeclarationProps = ({ courses, completion }) => ({ courses, completion })

const CourseDescription = connect(mapStateToDeclarationProps)(Description)

export default createStackNavigator({
  CourseOverview,
  CourseDescription,
}, {
  mode: 'modal',
  headerMode: 'none',
  initialRouteName: 'CourseOverview',
})
