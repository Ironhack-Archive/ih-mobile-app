import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Switch,
  Image,
  Platform,
  AsyncStorage,
  ScrollView,
} from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import * as firebase from 'firebase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {
  coursesBackground,
  lightPeriwinkle,
  freshGreen,
  paleGrey,
  purple,
  red,
  clearDarkBlueGrey,
  darkBlueGrey,
  darkPaleGrey,
  textFieldBackground,
  brightLightBlue,
} from '../../styles/colors'
// import SafeArea from '../../styles/SafeAserea'
import SafeArea from '../../styles/SafeArea'
import styles from '../../styles'
import ShadowedButton from '../../styles/ShadowedButton'
import * as actions from '../../../store/actions'
import thumbsUp from '../Course/10.png'
import twoExercises from '../Course/9.png'
import champaign from '../Course/8.png'

const mapStateToProps = state => ({
  userInfos: state.userInfos,
  completion: state.completion,
  courses: state.courses,
  keyboardVisible: state.keyboardVisible,
})

const mapDispatchToProps = dispatch => ({
  updateUserBio: bio => dispatch(actions.updateUserBio(bio)),
  updateEmailNotifications: value => dispatch({ type: 'UPDATE_EMAIL_NOTIFICATIONS', value })
})

const mainPadding = 24

const optionIconStyle = {
  borderColor: clearDarkBlueGrey,
  borderWidth: 1,
  borderRadius: 10,
  width: 30,
  height: 30,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 16,
}

const OptionIcon = ({ icon, color }) => (
  <View style={optionIconStyle}>
    <Ionicons name={icon} size={20} color={color}/>
  </View>
)

const profileOptionStyle = borderWidth => ({
  flexDirection: 'row',
  paddingTop: 12,
  paddingBottom: 12,
  paddingRight: mainPadding,
  paddingLeft: mainPadding,
  alignItems: 'center',
  borderBottomColor: clearDarkBlueGrey,
  borderBottomWidth: borderWidth,
})

const editLoginDetailsStyle = {
  textTransform: 'uppercase',
  color: darkPaleGrey,
  paddingLeft: mainPadding,
  paddingRight: mainPadding,
  paddingTop: 24,
  paddingBottom: 12,
  fontSize: 14,
  fontWeight: '600',
}

const badgeSize = 60

const selectExplanationText = id => {
  switch(id) {
    case 'course-1': return 'Finished the first course'
    case 'course-2': return 'Finished the second course'
    case 'course-3': return 'Finished the third course'
    case 'course-4': return 'Finished the fourth course'
    case 'course-5': return 'Finished the fifth course'
    case 'thumbs-up': return 'Invited a friend'
    case 'two-courses': return 'Completed two courses in the same day'
    case 'two-exercises': return 'Completed two exercises in the same day'
  }
}

const RenderBadgeAndExplanations = ({ badge, id, overlay }) => (
  <View style={{ flexDirection: 'row', paddingHorizontal: 24, paddingVertical: 6, alignItems: 'center' }}>
    <View style={{ paddingRight: 12 }}><Badge source={badge} overlay={overlay}/></View>
    <Text style={{ fontFamily: 'Roboto Slab', fontSize: 16, flexWrap: 'wrap', flex: 1 }}>{selectExplanationText(id)}</Text>
  </View>
)

const BadgePage = connect(mapStateToProps)(({ navigation, courses, completion }) => (
  <ScrollView>
    <View style={{ paddingVertical: 24 }}>
      {courses.map(course => <RenderBadgeAndExplanations overlay={!(completion[course.id] || {}).isCompleted} badge={course.data.badge} id={course.id} key={course.id}/>)}
      <RenderBadgeAndExplanations overlay={!completion.shared} badge={thumbsUp} id='thumbs-up' key='thumbs-up'/>
      <RenderBadgeAndExplanations overlay={!completion.twoExercisesDone} badge={twoExercises} id='two-exercises' key='two-exercises'/>
      <RenderBadgeAndExplanations overlay={!completion.twoCoursesDid} badge={champaign} id='two-courses' key='two-courses'/>
    </View>
  </ScrollView>
))

