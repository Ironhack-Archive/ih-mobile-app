import React from 'react'
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Linking,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StatusBar,
  TouchableOpacity,
} from 'react-native'
import { createStackNavigator } from 'react-navigation'
// import { Video } from 'expo';
// import VideoPlayer from '@expo/videoplayer';
import { Ionicons } from '@expo/vector-icons'
import Picker from 'react-native-picker-select'
import * as firebase from 'firebase'
import { connect } from 'react-redux'

import styles from '../../styles'
import SafeArea from '../../styles/SafeArea'
import ShadowedButton from '../../styles/ShadowedButton'
import { RoundedImage } from '../../Images'
import { darkPaleGrey, paleGrey, coursesBackground, brightLightBlue } from '../../styles/colors'
import ironhackLogo from './logo.png'
import book from './exercises/Books.png'
import cv from './exercises/CV.png'
import computer from './exercises/Computer.png'
import phone from './exercises/Phone.png'
import dashboard from './images/dashboard.png'
import imagePhone from './images/phone.png'
import wine from './images/vin.png'
import pic from '../../OnBoarding/Auth/already-connected.png'
import { getDB } from '../../../firebase'
import { FullButton } from '../../Application/common'

const Row = ({ children, style }) => (
  <View style={{
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 24,
    ...style
  }}>
    {children}
  </View>
)

const rowTextStyle = {
  textAlign: 'center',
  textTransform: 'uppercase',
  fontWeight: '600'
}

const RowContent = ({ top, bottom }) => (
  <View style={{ width: '35%' }}>
    <Text style={[ rowTextStyle, { fontSize: 20 } ]}>{top}</Text>
    <View style={{ padding: 3 }}/>
    <Text style={[ rowTextStyle, { fontSize: 14, color: darkPaleGrey } ]}>{bottom}</Text>
  </View>
)

const InformationsRow = () => (
  <Row>
    <RowContent top='9' bottom='CITIES'/>
    <RowContent top='4.9 / 5' bottom='SWITCHUP & COURSE REPORT'/>
    <RowContent top='2500+' bottom='ALUMNIS'/>
  </Row>
)

const cardStyle = size => ({
  backgroundColor: 'white',
  width: size,
  height: size,
  margin: 6,
  borderRadius: 10,
  justifyContent: 'space-evenly',
  alignItems: 'center',
  paddingTop: 12,
})

const textCardStyle = {
  textAlign: 'center',
  paddingRight: 16,
  paddingLeft: 16,
  paddingBottom: 12,
  // fontWeight: '500',
  fontFamily: 'Roboto Slab Bold',
}

const Card = ({ icon, text, color }) => {
  const { width } = Dimensions.get('window')
  const size = width * 0.40
  return (
    <View elevation={2} style={[ cardStyle(size), styles.shadow.light ]}>
      <Image source={icon} style={{ width: 50, height: 50 }}/>
      <View style={{ padding: 12 }}/>
      <Text style={textCardStyle}>{text}</Text>
    </View>
  )
}

const CardsRow = () => (
  <Row style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
    <Card
      icon={computer}
      color='red'
      text='Intense learning in short period of time'
    />
    <Card
      icon={phone}
      color='blue'
      text='Cover UX methods, UI tools, and intro to code'
    />
    <Card
      icon={book}
      color='grey'
      text='Practice on real companies project'
    />
    <Card
      icon={cv}
      color='black'
      text='Skills desired for many full-time or freelance jobs'
    />
  </Row>
)

const studentTestimonialCardStyle = size => ({
  padding: 18,
  backgroundColor: 'white',
  borderRadius: 10,
  width: size,
  margin: 6,
})

const starColor = 'rgb(245, 166, 35)'

const Star = ({ full }) => (
  <Ionicons
    name={full ? 'md-star' : 'md-star-outline'}
    size={25}
    color={starColor}
  />
)

