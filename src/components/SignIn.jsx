import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import useSignIn from '../hooks/useSignIn';
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
    color: 'white'
  }
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={styles.input} />
      <FormikTextInput name="password" placeholder="Password" style={styles.input} secureTextEntry={true} />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
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
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;