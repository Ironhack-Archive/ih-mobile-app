import { StyleSheet } from 'react-native'

const toStyleSheet = object => (
  Object.keys(object).reduce((accumulator, key) => ({
    ...accumulator,
    [key]: StyleSheet.create(object[key])
  }), {})
)

const containerStyle = {
  full: {
    flex: 1
  },
  round: {
    borderRadius: 200
  }
}

const paddingStyle = {
  medium: {
    padding: 12
  },
  large: {
    padding: 24
  },
  largeTop: {
    paddingTop: 24
  },
  largeBottom: {
    paddingBottom: 24
  },
  smallBottom: {
    paddingBottom: 6
  }
}

const contentStyle = {
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    justifyContent: 'flex-start',
  }
}

const imageStyle = {
  responsive: {
    width: undefined,
    height: undefined,
    flex: 1,
  },
  fullWidth: {
    width: '100%',
    flex: 3,
  }
}

const textStyle = {
  center: {
    textAlign: 'center'
  },
  medium: {
    fontSize: 20,
    fontWeight: '300'
  }
}

const headingStyle = {
  huge: {
    fontSize: 32,
    padding: 16,
    // fontWeight: 'bold',
    fontFamily: 'Roboto Slab Bold',
  },
  head: {
    fontSize: 22,
    // fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto Slab Bold',
  }
}

const shadowStyle = {
  light: {
    shadowColor: "#bbb",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62
  },
  hard: {
    shadowColor: "#bbb",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2.62
  }
}

const styles = toStyleSheet({
  container: containerStyle,
  content: contentStyle,
  image: imageStyle,
  text: textStyle,
  heading: headingStyle,
  padding: paddingStyle,
  shadow: shadowStyle
})

export default styles
