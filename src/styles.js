var React = require('react-native');
var {StyleSheet} = React;

module.exports = StyleSheet.create({
  scrollView: {
    height: 300
  },
  frame: {
    flex: 1,
    height: 35
  },
  base: {
    flex: 1,
    height: 35,
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
  footer: {
    flex: 2
  },
  button: {
    flex: 3,
    backgroundColor: '#f9f2ec',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    flex: 40,
    height: 1
  },
  mainShow: {
    flex: 40,
    height: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navbar: {
    backgroundColor: '#f9f2ec',
    height: 50,
    top: 690
  },
  navBarButton:{
    alignItems: 'center'
  },

  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    margin: 1,
    width: 136,
    height: 170
  },
  listView: {
      backgroundColor: '#fcfcfc'
  },
  containerShow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcfcfc',
  },
  card: {
    width: 420,
    height: 685
  },
  yup: {
    borderColor: 'green',
    borderWidth: 2,
    position: 'absolute',
    padding: 20,
    bottom: 20,
    borderRadius: 5,
    right: 20,
  },
  yupText: {
    fontSize: 16,
    color: 'green',
  },
  nope: {
    borderColor: 'red',
    borderWidth: 2,
    position: 'absolute',
    bottom: 20,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  nopeText: {
    fontSize: 16,
    color: 'red',
  }
});