const Stars = ({ number }) => {
  return (
    <Row style={{ padding: 0, paddingBottom: 6, justifyContent: 'flex-start' }}>
      <Star full={number >= 1 ? true : false}/>
      <Star full={number >= 2 ? true : false}/>
      <Star full={number >= 3 ? true : false}/>
      <Star full={number >= 4 ? true : false}/>
      <Star full={number >= 5 ? true : false}/>
    </Row>
  )
}

const StudentTestimonialCard = ({ name, picture, stars, content }) => {
  const { width } = Dimensions.get('window')
  const size = width * 0.70 + 12
  return (
    <View style={[ studentTestimonialCardStyle(size), styles.shadow.light ]}>
      <View style={{ borderBottomColor: darkPaleGrey, borderBottomWidth: 1, paddingBottom: 12 }}>
        <Row style={{ padding: 0 }}>
          {/* <View style={{ paddingRight: 12 }}>
            <RoundedImage borderWidth={0} source={pic} size={45}/>
          </View> */}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>{name}</Text>
            <Text style={{ color: darkPaleGrey, fontSize: 16, paddingTop: 4 }}>Paris UX / UI Student</Text>
          </View>
        </Row>
      </View>
      <View style={{ paddingTop: 12 }}>
        <Stars number={stars}/>
        <Text>{content}</Text>
      </View>
    </View>
  )
}

const StudentTestimonials = () => (
  <View style={{ alignItems: 'center', paddingTop: 24 }}>
    <Text style={{ fontFamily: 'Roboto Slab Bold', fontSize: 30, margin: 12, textAlign: 'center' }}>Student{'\n'}testimonials</Text>
    <StudentTestimonialCard
      name='Alexis'
      // picture={'testst'}
      stars={5}
      content='I have just finished the 9-week UX/UI Design bootcamp in Ironhack Paris, and I’m happy to say it’s one of the best decisions I have ever made in my life.'
    />
    <StudentTestimonialCard
      name='Inma'
      // picture={'testst'}
      stars={5}
      content='My experience at Ironhack has been a real challenge. Before join Ironhack, I didn’t know much about UX/UI. After 9 weeks of intense work I am fully prepared to join the design and tech industry.'
    />
  </View>
)

const uxuiSyllabusStyle = {
  color: brightLightBlue,
  fontSize: 18,
  fontWeight: '500',
  textAlign: 'center',
  alignSelf: 'center',
  textDecorationLine: 'underline',
  lineHeight: 30,
}

const Link = ({ children, to, style }) => (
  <Text
    style={[ uxuiSyllabusStyle, { width: undefined }, style ]}
    onPress={() => Linking.openURL(to).catch(console.log)}
  >
    {children}
  </Text>
)

const checkOutStyle = {
  fontSize: 26,
  textAlign: 'center',
  padding: 24,
  lineHeight: 36,
  fontFamily: 'Roboto Slab Bold',
}

const ProjectImages = () => {
  const { width } = Dimensions.get('window')
  const fullSize = width * 0.70
  const thirdSize = fullSize * (1 / 3)
  const twoThirdSize = fullSize * (2 / 3)
  const smallHeight = twoThirdSize / 3 * 2
  return (
    <View>
      <View style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        paddingBottom: 12
      }}>
        <TouchableWithoutFeedback onPress={() => Linking.openURL('https://blog.prototypr.io/la-maison-du-whisky-ux-ui-case-study-d9bf5abeffd7').catch(console.log)}>
          <Image
            source={wine}
            resizeMode='cover'
            style={{ width: twoThirdSize, height: smallHeight, marginRight: 6, borderRadius: 10 }}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => Linking.openURL('https://medium.com/@amandabasso/travellous-an-app-for-solo-women-travellers-ironhack-capstone-ux-ui-project-51ab3824d5a4').catch(console.log)}>
          <Image
            source={imagePhone}
            resizeMode='cover'
            style={{ width: thirdSize, height: smallHeight, marginLeft: 6, borderRadius: 10 }}
          />
        </TouchableWithoutFeedback>
      </View>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={() => Linking.openURL('https://medium.com/@lucielem/case-study-a-dashboard-for-hr-people-who-want-to-know-more-about-their-employees-happiness-8ad1f763ed91').catch(console.log)}>
          <Image
            source={dashboard}
            resizeMode='cover'
            style={{ width: fullSize + 12, height: (fullSize + 12) / 3 * 2, borderRadius: 10 }}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const ApplyButton = ({ navigation }) => (
  <ShadowedButton onPress={() => navigation.navigate('Apply')}>
    Apply
  </ShadowedButton>
)

