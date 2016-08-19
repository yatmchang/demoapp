import React, { Component, createElement } from 'react';
import { Navigator, Image, NavBar, View, TouchableHighlight, Text } from 'react-native';
var styles = require('./styles');
import DemoRoom from './demoroom';
import ImagePicker from 'react-native-image-picker';
var Platform = require('react-native').Platform;
import DemoRoomv from './demoroomv';
import ShowRoom from './showroom';

class Main extends Component {
  constructor() {
    super();
    this.state = {avatarSource: null}
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
    style={styles.button}>
      <Image source={require('./logo.png')} style={styles.logo}/>
    </TouchableHighlight>
  }


  renderScene(route, navigator){
    return createElement(route.component, {navigator: navigator, look: route.look, picture: route.picture, like: route.like, dislike: route.dislike})
  }

  render(){
    const routes = [
      {title: 'demoroomv', component: DemoRoomv, index: 0},
      {title: 'demoroom', component: DemoRoom, index: 1},
      {title: 'showroom', component: ShowRoom, index: 2}
    ];

    return <Navigator
        initialRoute      = {routes[0]}
        initialRouteStack = {routes}
        renderScene       = {this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index) =>
                { if (route.index === 0) {
                  return <TouchableHighlight
                    onPress={()=>{navigator.push({component: DemoRoomv})}}
                    style={styles.navBarButton}
                    underlayColor="#f9f2ec">
                    <Text> Gallery </Text>
                  </TouchableHighlight>;
                  } else {
                    return <TouchableHighlight
                      onPress={()=>{navigator.push({component: DemoRoomv})}}
                      style={styles.navBarButton}
                      underlayColor="#f9f2ec">
                      <Text> Gallery </Text>
                    </TouchableHighlight>
                  }
                },
              RightButton: (route, navigator, index) =>
              { if (route.index === 1){
                  return <Text style={{fontWeight: "bold"}}> Profile
                  </Text>;
              } else {
                return <TouchableHighlight
                  onPress={()=>{navigator.push({component: DemoRoom})}}
                  style={styles.navBarButton}
                  underlayColor="#f9f2ec">
                  <Text> Profile </Text>
                </TouchableHighlight>
                }
              },
              Title: (route, navigator, index, navState) =>
                {return <View>{this.uploadButton()}</View>}
              }}
            style={styles.navbar}
          />
        }
      />
  }

}

export default Main
