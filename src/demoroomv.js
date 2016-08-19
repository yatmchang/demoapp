import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight,
  ActivityDetailNavBar,
  ListView
 } from 'react-native';
var REQUEST_URL = 'http://localhost:3000/snaps.json';
import ShowRoom from './showroom';
import styles from './styles';
import ImagePicker from 'react-native-image-picker';
var Platform = require('react-native').Platform;

export default class DemoRoomv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      avatarSource: null
    };

    this.renderLook = this.renderLook.bind(this)
  }

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
    underlayColor='#f9f2ec'
    onPress={ () => this.picker() }
    style={styles.button2}>
      <Text>  </Text>
    </TouchableHighlight>
  }

  componentDidMount() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseJson) => {
        var tempArray = []
        for(var i=0; i < responseJson.length; i++){
          tempArray.push(responseJson[i])
        }

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(tempArray),
        });
      })
      .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}/>
        <View style={styles.header}>
          <View>{this.uploadButton()}</View>
        </View>
        <View style={styles.main}>
          <ListView
            removeClippedSubviews={false}
            dataSource={this.state.dataSource}
            renderRow={this.renderLook}
            contentContainerStyle={styles.list}
          />
        </View>
        <View style={styles.footer}/>
      </View>
    );
  }

  renderLook(look) {
    return (
      <TouchableHighlight
      onPress={() => this.showLookDetail(look)}
      underlayColor='#dddddd'
      style={styles.item}>
          <Image
            source={{uri: 'http://localhost:3000' + look.picture.url}}
            style={styles.item} />
        </TouchableHighlight>
    );
  }

  showLookDetail(look) {
    this.props.navigator.push({
        component: ShowRoom,
        look: look.id,
        picture: look.picture.url,
        like: look.like_count,
        dislike: look.dislike_count
    });
  }
}
