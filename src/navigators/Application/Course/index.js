import React from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Dimensions,
  Share,
  Alert,
  findNodeHandle,
  Platform,
} from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { Constants, LinearGradient } from 'expo'
import ConfettiView from './Confetti'
import * as Animatable from 'react-native-animatable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Swiper from './Swiper'

import PicturesDrop from './PicturesDrop'
import { updateCompletionCard, updateChapterAsCompleted } from '../../../store/actions'
import styles from '../../styles'
import SafeArea, { isIPhoneRounded } from '../../styles/SafeArea'
import {
  brightLightBlue,
  darkPaleGrey,
  paleGrey,
  textGrey,
  clearBrightLightBlue
} from '../../styles/colors'
import ShadowedButton from '../../styles/ShadowedButton'
import NotFound from '../NotFound'
import { FullButton } from '../common'
import sad1 from './images/sad/1.gif'
import sad2 from './images/sad/2.gif'
import sad3 from './images/sad/3.gif'
import sad4 from './images/sad/4.gif'
import sad5 from './images/sad/5.gif'
import sad6 from './images/sad/6.gif'
import sad7 from './images/sad/7.gif'
import happy1 from './images/happy/1.gif'
import happy2 from './images/happy/2.gif'
import happy3 from './images/happy/3.gif'
import happy4 from './images/happy/4.gif'
import happy5 from './images/happy/5.gif'
import happy6 from './images/happy/6.gif'
import happy7 from './images/happy/7.gif'
import thumbsUp from './10.png'
import twoExercises from './9.png'
import champaign from './8.png'

const phoneRounded = isIPhoneRounded()

const mapStateToCourseProps = ({ courses, completion, actualExercise, keyboardVisible }) => ({ courses, completion, actualExercise, keyboardVisible })

const mapDispatchToProps = dispatch => ({
  updateCompletionCard: courseId => cardIndex => {
    dispatch(updateCompletionCard(courseId, cardIndex))
  },
  markChapterAsCompleted: (courseId) => {
    dispatch(updateChapterAsCompleted(courseId))
  },
  updateState: state => {
    dispatch({
      type: 'UPDATE_ACTUAL_EXERCISE',
      value: state,
    })
  },
  updateExerciseCompletion: (id, state, navigation) => {
    dispatch({
      type: 'UPDATE_EXERCISE_COMPLETION',
      courseId: id,
      state,
      navigation,
    })
  },
  updateBadge: badgeName => {
    dispatch({
      type: 'UPDATE_BADGE',
      badgeName,
    })
  },
})

const FullScreenGradient = () => (
  <LinearGradient
    colors={[ 'black', 'transparent' ]}
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '10%',
      zIndex: 1000,
    }}
  />
)

const BackArrow = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={{
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 1000,
    }}
  >
    <Ionicons name='ios-arrow-round-back' size={50} color='white'/>
  </TouchableOpacity>
)

const ImageWithFilter = ({ picture, color }) => (
  <ImageBackground
    source={picture}
    style={{ height: 250, width: '100%' }}
    resizeMode='cover'
  >
    <View
      style={{
        padding: 12,
        backgroundColor: color,
        flex: 1
      }}
    />
  </ImageBackground>
)

const introductionHeading = {
  fontSize: 30,
  // fontWeight: 'bold',
  paddingBottom: 24,
  fontFamily: 'Roboto Slab Bold',
}

const introductionBody = {
  fontSize: 18,
  lineHeight: 24
}

const IntroductionContent = ({ picture, content }) => (
  <ScrollView>
    <View style={{ padding: 12 }}/>
    <ImageWithFilter picture={picture} color='rgba(0, 0, 0, 0.0)'/>
    <View style={{ padding: 36 }}>
      <Text style={introductionHeading}>Introduction</Text>
      <Text style={introductionBody}>{content}</Text>
    </View>
  </ScrollView>
)

const Introduction = connect(null, mapDispatchToProps)((props) => {
  const { course, picture, onPress } = props
  const phoneRounded = isIPhoneRounded()
  return (
    <SafeArea style={{ flex: 1 }} paddingBottom={0}>
      <StatusBar barStyle='light-content'/>
      {/* <FullScreenGradient/> */}
      <IntroductionContent picture={picture} content={course.introduction}/>
      <FullButton
        style={{ paddingBottom: phoneRounded ? 32 : undefined, backgroundColor: brightLightBlue }}
        onPress={onPress}
        content='Got it!'
      />
    </SafeArea>
  )
})

