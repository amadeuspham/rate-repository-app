import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: theme.colors.statusBar,
    height: 150,

  },
  bar: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: 20,
    position: 'absolute',
    bottom: 0
  }, 
  tabButton: {
    marginRight: 20
  },  
  barText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});

const AppBarTab = ({...props}) => {
  return (
    <View style={styles.tabButton}>
      <TouchableWithoutFeedback>
        <Text style={styles.barText} {...props}/>
      </TouchableWithoutFeedback>
    </View>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.bar}>
        <Link to="/" component={AppBarTab} activeOpacity={0.8}>Repositories</Link>
        <Link to="/signin" component={AppBarTab} activeOpacity={0.8}>Sign in</Link>
      </ScrollView>
    </View>
  );     
};

export default AppBar;