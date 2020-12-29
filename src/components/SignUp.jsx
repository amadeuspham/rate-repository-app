import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';
import theme from '../theme';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
  },
  input: {
    height: 40, 
    margin: 10,
    padding: 10
  },
  button: {
    height: 40,
    margin: 10,
    padding: 10,
    backgroundColor: theme.colors.primary
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  }
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: ''
};

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username"placeholder="Username" style={styles.input} />
      <FormikTextInput name="password" placeholder="Password" style={styles.input} secureTextEntry={true} />
      <FormikTextInput name="passwordConfirm" placeholder="Password confirmation" style={styles.input} secureTextEntry={true} />
      <TouchableWithoutFeedback onPress={onSubmit} testID="submitButton">
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .required('Password confirm is required')
});

export const SignUpContainer = ({onSubmit}) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const signUpData = await signUp({ username, password });
      console.log(signUpData);
      const signInData = await signIn({ username, password });
      console.log(signInData);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit}/>
  );
};

export default SignUp;