const testimonialsLink = 'https://www.switchup.org/bootcamps/ironhack'

const SyllabusLink = connect(({ userInfos }) => ({ userInfos }))(class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sent: false,
      loading: false,
    }
  }

  sendSyllabus = async (email) => {
    this.setState({
      ...this.state,
      loading: true,
    })
    const result = await fetch("https://us-central1-ironboost-wolfox-cloud.cloudfunctions.net/sendEmail", {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        email: email,
        name: (this.props.userInfos || {}).name || 'dear anonymous',
      })
    })
    console.log(result)
    this.setState({
      sent: true,
      loading: false,
    })
  }

  render() {
    const { userInfos } = this.props
    if (!this.state.sent) {
      if (this.state.loading) {
        return (
          <Text style={[ uxuiSyllabusStyle, { width: '50%' } ]}>
            Sending syllabus...
          </Text>
        )
      } else {
        return (
          <TouchableOpacity onPress={() => this.sendSyllabus(userInfos.email)}>
            <Text style={[ uxuiSyllabusStyle, { width: '50%' } ]}>
              Click here to receive the UX / UI syllabus
            </Text>
          </TouchableOpacity>
        )
      }
    } else {
      return (
        <Text style={[ uxuiSyllabusStyle, { width: '50%' } ]}>
          Syllabus sent to {userInfos.email}!
        </Text>
      )
    }
  }
})

const decideStyle = {
  padding: 24,
  textAlign: 'center',
  fontSize: 30,
  // fontWeight: '500',
  fontFamily: 'Roboto Slab Bold'
}

const GreyPart = ({ navigation }) => (
  <View style={{ backgroundColor: coursesBackground, width: '100%' }}>
    <Text style={decideStyle}>Why A UX / UI Bootcamp</Text>
    <CardsRow/>
    <SyllabusLink/>
    <StudentTestimonials/>
    <Link to={testimonialsLink}>Click here to see more</Link>
    <Text style={checkOutStyle}>Check out examples of awesome student project.</Text>
    <ProjectImages/>
    <Text style={decideStyle}>Time to decide!</Text>
    <View style={{ padding: 12 }}/>
  </View>
)

class Postulate extends React.Component {
  static navigationOptions = {
    header: null,
  }

  // TODO
  render() {
    return (
      <SafeArea paddingBottom={0} xBackgroundTopColor='transparent'>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <Image source={ironhackLogo} style={{ width: 100, height: 100, marginTop: 24 }}/>
          <Text style={{ fontSize: 26, paddingTop: 12, fontFamily: 'Roboto Slab Bold' }}>Ironhack</Text>
          <InformationsRow/>
          <GreyPart navigation={this.props.navigation}/>
        </ScrollView>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Apply')}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', paddingVertical: 18, backgroundColor: brightLightBlue, color: 'white', textAlign: 'center' }}>Apply</Text>
        </TouchableOpacity>
      </SafeArea>
    )
  }
}

const pickerStyle =  {
  inputIOS: {
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 2,
    backgroundColor: 'white',
    color: brightLightBlue,
    fontWeight: '600',
  },
  inputAndroid: {
    fontSize: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 2,
    backgroundColor: 'white',
    color: brightLightBlue,
    fontWeight: '600',
  },
}

