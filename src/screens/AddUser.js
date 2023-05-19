import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddUser = ({navigation}) => {

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
 
  });

  const [errors, setErrors] = useState({});

  const handleChange = (fieldName, value) => {
    setForm({...form, [fieldName]: value});
  };

  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const validateForm = () => {
    let validationErrors = {};

    if (!form.name) {
      validationErrors.name = 'Name is required';
    }
    if (!form.username) {
      validationErrors.username = 'userName is required';
    }

    if (!form.email) {
      validationErrors.email = 'Email is required';
    } else if (!form.email.match(validRegex)) {
      validationErrors.email = 'Invalid email format';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    let id = Math.random() * 100;

    const {name, username, email} = form;
    if (isValid) {
      navigation.navigate('Home', {name, username, email, id});
    }
  };

  return (
    <View style={styles.contaier}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={form.name}
          onChangeText={value => handleChange('name', value)}
          placeholderTextColor={'black'}
          keyboardType="string"
          maxLength={20}
        />
        {errors.name && <Text style={styles.errorstext}>{errors.name}</Text>}
        <TextInput
          style={styles.input}
          placeholderTextColor={'black'}
          onChangeText={value => handleChange('username', value)}
          value={form.username}
          placeholder="Enter userName"
          keyboardType="string"
          maxLength={20}
        />
        {errors.name && (
          <Text style={styles.errorstext}>{errors.username}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChangeText={value => handleChange('email', value)}
          placeholderTextColor={'black'}
          keyboardType="string"
          maxLength={20}
        />
        {errors.email && <Text style={styles.errorstext}>{errors.email}</Text>}
      </View>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.btnContainer}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  contaier: {
    marginHorizontal: 10,
    // marginBottom:10
  },
  textInputContainer: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    color: 'black',
    marginTop: 10,
  },
  btnContainer: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  submitText: {
    alignSelf: 'center',
    fontSize: 18,
  },
  errorstext: {
    color: 'red',
  },
});
