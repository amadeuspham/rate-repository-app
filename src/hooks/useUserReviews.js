import { useQuery } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';

const useUserReviews = (variables) => {
  const { data, error, refetch } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  let userReviews = [];

  if (data && !error) {
    userReviews = data.authorizedUser.reviews.edges.map(edge => edge.node);
  }

  return { 
    userReviews,
    refetch
  };
};

export default useUserReviews;