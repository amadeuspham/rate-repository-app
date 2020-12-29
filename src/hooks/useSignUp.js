import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [createUser, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    const { data } = await createUser({ variables: {username, password} });
    return data;
  };

  return [signUp, result];
};

export default useSignUp;