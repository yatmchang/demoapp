var React = require('react-native');
var {StyleSheet} = React;

module.exports = StyleSheet.create({
  scrollView: {
    height: 300
  },
  base: {
    flex: 1,
    height: 30,
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
  },
  navbar: {
    backgroundColor: '#f9f2ec',
    height: 50,
    top: 680
  }
});
