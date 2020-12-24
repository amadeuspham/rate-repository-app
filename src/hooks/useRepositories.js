import { useQuery } from '@apollo/react-hooks';
import { REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  let repositories = [];

  if (data && !error) {
    repositories = data.repositories.edges.map(edge => edge.node);
  }

  return { 
    repositories,
    loading 
  };
};

export default useRepositories;