const textContentStyle = {
  fontSize: Platform.OS === 'ios' ? 20 : 16,
  lineHeight: 34,
  paddingTop: 24,
  paddingBottom: 24,
  paddingRight: 48,
  paddingLeft: 48,
}

const PictureContent = ({ source }) => (
  <Image
    source={source}
    style={[ styles.image.responsive, { maxHeight: '40%' }]}
    resizeMode='contain'
  />
)

const TextContent = ({ children }) => (
  <Text style={textContentStyle}>
    {children}
  </Text>
)

const PictureOrText = ({ type, value }) => {
  switch(type) {
    case 'picture': return (<PictureContent source={value}/>)
    case 'content': return (<TextContent>{value}</TextContent>)
    default: return null
  }
}

const Content = ({ content }) => (
  content.map(({ type, value }, index) => (
    <PictureOrText key={index} type={type} value={value}/>
  ))
)

const quizzCardTextStyle = active => ({
  color: active ? brightLightBlue : textGrey,
  paddingTop: 12,
  paddingBottom: 12,
  fontSize: 12,
  // fontWeight: '600',
  textAlign: 'center',
  // fontFamily: ,
})

const borderInsideStyle = active => ({
  flex: 1,
  padding: 6,
  backgroundColor: 'white',
  borderRadius: 10,
  shadowColor: active ? 'transparent' : "#777",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  margin: 12,
  borderColor: active ? brightLightBlue : 'transparent',
  borderWidth: 4
})

const quizzQuestion = {
  paddingRight: 48,
  paddingLeft: 48,
  // paddingTop: 48,
  fontSize: 30,
  lineHeight: 36,
  // fontWeight: 'bold',
  fontFamily: 'Roboto Slab Bold',
}

const quizzHint = {
  paddingRight: 48,
  paddingLeft: 48,
  paddingTop: 12,
  fontFamily: 'Roboto Slab',
  fontSize: 18,
}

const ExerciseTextInput = connect(({ actualExercise }) => ({ actualExercise }), mapDispatchToProps)(class extends React.Component {
  componentDidMount() {
    this.props.updateState({})
  }

  render() {
    const { timer, actualExercise, updateState } = this.props
    const { height } = Dimensions.get('window')
    const size = timer ? height * 0.2 : height * 0.3
    const timerView = timer ? <Timer init={timer} startColor={brightLightBlue} stopColor={darkPaleGrey}/> : null
    return (
      <View style={styles.container.full}>
        {timerView}
        {/* <View style={[
          { marginHorizontal: 24, padding: 12, backgroundColor: 'red', borderRadius: 10 },
          styles.shadow.hard,
        ]}> */}
        <View style={[
          { paddingHorizontal: 24 },
          styles.shadow.light
        ]}>
          <TextInput
            placeholder='How might we…'
            multiline={true}
            style={{ fontSize: 16, height: size, padding: 6, borderRadius: 10, borderColor: '#efefef', borderWidth: 1 }}
            elevation={2}
            value={(actualExercise || {}).text || ''}
            onChangeText={content => updateState({ text: content })}
            onFocus={(event) => {
              this.props.keyboardRef.props.scrollToFocusedInput(findNodeHandle(event.target))
            }}
          />
        </View>
        {/* </View> */}
      </View>
    )
  }
})

const ExerciseLink = ({ label, placeholder, value, onChangeText }) => (
  <View style={{ marginHorizontal: 24, marginVertical: 9 }}>
    <Text style={{ paddingBottom: 3, fontSize: 12 }}>{label}</Text>
    <TextInput
      elevation={2}
      placeholder={placeholder}
      style={[
        {
          padding: 12,
          backgroundColor: 'white',
          borderRadius: 10,
        },
        styles.shadow.light,
      ]}
      onChangeText={onChangeText}
      value={value}
    />
  </View>
)

