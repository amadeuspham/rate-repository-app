import { useContext } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { AUTHORIZE_USER } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useHistory } from 'react-router-native';

const useSignIn = () => {
  const history = useHistory();
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHORIZE_USER);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: {username, password} });
    if(data?.authorize) {
      await authStorage.setAccessToken(data.authorize.accessToken);
      await apolloClient.resetStore();
      history.push('/');
    }
    return data;
  };

  return [signIn, result];
};

export default useSignIn;