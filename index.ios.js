import React, { Component } from 'react';
import {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
var ImagePicker = require('react-native-image-picker');
var Platform = require('react-native').Platform;
import {Column as Col, Row} from 'react-native-flexbox-grid';

class demoroom extends Component {
  constructor() {
    super();
    this.state = {avatarSource: null, arrayOfPictures: []}
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

  picker() {
    var options = {
      title: 'Select Fit',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        if (Platform.OS === 'ios') {
          var source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          var source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          avatarSource: source
        });

        fetch('http://localhost:3000/api/v1/snaps', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            picture: 'data:image/jpeg;base64,' + response.data
          })
        })
      }
    });
  }

  uploadButton() {
    return <TouchableHighlight
    underlayColor='gray'
    onPress={ () => this.picker() }
    style={styles.button}>
      <Text style={{color:'#9a8d72'}}>
        Upload
      </Text>
    </TouchableHighlight>
  }

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
    return (<View style={styles.container}>
      <View style={styles.header}/>
      <View style={styles.preview}>
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
      {this.uploadButton()}
    </View>)
  }
}
const styles = StyleSheet.create({
  scrollView: {
    height: 300
  },
  base: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#fcfcfc'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fcfcfc'
  },
  header: {
    backgroundColor: '#f9f2ec',
    flex: 1
  },
  button: {
    flex: 3,
    backgroundColor: '#f9f2ec',
    justifyContent: 'center',
    alignItems: 'center'
  },
  preview: {
    flex: 30
  }
});

AppRegistry.registerComponent('demoroom', () => demoroom);