const ExerciseLinks = connect(({ actualExercise }) => ({ actualExercise }), mapDispatchToProps)(class extends React.Component {
  componentDidMount() {
    this.props.updateState({})
  }

  render() {
    const { timer, updateState, actualExercise } = this.props
    return (
      <View style={{ paddingVertical: 24 }}>
        {timer ? <Timer init={timer} startColor={brightLightBlue} stopColor={darkPaleGrey}/> : null}
        <ExerciseLink label='Link 1' value={(actualExercise || {}).link1 || ''} placeholder='https://' onChangeText={text => updateState({ ...actualExercise, link1: text })}/>
        <ExerciseLink label='Link 2' value={(actualExercise || {}).link2 || ''} placeholder='https://' onChangeText={text => updateState({ ...actualExercise, link2: text })}/>
        <ExerciseLink label='Link 3' value={(actualExercise || {}).link3 || ''} placeholder='https://' onChangeText={text => updateState({ ...actualExercise, link3: text })}/>
      </View>
    )
  }
})


const ExerciseResponse = ({ response, timer, keyboardRef }) => {
  switch(response) {
    case 'pictures': return <PicturesDrop timer={timer}/>
    case 'text': return <ExerciseTextInput timer={timer} keyboardRef={keyboardRef}/>
    case 'links': return <ExerciseLinks timer={timer}/>
    default: return null
  }
}

const isTwoExercisesInTheSameDay = (completion) => {
  if (completion.twoExercisesDone) {
    return false
  } else {
    const lastExerciseDid = completion.lastExerciseDid
    if (lastExerciseDid) {
      const now = Date.now()
      return Math.floor((now - lastExerciseDid) / 1000) < 86400
    } else {
      return false
    }
  }
}

const Exercise = connect(mapStateToCourseProps, mapDispatchToProps)(class extends React.Component {
  skipOrUpdateExercise = (skip, updateExercise, actualExercise) => {
    if (skip) {
      updateExercise()
    } else {
      const isActualExerciseNotEmpty = () => Object.keys(actualExercise).length !== 0
      if (actualExercise && isActualExerciseNotEmpty()) {
        updateExercise()
      }
    }
  }

  updateCourseExerciseCompletion = (id, state) => {
    this.props.updateExerciseCompletion(id, state, this.props.navigation)
  }

  onPress = ({ skip }) => {
    const { course, actualExercise, updateState, navigation, completion } = this.props
    const updateExercise = () => {
      this.updateCourseExerciseCompletion(course.id, skip ? 'skipped' : actualExercise)
      updateState(null)
      if (!skip && isTwoExercisesInTheSameDay(completion)) {
        navigation.navigate('BadgePage', { id: 'two-exercises', next: course.id })
      } else {
        navigation.navigate('CongratsPage', { id: course.id })
      }
    }
    return this.skipOrUpdateExercise(skip, updateExercise, actualExercise)
  }

  render() {
    const { exercise, navigation } = this.props
    const { title, explanations, hints, response, timer } = exercise
    return (
      <View style={{ flex: 1 }}>
        <Close navigation={navigation} style={{ position: 'relative' }} skip={() => this.onPress({ skip: true })}/>
        <KeyboardAwareScrollView
          enableOnAndroid
          contentContainerStyle={{ flexGrow: 1 }}
          innerRef={ref => {
            this.scroll = ref;
          }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 24 }}>
              <Text style={{ fontSize: 30, lineHeight: 40, fontFamily: 'Roboto Slab Bold' }}>Practical exercise: {title}</Text>
              <View style={{ padding: 12 }}/>
              <Text style={{ fontSize: 14, color: darkPaleGrey, lineHeight: 24, fontStyle: 'italic' }}>{hints}</Text>
            </View>
            <ExerciseResponse response={response} timer={timer} keyboardRef={this.scroll}/>
          </View>
        </TouchableWithoutFeedback>
        {Platform.OS !== 'ios' && (response === 'text' || response === 'links') ? <View style={{ paddingTop: this.props.keyboardVisible ? Dimensions.get('window').height * 0.3 : 0 }}/> : null}
      </KeyboardAwareScrollView>
      <FullButton
        style={{ paddingBottom: phoneRounded ? 32 : undefined, backgroundColor: brightLightBlue }}
        onPress={() => this.onPress({ skip: false })}
        content='Submit'
      />
      </View>
    )
  }
})

