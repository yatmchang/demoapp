import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
var styles = require('./styles');

export default class Profile extends Component {
  render(){
    return <View style={styles.container}>
      <View style={styles.header}/>
        <View style={styles.main}>
          <Text>
            Hi
          </Text>
        </View>
    </View>
  }
}
