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

export default class DemoRoomv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };

    this.renderLook = this.renderLook.bind(this)
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
        allPictures: this.state.dataSource._dataBlob.s1
    });
  }
}