const selectRandomSadGif = () => {
  const index = Math.floor(Math.random() * 8)
  switch(index) {
    case 1: return sad1
    case 2: return sad2
    case 3: return sad3
    case 4: return sad4
    case 5: return sad5
    case 6: return sad6
    case 7: return sad7
    default: return sad1
  }
}

const selectRandomHappyGif = () => {
  const index = Math.floor(Math.random() * 8)
  switch(index) {
    case 1: return happy1
    case 2: return happy2
    case 3: return happy3
    case 4: return happy4
    case 5: return happy5
    case 6: return happy6
    case 7: return happy7
    default: return happy1
  }
}

const failedTitleStyle = {
  color: brightLightBlue,
  fontSize: 48,
  textAlign: 'center',
  // fontWeight: '600',
  fontFamily: 'Roboto Slab Bold'
}

const failedContentStyle = {
  color: textGrey,
  fontSize: 17,
  textAlign: 'center',
  paddingRight: 36,
  paddingLeft: 36,
  paddingTop: 12
}

const ContentQuizzOrExercise = ({ course, card, navigation, selectCard, state, nextIndex, forwardSwiper, backwardSwiper }) => {
  const { metatype, metavalue } = card
  switch(metatype) {
    case 'content': return <Content content={metavalue}/>
    case 'quizz': {
      const { answers, question, questions, right, wrong } = metavalue
      return (
        <Quizz
          course={course}
          answers={answers}
          question={question}
          questions={questions}
          selectCard={selectCard}
          right={right}
          wrong={wrong}
          state={state}
          nextIndex={nextIndex}
          forwardSwiper={forwardSwiper}
          backwardSwiper={backwardSwiper}
        />
      )
    }
    case 'exercise': return <Exercise exercise={metavalue} navigation={navigation} course={course} navigation={navigation}/>
    default: return <NotFound navigation={navigation}/>
  }
}

const FailOrSuccessQuizz = ({ content, gif, title, onNext, onBack }) => (
  <View style={{ flex: 1, backgroundColor: paleGrey }}>
    <View style={{ flex: 1, maxHeight: '40%' }}>
      <Image
        style={styles.image.responsive}
        resizeMode='cover'
        source={gif}
      />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={failedTitleStyle}>{title}</Text>
      <Text style={failedContentStyle}>{content}</Text>
    </View>
    <View style={{ flexDirection: 'row', width: '100%' }}>
      <FullButton
        containerStyle={{ width: Dimensions.get('window').width / 2 }}
        style={{ paddingBottom: phoneRounded ? 32 : undefined, backgroundColor: '#aaa' }}
        backgroundColor='#aaa'
        onPress={onBack}
        content='Back'
      />
      <FullButton
        containerStyle={{ width: Dimensions.get('window').width / 2 }}
        style={{ paddingBottom: phoneRounded ? 32 : undefined, backgroundColor: brightLightBlue }}
        onPress={onNext}
        content='Got it!'
      />
    </View>
  </View>
)

const FailedQuizz = ({ content, onNext, onBack }) => (
  <FailOrSuccessQuizz
    content={content}
    gif={selectRandomSadGif()}
    title={'Hum…'}
    onBack={onBack}
    onNext={onNext}
  />
)

const SuccessfulQuizz = ({ content, onNext, onBack }) => (
  <FailOrSuccessQuizz
    content={content}
    gif={selectRandomHappyGif()}
    title={'You win!'}
    onBack={onBack}
    onNext={onNext}
  />
)

