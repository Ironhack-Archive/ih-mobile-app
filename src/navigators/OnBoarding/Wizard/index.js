import React from 'react'
import { View, Text, Image } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import Swiper from 'react-native-swiper'

import { brightLightBlue } from '../../styles/colors'
import styles from '../../styles'
import SafeArea from '../../styles/SafeArea'
import ShadowedButton from '../../styles/ShadowedButton'

const titleStyle = {
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 30,
  paddingBottom: 24,
}

const textStyle = {
  textAlign: 'center',
  fontSize: 20,
  lineHeight: 30,
  paddingRight: 36,
  paddingLeft: 36,
}

const WizardTemplate = ({ image, title, content, children }) => (
  <SafeArea>
    <View style={{ flex: 1, padding: 24 }}>
      <Image style={styles.image.responsive} source={image} resizeMode='contain'/>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={titleStyle}>{title}</Text>
      <Text style={textStyle}>{content}</Text>
      {children}
    </View>
  </SafeArea>
)

const WizardFirst = () => (
  <WizardTemplate
    image={require('../images/1-alter.png')}
    title='Get Ready!'
    content='Access the courses to learn the basics of the design thinking methodology.'
  />
)

const WizardSecond = () => (
  <WizardTemplate
    image={require('../images/2-alters.png')}
    title='Test Yourself!'
    content='Check that you have understood the lesson using quizzes.'
  />
)

const WizardThird = ({ navigation }) => (
  <WizardTemplate
    image={require('../images/3-alters.png')}
    title='Become a pro!'
    content='Practice by applying your knowledge in a pratical exercise. Be ready to design your own solution to user problems.'
  >
    <ShadowedButton
      textStyle={{ fontSize: 26 }}
      style={{ margin: 24 }}
      onPress={() => navigation.navigate('SignUp')}
    >
      Go!
    </ShadowedButton>
  </WizardTemplate>
)

const dotWidth = 16
const activeDotWidth = 24
const dotMargins = 6

const dot = (
  <View style={{
    backgroundColor:'rgba(0,0,0,.2)',
    width: dotWidth,
    height: dotWidth,
    borderRadius: dotWidth / 2,
    marginLeft: dotMargins,
    marginRight: dotMargins,
    marginTop: dotMargins,
    marginBottom: dotMargins,
  }}/>
)

const activeDot = (
  <View style={{
    backgroundColor: brightLightBlue,
    width: activeDotWidth,
    height: activeDotWidth,
    borderRadius: activeDotWidth / 2,
    marginLeft: dotMargins,
    marginRight: dotMargins,
    marginTop: dotMargins,
    marginBottom: dotMargins,
  }}/>
)

class Wizard extends React.Component {
  static navigationOptions = {
    headerStyle: {
      borderBottomWidth: 0,
    },
    headerTransparent: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  updateIndex = index => {
    this.setState({
      ...this.state,
      index,
    })
  }

  dot = () => {
    if (this.state.index === 2) {
      return (<View/>)
    } else {
      return dot
    }
  }

  activeDot = () => {
    if (this.state.index === 2) {
      return (<View/>)
    } else {
      return activeDot
    }
  }

  render() {
    return (
      <Swiper
        loop={false}
        dot={this.dot()}
        activeDot={this.activeDot()}
        onIndexChanged={this.updateIndex}
      >
        <WizardFirst/>
        <WizardSecond/>
        <WizardThird navigation={this.props.navigation}/>
      </Swiper>
    )
  }
}

export default Wizard