class _Apply extends React.Component {
  static navigationOptions = {
    headerTintColor: brightLightBlue,
    headerStyle: {
      borderBottomWidth: 0,
    },
    headerTransparent: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      city: 'paris',
      partOrFullTime: 'Full-Time',
      editions: [],
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: 'male',
    }
  }

  selectDateCard = content => {
    if (this.state.editions.includes(content)) {
      this.setState({
        ...this.state,
        editions: this.state.editions.filter(elem => elem !== content),
      })
    } else {
      this.setState({
        ...this.state,
        editions: [ content, ...this.state.editions ],
      })
    }
  }

  DateCard = ({ content }) => {
    const isSelected = this.state.editions.includes(content)
    return (
      <View style={{
        backgroundColor: isSelected ? brightLightBlue : paleGrey,
        width: '45%',
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 10,
        marginVertical: 12,
      }}>
        <TouchableWithoutFeedback onPress={() => this.selectDateCard(content)}>
          <Text style={{
            color: isSelected ? 'white' : 'black',
            fontWeight: '700',
            textAlign: 'center',
          }}>
            {content}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  updatePartOrFullTime = content => {
    this.setState({
      ...this.state,
      partOrFullTime: content,
      editions: this.state.partOrFullTime === content ? this.state.editions : [],
    })
  }

  PartOrFullTimeCard = ({ content }) => {
    const isSelected = this.state.partOrFullTime === content
    return (
      <View style={{
        backgroundColor: isSelected ? brightLightBlue : paleGrey,
        width: '45%',
        paddingTop: 12,
        paddingBottom: 12,
        borderRadius: 10,
        marginVertical: 12,
      }}>
        <TouchableWithoutFeedback onPress={() => this.updatePartOrFullTime(content)}>
          <Text style={{
            color: isSelected ? 'white' : 'black',
            fontWeight: '700',
            textAlign: 'center',
          }}>
            {content}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  RenderPartOrFullTime = () => {
    const { partOrFullTime } = this.state
    switch(partOrFullTime) {
      case 'Full-Time':
        return (
          <>
            <this.DateCard content='5 Aug - 11 Oct'/>
            <this.DateCard content='14 Oct - 20 Dec'/>
          </>
        )
      case 'Part-Time':
        return (
          null
        )
    }
  }

  DateCards = () => (
    <View style={{
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingTop: 12,
      paddingBottom: 18,
      flexWrap: 'wrap',
    }}>
      <this.RenderPartOrFullTime/>
    </View>
  )

  TextualInput = ({ label, placeholder, width, onChangeText, value, keyboardType, textContentType }) => (
    <View style={{
      width,
    }}>
      <Text
        style={{
          fontSize: 16,
          paddingBottom: 6,
        }}
      >
        {label}
      </Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        textContentType={textContentType}
        style={{
          borderBottomWidth: 2,
          paddingTop: 6,
          paddingBottom: 6,
          fontSize: 16,
        }}
      />
    </View>
  )

  NameInfos = () => (
    <View style={{
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    }}>
      <this.TextualInput
        label='First Name'
        placeholder='Jon'
        width='45%'
        onChangeText={content => this.setState({ ...this.state, firstName: content })}
        value={this.state.firstName}
        keyboardType='default'
        textContentType='familyName'
      />
      <this.TextualInput
        label='Last Name'
        placeholder='Snow'
        width='45%'
        onChangeText={content => this.setState({ ...this.state, lastName: content })}
        value={this.state.lastName}
        keyboardType='default'
        textContentType='name'
      />
    </View>
  )

  EmailInfos = () => (
    <View style={{
      width: '100%',
      paddingTop: 18,
      paddingBottom: 18,
    }}>
      <this.TextualInput
        label='E-mail'
        placeholder='jon.snow@winterfell.got'
        width='100%'
        onChangeText={content => this.setState({ ...this.state, email: content })}
        value={this.state.email}
        keyboardType='email-address'
        textContentType='emailAddress'
      />
    </View>
  )

  PhoneInfos = () => (
    <View style={{
      width: '100%',
      paddingBottom: 18,
    }}>
      <this.TextualInput
        label='Phone Number'
        placeholder='+33 6 XX XX XX XX'
        width='100%'
        onChangeText={content => this.setState({ ...this.state, phone: content })}
        value={this.state.phone}
        keyboardType='phone-pad'
        textContentType='telephoneNumber'
      />
    </View>
  )

  GenderInfos = () => (
    <View style={{
      width: '100%',
      paddingBottom: 18,
    }}>
      <Text style={{ fontSize: 16 }}>Gender</Text>
      <Picker
        useNativeAndroidPickerStyle={false}
        value={this.state.gender}
        onValueChange={(itemValue) => this.setState({ ...this.state, gender: itemValue })}
        style={pickerStyle}
        items={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Non-binary', value: 'nonBinary' },
        ]}
      />
    </View>
  )

  submit = async () => {
    try {
      const result = await fetch("https://us-central1-ironboost-wolfox-cloud.cloudfunctions.net/postulate", {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          userID: this.props.userID,
          email: this.props.userInfos.email,
          postulate: this.state,
        })
      })
      console.log(result)
      this.props.navigation.navigate('Congrats')
    } catch (error) {
      console.error(error)
    }
  }

  SelectPartOrFullTime = () => (
    <View style={{
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      paddingTop: 12,
      paddingBottom: 18,
      flexWrap: 'wrap',
    }}>
      <this.PartOrFullTimeCard content='Full-Time'/>
      <this.PartOrFullTimeCard content='Part-Time'/>
    </View>
  )

  render() {
    return (
      <SafeArea style={{ backgroundColor: 'transparent' }} paddingBottom={0}>
        <KeyboardAvoidingView
          style={styles.container.full}
          behavior='position'
          keyboardVerticalOffset={-64}
          contentContainerStyle={styles.container.full}
        >
          <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 24 }}>
            <Image source={ironhackLogo} style={{ width: 100, height: 100 }}/>
            <Text style={{ fontSize: 22, paddingTop: 12, fontFamily: 'Roboto Slab Bold' }}>Apply to Ironhack</Text>
            <Text style={{ fontSize: 16, paddingBottom: 18 }}>And join a community of amazing people</Text>
            <Text style={{ alignSelf: 'flex-start', fontSize: 16 }}>I want to join the campus in Paris</Text>
            {/* <this.SelectPartOrFullTime/> */}
            <Text style={{ alignSelf: 'flex-start', paddingTop: 18, fontSize: 16 }}>I am interested by the edition</Text>
            <this.DateCards/>
            <this.NameInfos/>
            <this.EmailInfos/>
            <this.PhoneInfos/>
            <this.GenderInfos/>
          </ScrollView>
          <TouchableOpacity onPress={() => this.submit()} style={{ width: '100%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', paddingVertical: 18, backgroundColor: brightLightBlue, color: 'white', textAlign: 'center' }}>Apply</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeArea>
    )
  }
}

