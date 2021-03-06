import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import SingleRepository from './SingleRepository';
import { Route, Switch, Redirect } from 'react-router-native';
import theme from '../theme';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/repositories/:id">
          <SingleRepository />
        </Route>
        <Route path="/createReview">
          <CreateReview />
        </Route>
        <Route path="/userReviews">
          <UserReviews />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;