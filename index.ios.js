import React, { Component } from 'react';
import {
  AppRegistry,
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
        console.log(responseJson[i])
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
      <Text>
        Upload
      </Text>
    </TouchableHighlight>
  }

  render() {
    return (<View style={styles.container}>
      <View style={styles.header}/>
      <View style={styles.preview}>
          <Image style={styles.base} source={{uri:'http://localhost:3000/uploads/snap/picture/49/file.jpeg'}} />
      </View>
      {this.uploadButton()}
    </View>)
  }
}
const styles = StyleSheet.create({
  base: {
    flex: 1
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
    flex: 5,
    backgroundColor: '#f9f2ec',
    justifyContent: 'center',
    alignItems: 'center'
  },
  preview: {
    flex: 30
  }
});

AppRegistry.registerComponent('demoroom', () => demoroom);
