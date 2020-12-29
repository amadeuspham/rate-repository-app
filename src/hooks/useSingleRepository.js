import { useQuery } from '@apollo/react-hooks';
import { SINGLE_REPOSITORY } from '../graphql/queries';

const useSingleRepository = (id) => {
  const { data, error, loading } = useQuery(SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  let singleRepository = [];

  if (data && !error) {
    singleRepository = data.repository;
  }

  return { 
    singleRepository,
    loading 
  };
};

export default useSingleRepository;