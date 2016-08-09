import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  ListView
} from 'react-native';
var styles = require('./styles');

export default class ShowRoom extends Component {
  render() {
    var look = this.props.look;
    var imageURI = this.props.picture
    return (
        <View style={styles.container}>
          <View style={styles.header}/>
          <View style={styles.main}>
            <Image style={styles.main} source={{uri: 'http://localhost:3000' + imageURI}} />
          </View>
          <View style={styles.footer}/>
        </View>
    );
  }
}
