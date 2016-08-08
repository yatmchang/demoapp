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

var ImagePicker = require('react-native-image-picker');
var Platform = require('react-native').Platform;
import {Column as Col, Row} from 'react-native-flexbox-grid';
var styles = require('./styles');





export default class DemoRoom extends Component {
  constructor() {
    super();
    this.state = {arrayOfPictures: []}
  }

  componentDidMount(){
    fetch('http://localhost:3000/snaps.json')
    .then((response) => response.json())
    .then((responseJson) => {
      var tempArray = []
      for(var i=0; i < responseJson.length; i++){
        tempArray.push(responseJson[i].picture.url)
      }
      this.setState({arrayOfPictures: tempArray})
    })
    .done()
  };



  galleryMap(){
    var galleryArray = []
    for(var i=0; i < this.state.arrayOfPictures.length; i++){
      {galleryArray.push(
        <Col sm={4} key={i}>
          <Image
          style={styles.base}
          source={{uri: 'http://localhost:3000' + this.state.arrayOfPictures[i]}} />
        </Col>)
      }
    }
    return galleryArray
  }

  render() {
    var _scrollView: ScrollView;

    return (<View style={styles.container}>
      <View style={styles.header}/>
      <View style={styles.main}>
      <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          style={styles.scrollView}>
        <Row size={12}>
          {this.galleryMap()}
        </Row>
        </ScrollView>
      </View>
    </View>)
  }
}
