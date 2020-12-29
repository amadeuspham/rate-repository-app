import { useMutation } from '@apollo/react-hooks';
import { DELETE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const removeReview = async ({ id }) => {
    await deleteReview({ variables: { id } });
  };

  return [removeReview];
};

export default useCreateReview;