const Quizz = connect(null, mapDispatchToProps)(class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedAnswers: [],
      page: 'question'
    }
  }

  toPage = (page) => {
    this.setState({
      ...this.state,
      page,
    })
  }

  selectCard = (index) => {
    const { selectedAnswers } = this.state
    const newAnswers = addOrRemoveIndex(index, selectedAnswers)
    this.setState({
      ...this.state,
      selectedAnswers: newAnswers
    })
  }

  QuizzCard = ({ index }) => {
    const question = this.props.questions[index]
    const active = this.state.selectedAnswers.includes(index)
    const invisibleImage = false
    return (
      <TouchableWithoutFeedback onPress={() => this.selectCard(index)}>
        <View elevation={2} style={[
          borderInsideStyle(active),
          invisibleImage ? { alignItems: 'center', justifyContent: 'center' } : null
        ]}>
          {invisibleImage
            ? null
            : (
              <Image
                source={question.picture}
                style={[ styles.image.responsive, { borderTopRightRadius: 10, borderTopLeftRadius: 10 } ]}
                resizeMode='cover'
              />
            )
          }
          <Text style={quizzCardTextStyle(active || false)}>{question.value}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  QuizzCards = () => (
    <View style={{ flex: 1, padding: 18 }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <this.QuizzCard index={0}/>
        <this.QuizzCard index={1}/>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <this.QuizzCard index={2}/>
        <this.QuizzCard index={3}/>
      </View>
    </View>
  )

  forward = () => {
    switch(this.state.page) {
      case 'question': return this.toPage('pictures')
      case 'pictures': return this.toPage('validation')
      case 'validation': {
        setTimeout(() => {
          this.setState({
            selectedAnswers: [],
            page: 'question',
          })
        }, 500)
        this.props.forwardSwiper()
      }
    }
  }

  askIfSure = () => new Promise(resolve => {
    Alert.alert(
      'You’re leaving the quizz',
      'You really should try to answer the quizz by yourself. But if you want, you can go back. Do you really want to go back?',
      [
        { text: 'No!', onPress: () => resolve('NO') },
        { text: 'Yes!', onPress: () => resolve('OK') },
      ]
    )
  })

  backward = async () => {
    switch(this.state.page) {
      case 'question': {
        const response = await this.askIfSure()
        if (response === 'OK') {
          this.setState({
            selectedAnswers: [],
          })
          this.props.backwardSwiper()
        }
        break
      }
      case 'pictures': return this.toPage('question')
      case 'validation': return this.toPage('pictures')
    }
  }

  BackAndNext = ({ phoneRounded }) => (
    <View style={{ flexDirection: 'row', width: '100%' }}>
      <FullButton
        containerStyle={{ width: Dimensions.get('window').width / 2 }}
        style={{ paddingBottom: phoneRounded ? 32 : undefined, backgroundColor: '#aaa' }}
        backgroundColor='#aaa'
        onPress={this.backward}
        content='Back'
      />
      <FullButton
        containerStyle={{ width: Dimensions.get('window').width / 2 }}
        style={{ paddingBottom: phoneRounded ? 32 : undefined, backgroundColor: brightLightBlue }}
        onPress={this.forward}
        content='Got it!'
      />
    </View>
  )

  render() {
    const { answers, right, wrong } = this.props
    const phoneRounded = isIPhoneRounded()
    switch(this.state.page) {
      case 'question':
        return (
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={quizzQuestion}>{this.props.question}</Text>
              <Text style={quizzHint}>(Several Possible Answers)</Text>
            </View>
            <this.BackAndNext phoneRounded={phoneRounded}/>
          </View>
        )
      case 'pictures':
        return (
          <View style={{ flex: 1 }}>
            <this.QuizzCards/>
            <this.BackAndNext phoneRounded={phoneRounded}/>
          </View>
        )
      case 'validation': {
        const sortedAnswers = this.state.selectedAnswers.sort()
        if (answers.length === sortedAnswers.length && answers.sort().every((value, index) => sortedAnswers[index] === value)) {
          return (<SuccessfulQuizz content={right} onBack={this.backward} onNext={this.forward}/>)
        } else {
          return (<FailedQuizz content={wrong} onBack={this.backward} onNext={this.forward}/>)
        }
      }
    }
  }
})

const addOrRemoveIndex = (index, answers) => {
  if (answers.includes(index)) {
    return answers.filter(elem => elem !== index)
  } else {
    return [ ...answers, index ]
  }
}

const Card = connect(({ actualExercise }) => ({ actualExercise }), mapDispatchToProps)(class TT extends React.Component {
  render() {
    const { course, card, navigation, forwardSwiper, backwardSwiper } = this.props
    return (
      <View style={{ flex: 1, paddingTop: card.metatype === 'content' || card.metatype === 'quizz' ? 24 : undefined }}>
        <ContentQuizzOrExercise
          course={course}
          card={card}
          navigation={navigation}
          selectCard={this.selectCard}
          state={this.state}
          nextIndex={this.props.index + 1}
          forwardSwiper={forwardSwiper}
          backwardSwiper={backwardSwiper}
        />
      </View>
    )
  }
})

const BadgeOrGif = ({ badge }) => (
  <Image
    style={styles.image.responsive}
    source={badge}
    resizeMode='contain'
  />
)

const isCustomBadge = id => {
  switch(id) {
    case 'two-exercises': return twoExercises
    case 'shared': return thumbsUp
    case 'two-courses': return champaign
    default: return false
  }
}

const customContent = id => {
  switch(id) {
    case 'two-exercises': return 'You made two exercises the same day!'
    case 'shared': return 'You shared your realization with a friend!'
    case 'two-courses': return 'You went through two courses the same day!'
    default: return false
  }
}

const fetchIfTwoCoursesHasBeenAchievedTheSameDay = (completion, id) => {
  if (completion.twoCoursesDid) {
    return false
  } else {
    const keys = Object.keys(completion)
    const highestTimestamp = keys.reduce((acc, key) => {
      const { completionDate } = completion[key]
      if (completionDate && completionDate > acc) {
        return completionDate
      } else {
        return null
      }
    }, null)
    if (highestTimestamp) {
      return keys.reduce((acc, key) => {
        if (acc) {
          return true
        } else {
          const { completionDate } = completion[key]
          return completionDate && (Math.floor((highestTimestamp - completionDate) / 1000) < 86400)
        }
      }, false)
    } else {
      return false
    }
  }
}

const CongratsPageHelp = ({ courses, navigation, isFocused, updateBadge, completion }) => {
  const id = navigation.getParam('id', null)
  const next = navigation.getParam('next', null)
  const validateBadge = navigation.getParam('validateBadge', null)
  console.log(next)
  if (isFocused) {
    if (id) {
      const customBadge = isCustomBadge(id)
      if (customBadge) {
        return (
          <Congrats
            key={id}
            badge={customBadge}
            onPress={() => {
              if (validateBadge) {
                updateBadge(validateBadge)
              }
              if (next) {
                navigation.navigate('CongratsPage', { id: next })
              } else {
                navigation.navigate('Courses')
              }
            }}
            courseTitle={'Congratulations!'}
            content={customContent(id)}
          />
        )
      } else {
        const course = courses.find(course => course.id === id)
        if (course) {
          const isTwoCoursesTheSameDay = fetchIfTwoCoursesHasBeenAchievedTheSameDay(completion, id)
          return (
            <Congrats
              key={id}
              badge={course.data.badge}
              onPress={() => {
                if (isTwoCoursesTheSameDay) {
                  navigation.navigate('BadgePage', { id: 'two-courses', validateBadge: 'twoCoursesDid' })
                } else {
                  navigation.navigate('Courses')
                }
              }}
              courseTitle={course.data.title}
              content='You unlocked a new course!'
              navigation={navigation}
              courseId={id}
              completion={completion}
            />
          )
        } else {
          return <NotFound navigation={navigation}/>
        }
      }
    } else {
      return <NotFound navigation={navigation}/>
    }
  } else {
    return null
  }
}

const Congrats = ({ badge, onPress, courseTitle, content, navigation, courseId, completion }) => {
  const phoneRounded = isIPhoneRounded()
  return (
    <SafeArea style={{ backgroundColor: paleGrey }} paddingBottom={0}>
      <ConfettiView style={{ position: 'absolute' }} duration={4500}/>
      <StatusBar barStyle='dark-content'/>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 3 }}>
            <Animatable.View style={{ flex: 1, padding: 48 }} animation='pulse' iterationCount='infinite' duration={2000}>
              <BadgeOrGif badge={badge}/>
            </Animatable.View>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={{ textAlign: 'center', color: brightLightBlue, fontSize: 32, fontFamily: 'Roboto Slab Bold' }}>Congrats!</Text>
            <Text style={{ textAlign: 'center', color: brightLightBlue, fontSize: 16, fontFamily: 'Roboto Slab' }}>{content}</Text>
            <View style={{ padding: 24 }}/>
            <ShadowedButton
              onPress={onPress}
              textColor={brightLightBlue}
              backgroundColor='white'
              >
                Awesome!
              </ShadowedButton>
            </View>
          </View>
          <FullButton
            textColor={brightLightBlue}
            backgroundColor='white'
            content='Invite Friends'
            iconName='md-paper-plane'
            style={{ paddingBottom: phoneRounded ? 32 : undefined, backgroundColor: 'white' }}
            onPress={async () => {
              try {
                const result = await Share.share({ message: `Hey, I just finished the course ${courseTitle} on the intro to Design Thinking app, come learn with me the fundamentals of Design Thinking at https://initiation.ironhack.com!` })
                if (navigation && !completion.shared && result.action !== Share.dismissedAction) {
                  navigation.navigate('BadgePage', { id: 'shared', next: courseId, validateBadge: 'shared' })
                }
              } catch (error) {
                alert(error.message)
              }
            }}
          />
        </View>
    </SafeArea>
  )
}

