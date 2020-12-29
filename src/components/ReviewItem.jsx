import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { format } from 'date-fns';
import {
  useHistory
} from "react-router-native";
import useDeleteReview from '../hooks/useDeleteReview';
import useUserReviews from '../hooks/useUserReviews';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,
  },
  reviewView: {
    display: 'flex',
    flexDirection: 'row',
  },
  rating: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderColor: theme.colors.primary,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ratingNumber: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 20
  }, 
  reviewContent: {
    marginLeft: 10
  },
  username: {
    marginVertical: 2,
  },
  date: {
    marginVertical: 2,
  },
  textArea: {
    marginLeft: 70
  },
  actionRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  viewButton: {
    flexGrow: 1,
    height: 40,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    backgroundColor: theme.colors.primary
  },
  deleteButton: {
    flexGrow: 1,
    height: 40,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    backgroundColor: 'red'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  }
});

const ActionRow = ({reviewId, repositoryId}) => {
  let history = useHistory();
  const [removeReview] = useDeleteReview();
  const { refetch } = useUserReviews({includeReviews: true});

  const onViewClicked = (repositoryId) => {
    history.push(`/repositories/${repositoryId}`);
  };

  const deleteReview = async (reviewId) => {
    try {
      await removeReview({id: reviewId});
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const showDeleteAlert = async (reviewId) =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: async () => await deleteReview(reviewId) }
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.actionRow}>
      <TouchableOpacity style={styles.viewButton} onPress={() => onViewClicked(repositoryId)}>
        <Text style={styles.buttonText} fontWeight={'bold'}>
          View repository
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={async () => await showDeleteAlert(reviewId)}>
      <Text style={styles.buttonText} fontWeight={'bold'}>
          Delete review
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ReviewItem = ({ review, userReviewsMode }) => {
  const {rating, user, createdAt, text, repositoryId, id} = review;
  const repoAddress = repositoryId.replace(".", "/");
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewView}>
        <View style={styles.rating}>
          <Text style={styles.ratingNumber}>{rating}</Text>
        </View>
        <View style={styles.reviewContent}>
          <Text style={styles.username} fontWeight={'bold'} fontSize={'subheading'}>
            {userReviewsMode ? repoAddress : user.username}
          </Text>
          <Text style={styles.date} color={'textSecondary'} fontSize={'subheading'}>{format(new Date(createdAt), 'dd/MM/yyyy')}</Text>
        </View>
      </View>
      <View style={styles.textArea}>
        <Text style={styles.text}>{text}</Text>
      </View>
      {userReviewsMode && <ActionRow repositoryId={repositoryId} reviewId={id}/>}
    </View>
  );
};

export default ReviewItem;