const Apply = connect(({ userID, userInfos }) => ({ userID, userInfos }))(_Apply)

class Congrats extends React.Component {
  static navigationOptions = {
    headerTintColor: brightLightBlue,
    headerStyle: {
      borderBottomWidth: 0,
    },
    headerTransparent: true,
  }

  render() {
    return (
      <SafeArea style={{ backgroundColor: 'white' }} paddingBottom={0}>
        <StatusBar barStyle='dark-content'/>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 3 }}>
            <View style={{ flex: 1, padding: 48, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={ironhackLogo} style={{ width: 100, height: 100 }}/>
            </View>
          </View>
          <View style={{ flex: 2 }}>
            <Text style={{ textAlign: 'center', color: brightLightBlue, fontSize: 32, fontFamily: 'Roboto Slab Bold' }}>Congrats!</Text>
            <Text style={{ textAlign: 'center', color: brightLightBlue, fontSize: 16, fontFamily: 'Roboto Slab' }}>You successfully applied to Ironhack!{'\n'}You’ll receive a mail in your inbox soon!</Text>
            <View style={{ padding: 24 }}/>
          </View>
        </View>
        <FullButton
          textColor='white'
          backgroundColor={brightLightBlue}
          content='Take me back home!'
          onPress={() => {
            this.props.navigation.navigate('Postulate')
            this.props.navigation.navigate('Courses')
          }}
        />
      </SafeArea>
    )
  }
}

export default createStackNavigator({
  Postulate,
  Apply,
  Congrats,
}, {
  initialRouteName: 'Postulate',
  defaultNavigationOptions: {
    headerBackTitle: null,
  },
})
