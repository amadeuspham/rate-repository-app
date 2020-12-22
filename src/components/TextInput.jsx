import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  errorMode: {
    borderWidth: 1,
    borderColor: 'red'
  }
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, error && styles.errorMode];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;