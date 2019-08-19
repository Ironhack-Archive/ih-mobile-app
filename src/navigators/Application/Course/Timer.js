import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import timer from './images/timer.png'

class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: props.init,
      running: false,
      frame: null,
      previousTimestamp: Date.now(),
    }
  }

  componentWillUnmount() {
    this.stop()
  }

  updateTime = (timestamp) => {
    if (this.state.time > 0) {
      const nextFrame = requestAnimationFrame(this.updateTime)
      this.setState({
        ...this.state,
        time: this.state.time - (timestamp - this.state.previousTimestamp),
        frame: nextFrame,
        previousTimestamp: timestamp
      })
    } else {
      this.setState({
        ...this.state,
        frame: null,
        running: false,
      })
    }
  }

  start = () => {
    if (!this.state.running && ! this.state.frame) {
      const nextFrame = requestAnimationFrame(this.updateTime)
      this.setState({
        ...this.state,
        running: true,
        frame: nextFrame,
        previousTimestamp: Date.now()
      })
    }
  }

  stop = () => {
    if (this.state.running && this.state.frame) {
      cancelAnimationFrame(this.state.frame)
      this.setState({
        ...this.state,
        running: false,
        frame: null,
      })
    }
  }

  reset = () => {
    this.stop()
    this.setState({
      ...this.state,
      time: this.props.init,
    })
  }

  zeroPadding = value => {
    if (value < 10) {
      return `0${value}`
    } else {
      return `${value}`
    }
  }

  TimerText = ({ children }) => (
    <Text style={{
      fontWeight: '800',
      fontSize: 46,
      fontFamily: 'Roboto Mono Bold',
    }}>
      {children}
    </Text>
  )

  FormatTime = () => {
    const { time } = this.state
    const minutes = this.zeroPadding(Math.floor((time / 1000) / 60))
    const seconds = this.zeroPadding(Math.floor((time / 1000) % 60))
    const millis = this.zeroPadding(Math.floor(time % 1000 / 10))
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Image source={timer} style={{ width: 35, height: 35 }} resizeMode='contain'/>
        <this.TimerText>{minutes}</this.TimerText>
        <this.TimerText>:</this.TimerText>
        <this.TimerText>{seconds}</this.TimerText>
        <this.TimerText>:</this.TimerText>
        <this.TimerText>{millis}</this.TimerText>
      </View>
    )
  }

  Button = ({ content, color }) => (
    <View style={{
      borderRadius: 25,
      height: 50,
      width: 50,
      backgroundColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>{content}</Text>
    </View>
  )

  Stop = () => (
    <this.Button content='Stop' color={this.props.stopColor}/>
  )

  Start = () => (
    <this.Button content='Go!' color={this.props.startColor}/>
  )

  Reset = () => (
    <this.Button content='Reset' color='grey'/>
  )

  StartStopButton = () => {
    const { time, running } = this.state
    const text = running ? <this.Stop/> : time === this.props.init ? <this.Start/> : <this.Reset/>
    const onPress = running ? () => this.stop() : time === this.props.init ? () => this.start() : () => this.reset()
    return (
      <TouchableOpacity onPress={onPress}>
        {text}
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', margin: 24, backgroundColor: 'white', borderRadius: 10, padding: 6, justifyContent: 'space-between' }}>
        <this.FormatTime/>
        <this.StartStopButton/>
      </View>
    )
  }
}

export default Timer
