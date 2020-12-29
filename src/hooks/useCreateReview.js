import { useMutation } from '@apollo/react-hooks';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useHistory } from 'react-router-native';

const useCreateReview = () => {
  const history = useHistory();
  const [createReview] = useMutation(CREATE_REVIEW);

  const submitReview = async ({ repositoryName, ownerName, rating, text }) => {
    const ratingNum = parseInt(rating);
    const { data } = await createReview({ variables: { repositoryName, ownerName, rating: ratingNum, text } });
    
    if (data?.createReview) {
      const {repositoryId} = data.createReview;
      history.push(`/repositories/${repositoryId}`);
    }
    return data;
  };

  return [submitReview];
};

export default useCreateReview;