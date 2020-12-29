import { useQuery } from '@apollo/react-hooks';
import { REPOSITORY_REVIEWS } from '../graphql/queries';

const useReviews = (variables) => {
  const { data, error, loading, fetchMore } = useQuery(REPOSITORY_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: REPOSITORY_REVIEWS,
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResults = {
          repository: {
            ...previousResult.repository,
            reviews: {
              ...previousResult.repository.reviews,
              edges: [
                ...previousResult.repository.reviews.edges,
                ...fetchMoreResult.repository.reviews.edges,
              ],
              pageInfo: fetchMoreResult.repository.reviews.pageInfo
            }
          }
        };

        return nextResults;
      },
    });
  };

  let reviews = {};
  if (data && !error) {
    reviews = data.repository.reviews.edges.map(edge => edge.node);
  }

  return { 
    reviews,
    fetchMore: handleFetchMore,
    loading 
  };
};

export default useReviews;