const congratsOnPress = (markChapterAsCompleted, navigation, course) => () => {
  navigation.navigate('Courses')
  markChapterAsCompleted(course.id)
}

const t = () => (
  <CongratsPage
    onPress={congratsOnPress(markChapterAsCompleted, navigation, course)}
    courseTitle={course.data.title}
    badge={course.data.badge}
  />
)

const selectSafeAreaBackgroundColor = (card, validated, activeClose) => {
  if (card.metatype === 'exercise') {
    return clearBrightLightBlue
  } else if (card.metatype === 'quizz' && validated) {
    return paleGrey
  } else if (activeClose) {
    return 'white'
  } else {
    return paleGrey
  }
}

const renderCardOnPress = (isLastCard, completed, course, forwardSwiper, navigation, updateCompletionCard) => () => {
  if (isLastCard) {
    updateCompletionCard(course.id)(course.cards.length + 1)
    if (completed && completed.exercise) {
      navigation.navigate('CongratsPage', { id: course.id })
    } else {
      navigation.navigate('ExerciseCard', { id: course.id })
    }
  } else {
    forwardSwiper()
  }
}

const RenderCardHelp = ({
  index,
  card,
  course,
  navigation,
  forwardSwiper,
  backwardSwiper,
  backgroundColor,
  phoneRounded,
  completed,
  updateCompletionCard,
}) => {
  const isLastCard = index + 1 === course.cards.length
  return (
    <SafeArea style={{ backgroundColor }} paddingBottom={0}>
      <StatusBar barStyle='dark-content'/>
      <View style={{ paddingTop: completed && completed.card === course.cards.length + 1 ? undefined : 2 * standardPadding }}/>
      <Card
        course={course}
        navigation={navigation}
        card={card}
        index={index + 1}
        forwardSwiper={forwardSwiper}
        backwardSwiper={backwardSwiper}
      />
      {card.metatype === 'content'
        ? (<View>
            <Text style={{ textAlign: 'center', fontFamily: 'Roboto Slab Bold', fontSize: 16, paddingBottom: 24, color: 'rgba(0, 0, 0, 0.2)' }}>{course.data.title}</Text>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <FullButton
                containerStyle={{ width: Dimensions.get('window').width / 2 }}
                style={{ paddingBottom: phoneRounded ? 32 : undefined, backgroundColor: '#aaa' }}
                backgroundColor='#aaa'
                onPress={backwardSwiper}
                content='Back'
              />
              <FullButton
                containerStyle={{ width: Dimensions.get('window').width / 2 }}
                style={{ paddingBottom: phoneRounded ? 32 : undefined, backgroundColor: brightLightBlue }}
                onPress={renderCardOnPress(isLastCard, completed, course, forwardSwiper, navigation, updateCompletionCard)}
                content='Got it!'
              />
            </View>
          </View>
        )
        : null
      }

    </SafeArea>
  )
}

