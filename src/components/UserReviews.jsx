import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';
import useUserReviews from '../hooks/useUserReviews';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { userReviews } = useUserReviews({includeReviews: true});

  return (
    <FlatList
      data={userReviews}
      renderItem={({ item }) => <ReviewItem review={item} userReviewsMode={true}/>}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default UserReviews;