const Badge = ({ source, overlay }) => (
  <View>
    <Image
      source={source}
      style={{ width: badgeSize, height: badgeSize }}
      resizeMode='contain'
    />
    <View style={{
      position: 'absolute',
      backgroundColor: overlay ? 'rgba(0, 0, 0, 0.7)' : 'transparent',
      height: '100%',
      width: '100%',
      borderRadius: badgeSize / 2
    }}/>
  </View>
)

const displayBadge = completion => (course, index) => {
  if ((completion[course.id] || {}).isCompleted) {
    return (<Badge source={course.data.badge} key={index}/>)
  } else {
    return (<Badge source={course.data.badge} overlay key={index}/>)
  }
}

const BadgeSection = ({ courses, completion, navigation }) => (
  <TouchableWithoutFeedback onPress={() => navigation.navigate('BadgePage')}>
    <View style={{ marginTop: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'nowrap' }}>
        {courses.slice(0, 4).map(displayBadge(completion))}
      </View>
      <View style={{ padding: 6 }}/>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'nowrap' }}>
        {[
          ...courses.slice(4).map(displayBadge(completion)),
          <Badge source={thumbsUp} key='tumbsUp' overlay={!completion.shared}/>,
          <Badge source={champaign} key='champaign' overlay={!completion.twoCoursesDid}/>,
          <Badge source={twoExercises} key='twoExercises' overlay={!completion.twoExercisesDone}/>,
        ]}
      </View>
    </View>
  </TouchableWithoutFeedback>
)

const selectDoneCourses = (completion) => {
  return Object.keys(completion).reduce((acc, val) => {
    if (completion[val].isCompleted) {
      return acc + 1
    } else {
      return acc
    }
  }, 0)
}

const selectNumberOfOtherBadges = completion => {
  const shared = completion.shared ? 1 : 0
  const exercises = completion.twoExercisesDone ? 1 : 0
  const courses = completion.twoCoursesDid ? 1 : 0
  return shared + exercises + courses
}

const UserPresentation = ({ name, courses, completion, navigation }) => {
  const coursesNumber = selectDoneCourses(completion) + selectNumberOfOtherBadges(completion)
  return (
    <View style={{ paddingTop: 36, paddingHorizontal: mainPadding }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>{name}</Text>
      <Text style={{ fontSize: 20, color: darkPaleGrey }}>
        {`${coursesNumber} ${coursesNumber <= 1 ? 'badge' : 'badges'} unlocked!`}
      </Text>
    </View>
  )
}

const presentationRowStyle = {
  flexDirection: 'row',
  paddingLeft: mainPadding,
  paddingRight: mainPadding,
  alignItems: 'center',
}

const marginHorizontal = margin => ({
  marginRight: margin,
  marginLeft: margin
})

const marginVertical = margin => ({
  marginTop: 10,
  marginBottom: 10
})

const staticTextFieldStyle = {
  borderRadius: 10,
  backgroundColor: textFieldBackground,
  color: darkBlueGrey
}

const textFieldStyle = [
  marginVertical(10),
  marginHorizontal(mainPadding),
  { padding: 16 },
  staticTextFieldStyle
]

const TextArea = ({ placeholder, value, onChangeText, secureTextEntry, textContentType, keyboardType }) => (
  <TextInput
    multiline={true}
    numberOfLines={10}
    clearButtonMode='always'
    elevation={2}
    placeholder={placeholder}
    style={[ textFieldStyle, styles.shadow.light ]}
    value={value}
    onChangeText={onChangeText}
    textContentType={textContentType}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
  />
)

const TextField = ({ placeholder, value, onChangeText, secureTextEntry, textContentType, keyboardType }) => (
  <TextInput
    clearButtonMode='always'
    elevation={1}
    placeholder={placeholder}
    style={[ textFieldStyle, styles.shadow.light ]}
    value={value}
    onChangeText={onChangeText}
    textContentType={textContentType}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
  />
)


const presentationRowTextStyle = {
  textTransform: 'uppercase',
  flex: 1,
  color: darkPaleGrey,
  fontSize: 14,
  fontWeight: '600',
}

const InformationRow = ({ content, children }) => (
  <View style={presentationRowStyle}>
    <Text style={presentationRowTextStyle}>
      {content}
    </Text>
    {children}
  </View>
)

const FullWidthOption = ({ noFeedback, icon, color, content, borderWidth, onPress, children }) => {
  const inside = (
    <View style={profileOptionStyle(borderWidth)}>
      {icon ? <OptionIcon icon={icon} color={color}/> : null }
      <Text style={{ flex: 1, fontSize: 16, color: darkBlueGrey }}>{content}</Text>
      {children}
    </View>
  )
  if (noFeedback) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        {inside}
      </TouchableWithoutFeedback>
    )
  } else {
    return (
      <TouchableOpacity onPress={onPress}>
        {inside}
      </TouchableOpacity>
    )
  }
}


