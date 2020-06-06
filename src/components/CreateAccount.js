import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import ShowMessage, {type} from '../toster/ShowMessage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

export default class CreateAccount extends React.Component {
  state = {
    loading: false,
    showPassword: true,
    email: '',
    name: '',
    phoneNumber: '',
    password: '',
  };

  static navigationOptions = {headerShown: false};

  toggleSwitch = () => {
    this.setState((prevState) => ({showPassword: !prevState.showPassword}));
  };

  render() {
    const validationSchema = yup.object().shape({
      email: yup.string().required().email(),
      password: yup.string().required().min(6),
      name: yup.string().required(),
    });
    return (
      <Formik
        initialValues={{
          email: '',
          name: '',
          phoneNumber: '',
          password: '',
        }}
        onSubmit={async (values) => {
          this.setState({loading: true});
          try {
            const register = await auth().createUserWithEmailAndPassword(
              values.email,
              values.password,
            );
            if (register.user) {
              const {user} = register;
              await firestore().collection('users').doc(user.uid).set({
                display_name: values.name,
                email: values.email.toLowerCase(),
                phone_number: values.phoneNumber,
                created_at: new Date(),
              });
              const token = user.uid;
              await AsyncStorage.setItem('token', token);
              this.setState({loading: false});
              ShowMessage(type.DONE, 'Successfuly Registered');
              this.props.navigation.navigate('Terms');
            }
          } catch (e) {
            this.setState({loading: false});
            let err = e.message.split(' ');
            err.shift();
            ShowMessage(type.ERROR, err.join(' '));
            console.log(err.join(' '));
          }
        }}
        validationSchema={validationSchema}>
        {({
          values,
          handleChange,
          errors,
          setFieldValue,
          setFieldTouched,
          touched,
          isValid,
          handleBlur,
          handleSubmit,
        }) => (
          <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              keyboardShouldPersistTaps={'handled'}>
              <View style={styles.container}>
                <View>
                  <Text style={styles.head}>Create account</Text>
                  <Text style={styles.subText}>
                    "Please fill in the following details. This would allow
                    someone contact you in an emergency."
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 46,
                  }}>
                  <View style={styles.inputDiv}>
                    <TextInput
                      keyboardType="default"
                      style={styles.input}
                      placeholderTextColor="#979797"
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      placeholder="User name"
                      name="name"
                    />
                    {touched.name && errors.name && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.name}
                      </Text>
                    )}
                  </View>
                  <View style={styles.inputDiv}>
                    <TextInput
                      keyboardType="email-address"
                      style={styles.input}
                      placeholderTextColor="#979797"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      placeholder="Email"
                      name="email"
                    />
                    {touched.email && errors.email && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.email}
                      </Text>
                    )}
                  </View>
                  <View style={styles.inputDiv}>
                    <TextInput
                      keyboardType="number-pad"
                      style={styles.input}
                      placeholderTextColor="#979797"
                      value={values.phoneNumber}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      placeholder="Phone number(Optional)"
                      name="phoneNumber"
                    />
                  </View>
                  <View style={styles.inputDiv}>
                    <View style={styles.passwordMenu}>
                      <TextInput
                        keyboardType="default"
                        placeholderTextColor="#979797"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        placeholder="Password"
                        name="password"
                        style={{width: '90%'}}
                        secureTextEntry={this.state.showPassword}
                      />
                      <TouchableWithoutFeedback onPress={this.toggleSwitch}>
                        <View>
                          {this.state.showPassword ? (
                            <FontAwesome
                              name="eye-slash"
                              size={20}
                              color="rgba(0, 0, 0, 0.5)"
                            />
                          ) : (
                            <FontAwesome
                              name="eye"
                              size={20}
                              color="rgba(0, 0, 0, 0.5)"
                            />
                          )}
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                    {touched.password && errors.password && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.password}
                      </Text>
                    )}
                  </View>
                  <View>
                    <TouchableNativeFeedback onPress={handleSubmit}>
                      <View style={styles.signupbox}>
                        {this.state.loading ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <Text style={styles.signuptext}>Create account</Text>
                        )}
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                  <View style={styles.footTextDiv}>
                    <Text style={(styles.footText, {marginRight: 10})}>
                      Already have an account?
                    </Text>
                    <TouchableWithoutFeedback
                      onPress={() => this.props.navigation.navigate('Login')}>
                      <View>
                        <Text
                          style={
                            (styles.footText,
                            {
                              color: '#564FF5',
                            })
                          }>
                          Log in
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '85%',
    paddingVertical: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 27,
    marginRight: 27,
  },
  passwordMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: '#DADADA',
    borderRadius: 4,
    borderStyle: 'solid',
    padding: 7,
    paddingHorizontal: 10,
    width: '100%',
  },
  input1: {
    width: '70%',
    color: 'white',
  },
  input: {
    color: '#1D1C1C',
    borderWidth: 0.8,
    borderColor: '#DADADA',
    borderRadius: 4,
    borderStyle: 'solid',
    padding: 15,
    width: '100%',
  },
  inputDiv: {
    marginBottom: 20,
  },
  head: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 25,
    fontStyle: 'normal',
    fontFamily: 'SF Pro Display',
    lineHeight: 43,
  },
  subText: {
    color: '#000000',
    fontSize: 15,
    fontFamily: 'SF Pro Display',
    lineHeight: 18,
  },
  signupbox: {
    backgroundColor: '#564FF5',
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  signuptext: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    fontFamily: 'SF Pro Display',
    alignSelf: 'center',
    lineHeight: 18,
    fontStyle: 'normal',
  },
  alreadyhaveanaccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  opacity: {
    textAlign: 'center',
    color: 'yellow',
    fontSize: 14,
  },
  footTextDiv: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 27,
  },
  footText: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
  },
});
