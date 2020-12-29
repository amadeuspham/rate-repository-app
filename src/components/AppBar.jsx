import React, { useContext } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-native';
import theme from '../theme';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { AUTHORIZED_USER } from '../graphql/queries';

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
        <View>
          <Text style={styles.barText} {...props}/>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const AppBar = () => {
  const { data, error } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
  });
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const history = useHistory();

  let signedIn = false;
  if (data && !error && data.authorizedUser != null) {
    signedIn = true;
  }

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    history.push('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.bar}>
        <Link to="/" component={AppBarTab}>Repositories</Link>
        {signedIn && <Link to="/createReview" component={AppBarTab}>Create a review</Link>}
        {signedIn && <Link to="/userReviews" component={AppBarTab}>My reviews</Link>}
        {signedIn && <AppBarTab onPress={signOut}>Sign out</AppBarTab>}
        {!signedIn && <Link to="/signin" component={AppBarTab}>Sign in</Link>}
        {!signedIn && <Link to="/signup" component={AppBarTab}>Sign up</Link>}
      </ScrollView>
    </View>
  );     
};

export default AppBar;