const RenderCard = (course, navigation, forwardSwiper, backwardSwiper, completion, updateCompletionCard) => (card, index) => {
  const activeClose = true
  const backgroundColor = selectSafeAreaBackgroundColor(card, true, activeClose)
  const phoneRounded = isIPhoneRounded()

  return (
    <RenderCardHelp
      key={index}
      course={course}
      navigation={navigation}
      forwardSwiper={forwardSwiper}
      backwardSwiper={backwardSwiper}
      activeClose={activeClose}
      backgroundColor={backgroundColor}
      phoneRounded={phoneRounded}
      index={index}
      card={card}
      completed={completion}
      updateCompletionCard={updateCompletionCard}
    />
  )
}

const standardPadding = 24

const closeStyle = (style) => {
  const phoneRounded = isIPhoneRounded()
  return {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingLeft: standardPadding,
    paddingRight: standardPadding,
    paddingTop: standardPadding,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1000000000,
    top: 0,
    left: 0,
    right: 0,
    ...style,
  }
}

const Close = ({ navigation, style, skip }) => (
  <View style={closeStyle(style)}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ flex: 1 }}>
      <Ionicons name='md-close' size={35} color={brightLightBlue}/>
    </TouchableOpacity>
    {skip
      ? <TouchableOpacity onPress={skip}>
          <Text style={{ color: brightLightBlue, fontSize: 14, fontWeight: '600' }}>Skip the exercise -></Text>
        </TouchableOpacity>
      : null
    }
  </View>
)

