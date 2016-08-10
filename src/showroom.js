import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ListView,
  Animated,
  PanResponder,
  Navigator
} from 'react-native';
var styles = require('./styles');
var clamp = require('clamp');
var SWIPE_THRESHOLD = 100;
var LIKE = 1;
var DISLIKE = -1;
import DemoRoomv from './demoroomv';

export default class ShowRoom extends Component {

  constructor(props) {
    super(props);
    const AllSnaps = this.props.allPictures;
    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      snap: this.props.picture,
      look: this.props.look
    }
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  _resetState() {
    this._animateEntrance();
    this.props.navigator.push({
        component: DemoRoomv})
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }
        if (vx >=0){
          if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
            Animated.decay(this.state.pan, {
              velocity: {x: velocity, y: vy},
              deceleration: 0.98
            }).start(this._resetState.bind(this))
            this.likeSnap();
          } else {
            Animated.spring(this.state.pan, {
              toValue: {x: 0, y: 0},
              friction: 4
            }).start()
          }
        } else if (vx < 0){
          if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
            Animated.decay(this.state.pan, {
              velocity: {x: velocity, y: vy},
              deceleration: 0.98
            }).start(this._resetState.bind(this))
            this.dislikeSnap();
          } else {
            Animated.spring(this.state.pan, {
              toValue: {x: 0, y: 0},
              friction: 4
            }).start()
          }
        }
      }
    })
  }

  likeSnap(){
    fetch(`http://localhost:3000/api/v1/snaps/${this.state.look}/like`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  dislikeSnap(){
    console.log("here")
    fetch(`http://localhost:3000/api/v1/snaps/${this.state.look}/dislike`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  render() {
    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

      let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]})
    let scale = enter;

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [0.8, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.8], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity}

    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <View style={styles.mainShow}>
          <Animated.View style={[styles.card, animatedCardStyles]} {...this._panResponder.panHandlers}>
            <Image style={styles.card} source={{uri: 'http://localhost:3000' + this.state.snap}} />
          </Animated.View>

          <Animated.View style={[styles.nope, animatedNopeStyles]}>
            <Text style={styles.nopeText}>Out!</Text>
          </Animated.View>

          <Animated.View style={[styles.yup, animatedYupStyles]}>
            <Text style={styles.yupText}>In!</Text>
          </Animated.View>
        </View>
        <View style={styles.footer} />
      </View>

    );
  }
}
