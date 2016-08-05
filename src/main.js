import React, { Component, createElement } from 'react';
import { Navigator, NavBar, View, TouchableHighlight, Text } from 'react-native';
var styles = require('./styles');
import DemoRoom from './demoroom';

const Cam = new DemoRoom

const Test = ({navigator}) => (
  <View>
    <TouchableHighlight onPress={()=>{
      navigator.push({component: DemoRoom})
    }}
    style={{flex:1, backgroundColor:'red'}}>
      <Text> Gallery </Text>
    </TouchableHighlight>
  </View>
)

class Main extends Component {
  renderScene(route, navigator){
    return createElement(route.component, {navigator})
  }

  render(){
    const routes = [
      {title: 'test', component: Test, index: 0},
      {title: 'demoroom', component: DemoRoom, index: 1},
    ];

    return <Navigator
        initialRoute      = {routes[1]}
        initialRouteStack = {routes}
        renderScene       = {this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) =>
                { return (<Text>Gallery</Text>); },
              RightButton: (route, navigator, index, navState) =>
                {Cam.uploadButton()},
              Title: (route, navigator, index, navState) =>
                { return (<Text>LOGO</Text>); },
              }}
            style={styles.navbar}
          />
        }
      />
  }

}

export default Main