const isScrollEnabled = (course, index) => {
  if (index) {
    const card = course.cards[index - 1]
    if (card) {
      return card.metatype === 'content'
    } else {
      return true
    }
  } else {
    return true
  }
}

const ChapterCardsSwiper = connect(null, mapDispatchToProps)(class extends React.Component {
  forward = () => {
    this.swiper.scrollBy(1)
  }

  backward = () => {
    this.swiper.scrollBy(-1)
  }

  render() {
    const { updateCompletionCard, cardIndex, course, navigation, completed } = this.props
    return (
      <View style={{ flex: 1 }}>
        {/* <Close
          navigation={navigation}
          visible={true}
          style={{}}
        /> */}
        {/* <Text style={{ color: 'rgba(0, 0, 0, 0.2)', textAlign: 'center', backgroundColor: 'red' }}>
          {course.data.title}
        </Text> */}
        <Swiper
          key={course.id}
          ref={ref => this.swiper = ref}
          loop={false}
          onIndexChanged={index => {
            updateCompletionCard(course.id)(index)
          }}
          index={cardIndex}
          scrollEnabled={isScrollEnabled(course, cardIndex)}
          activeDotColor={brightLightBlue}
          onClosePress={() => navigation.goBack()}
          // title={course.data.title}
        >
          {[
            <Introduction
              key={-1}
              course={course}
              picture={course.data.picture}
              navigation={navigation}
              onPress={this.forward}
            />,
            ...course.cards.map(
              RenderCard(course, navigation, this.forward, this.backward, completed, updateCompletionCard)
            )
          ]}
        </Swiper>
      </View>
    )
  }
})

const CourseView = ({ navigation, courses, completion }) => {
  const id = navigation.getParam('id', null)
  if (id) {
    const course = courses.find(course => course.id === id)
    if (course) {
      const completed = completion[id] || {}
      const cardIndex = completed.card
      return (
        <ChapterCardsSwiper
          course={course}
          navigation={navigation}
          completed={completed}
          cardIndex={cardIndex}
        />
      )
    } else {
      return <NotFound navigation={navigation}/>
    }
  } else {
    return <NotFound navigation={navigation}/>
  }
}

const Exo = ({ navigation, completion, courses, updateCompletionCard }) => {
  const id = navigation.getParam('id', null)
  if (id) {
    const course = courses.find(course => course.id === id)
    if (course) {
      const completed = completion[id]
      const backgroundColor = 'white'
      return (
        <RenderCardHelp
          course={course}
          navigation={navigation}
          activeClose={true}
          backgroundColor={backgroundColor}
          phoneRounded={phoneRounded}
          card={course.exercise}
          completed={completed}
          updateCompletionCard={updateCompletionCard}
        />
      )
    } else {
      return <NotFound navigation={navigation}/>
    }
  } else {
    return <NotFound navigation={navigation}/>
  }
}

const CourseCard = connect(mapStateToCourseProps, mapDispatchToProps)(CourseView)

const ExerciseCard = connect(mapStateToCourseProps, mapDispatchToProps)(Exo)

const CongratsPage = connect(mapStateToCourseProps, mapDispatchToProps)(CongratsPageHelp)

export { CourseCard, ExerciseCard, CongratsPage }
