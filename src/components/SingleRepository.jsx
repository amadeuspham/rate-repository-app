import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useSingleRepository from '../hooks/useSingleRepository';
import useReviews from '../hooks/useReviews';
import {
  useParams
} from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  let { id } = useParams();
  const { singleRepository } = useSingleRepository(id);
  const { reviews, fetchMore } = useReviews({id, first: 10});

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} userReviewsMode={false} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repoInfo={singleRepository} singleView={true}/>}
      ItemSeparatorComponent={ItemSeparator}
      onEndReach={onEndReach}
    />
  );
};

export default SingleRepository;