class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editingBio: false,
      bioContent: '',
    }
  }

  toggleEditingBio = () => {
    const { state } = this
    if (state.editingBio) {
      this.props.updateUserBio(state.bioContent)
      this.setState({
        ...state,
        editingBio: false
      })
    } else {
      this.setState({
        ...state,
        editingBio: true,
        bioContent: this.props.userInfos.bio,
      })
    }
  }

  PresentationRow = () => (
    <InformationRow content='Presentation'>
      <TouchableWithoutFeedback onPress={this.toggleEditingBio}>
        <Ionicons name='md-create' size={25} color={lightPeriwinkle}/>
      </TouchableWithoutFeedback>
    </InformationRow>
  )

  onBioUpdate = content => {
    const numberOfLetters = content.length
    this.setState({
      ...this.state,
      bioContent: numberOfLetters > 500 ? this.state.bioContent : content,
    })
  }

  BioInput = () => {
    const { editingBio, bioContent } = this.state
    if (editingBio) {
      return (
        <TextArea
          placeholder='Enter short bio'
          value={bioContent}
          onChangeText={this.onBioUpdate}
          keyboardType='default'
        />
      )
    } else {
      return (
        <Text style={{
          paddingLeft: mainPadding,
          paddingRight: mainPadding,
          fontSize: 16
        }}>
          {this.props.userInfos.bio}
        </Text>
      )
    }
  }

  navigateOnBoarding = () => {
    if (__DEV__) {
      this.props.navigation.navigate('OnBoarding')
    }
  }

  ProfileOption = ({ icon, color, content, borderWidth, onPress }) => (
    <FullWidthOption
      icon={icon}
      color={color}
      content={content}
      borderWidth={borderWidth}
      onPress={onPress}
    >
      <Ionicons name='ios-arrow-forward' size={20} color={paleGrey}/>
    </FullWidthOption>
  )

  render() {
    return (
      <SafeArea style={{ backgroundColor: coursesBackground }} paddingBottom={0}>
        <View style={{ backgroundColor: coursesBackground, flex: 1 }}>
          <UserPresentation
            name={this.props.userInfos.name}
            courses={this.props.courses}
            completion={this.props.completion}
            navigation={this.props.navigation}
          />
          <BadgePage/>
        </View>
      </SafeArea>
    )
  }
}

const NotificationRow = () => (
  <InformationRow content='Settings'/>
)

