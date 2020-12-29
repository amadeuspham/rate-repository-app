import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import useCreateReview from '../hooks/useCreateReview';
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
  repositoryName: '',
  ownerName: '',
  rating: 0,
  text: ''
};

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" style={styles.input} />
      <FormikTextInput name="repositoryName" placeholder="Repository name" style={styles.input}/>
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" style={styles.input} />
      <FormikTextInput name="text" placeholder="Review" multiline={true} style={styles.input}/>
      <TouchableWithoutFeedback onPress={onSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Create a review</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const validationSchema = yup.object().shape({
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Minimum value for ratings is 0')
    .max(100, 'Maximum value for ratings is 100'),
  text: yup
    .string(),
});

export const CreateReviewContainer = ({onSubmit}) => {
  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const [submitReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      const data = await submitReview({ repositoryName, ownerName, rating, text });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CreateReviewContainer onSubmit={onSubmit}/>
  );
};

export default CreateReview;