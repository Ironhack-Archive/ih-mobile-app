import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import styles from '../../styles'
import ShadowedButton from '../../styles/ShadowedButton'
import SafeArea from '../../styles/SafeArea'

const fullResponsiveImage = [ styles.image.responsive, styles.container.full ]
const centeredHeading = [ styles.heading.huge, styles.text.center ]
const centeredMedium = [ styles.text.medium, styles.text.center ]
const centeredPaddedMedium = [ styles.padding.smallBottom, ...centeredMedium ]
const logStyle = {
  fontSize: 17,
  textDecorationLine: 'underline',
  paddingBottom: 26
}
const SignInStyle = [ logStyle, styles.text.center, styles.padding.medium ]

const IronhackLogo = () => (
  <Image
    source={require('./images/logo.png')}
    style={fullResponsiveImage}
    resizeMode='contain'
  />
)

const WelcomeMessage = () => (
  <View>
    <Text style={centeredHeading}>Welcome</Text>
    <Text style={centeredMedium}>To your introduction to UX Design</Text>
    <Text style={centeredPaddedMedium}></Text>
  </View>
)

const SignInLogInButtons = ({ navigation }) => (
  <View style={styles.container.full}>
    <View style={styles.container.full}>
      <ShadowedButton
        style={styles.padding.medium}
        onPress={() => navigation.navigate('Wizard')}
      >
        Get Started
      </ShadowedButton>
    </View>
    {/* <Text
      style={SignInStyle}
      onPress={() => navigation.navigate('SignIn')}
    >
      Log In
    </Text> */}
  </View>
)

class Home extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <SafeArea>
        <IronhackLogo/>
        <View style={styles.container.full}>
          <WelcomeMessage/>
          <SignInLogInButtons navigation={this.props.navigation}/>
        </View>
      </SafeArea>
    )
  }
}

export default Home