const Settings = ({ userInfos, courses, completion, updateEmailNotifications, navigation }) => (
  <SafeArea style={{ backgroundColor: coursesBackground }}>
    <View style={{ backgroundColor: coursesBackground, flex: 1 }}>
      <NotificationRow/>
      <View style={{ padding: 6 }}/>
      <View style={{ backgroundColor: 'white' }}>
        <FullWidthOption
          noFeedback
          content='Email Notifications'
          borderWidth={0}
          onPress={() => updateEmailNotifications(!userInfos.emailNotifications)}
        >
          <Switch
            value={userInfos.emailNotifications}
            onValueChange={() => updateEmailNotifications(!userInfos.emailNotifications)}
          />
        </FullWidthOption>
      </View>
    </View>
  </SafeArea>
)

const PasswordRow = () => (
  <InformationRow content='Change Your Password'/>
)

const Label = ({ children }) => (
  <View style={[ presentationRowStyle, { paddingTop: 3 } ]}>
    <Text style={{}}>
      {children}
    </Text>
  </View>
)

class ChangePassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      successfulChange: null,
    }
  }

  onChangePassword = field => text => {
    this.setState({
      ...this.state,
      [field]: text,
    })
  }

  PasswordField = ({ placeholder, onChangeText, value, label }) => (
    <View>
      <Label>{placeholder}</Label>
      <TextField
        placeholder={label || placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={true}
        textContentType='password'
        // keyboardType='visible-password'
      />
    </View>
  )

  NewPassword = () => (
    <View style={{ paddingTop: 12 }}>
      {/* <this.PasswordField
        placeholder='Old Password'
        onChangeText={this.onChangePassword('oldPassword')}
        value={this.state.oldPassword}
      /> */}
      <this.PasswordField
        placeholder='New Password'
        onChangeText={this.onChangePassword('newPassword')}
        value={this.state.newPassword}
      />
      <this.PasswordField
        label='Confirm New Password'
        placeholder='Confirm Password'
        onChangeText={this.onChangePassword('confirmPassword')}
        value={this.state.confirmPassword}
      />
      <ShadowedButton
        style={{ paddingTop: 24 }}
        onPress={async () => {
          const { newPassword, confirmPassword } = this.state
          const user = firebase.auth().currentUser
          if (newPassword === confirmPassword) {
            try {
              await user.updatePassword(confirmPassword)
              this.setState({
                ...this.state,
                successfulChange: [ true, 'Password updated!' ]
              })
            } catch(error) {
              this.setState({
                ...this.state,
                successfulChange: [ false, 'Weak password!' ]
              })
            }
          } else {
            this.setState({
              ...this.state,
              successfulChange: [ false, 'Not identical Password' ]
            })
          }
          setTimeout(() => {
            this.setState({
              ...this.state,
              successfulChange: null,
            })
          }, 5000)
        }}
      >
        Done!
      </ShadowedButton>
    </View>
  )

  MessageNotification = () => {
    const { successfulChange } = this.state
    if (successfulChange) {
      const [ correct, content ] = successfulChange
      return (
        <View style={{
          backgroundColor: correct ? '#5BED72' : '#FF6D7F',
          padding: 12,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{ color: 'white' }}>
            {content}
          </Text>
        </View>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <SafeArea style={{ backgroundColor: coursesBackground }}>
        <View style={{ backgroundColor: coursesBackground, flex: 1 }}>
          <KeyboardAwareScrollView
            scrollEnabled={this.props.keyboardVisible}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
          >
            <View style={{ flex: 1 }}>
              <PasswordRow/>
              <this.NewPassword/>
            </View>
            <this.MessageNotification/>
          </KeyboardAwareScrollView>
        </View>
      </SafeArea>
    )
  }
}

export default createStackNavigator({
  Profile: {
    screen: connect(mapStateToProps, mapDispatchToProps)(Profile)
  },
  Settings: {
    screen: connect(mapStateToProps, mapDispatchToProps)(Settings)
  },
  ChangePassword: {
    screen: connect(mapStateToProps)(ChangePassword)
  },
  BadgePage: {
    screen: connect(mapStateToProps)(BadgePage)
  },
}, {
  initialRouteName: 'Profile',
  headerMode: 'none',
})
