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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ShowMessage, {type} from '../toster/ShowMessage';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.Component {
  state = {
    loading: false,
    showPassword: true,
    email: '',
    password: '',
  };

  static navigationOptions = {headerShown: false};

  toggleSwitch = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}));
  };

  render() {
    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .required()
        .email(),
      password: yup
        .string()
        .required()
        .min(6),
    });
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async values => {
          this.setState({loading: true});
          try {
            const login = await auth().signInWithEmailAndPassword(
              values.email.toLowerCase(),
              values.password,
            );
            this.setState({loading: false});
            if (login.user) {
              const {user} = login;
              const documentSnapshot = await firestore()
                .collection('users')
                .doc(user.uid)
                .get();
              const token = user.uid;
              await AsyncStorage.setItem('token', token);
              this.props.navigation.navigate('Basic');
            }
          } catch (e) {
            this.setState({loading: false});
            let err = e.message.split(' ');
            err.shift();
            ShowMessage(type.ERROR, err.join(' '));
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
                  <Text style={styles.head}>Log in</Text>
                  <Text style={styles.subText}>
                    Enter your email and password to login to your account
                  </Text>
                </View>
                <View
                  style={{
                    paddingTop: 45,
                  }}>
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
                    <View style={styles.passwordMenu}>
                      <TextInput
                        keyboardType="default"
                        style={{width: '90%'}}
                        placeholderTextColor="#979797"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        placeholder="Password"
                        name="password"
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
                          <Text style={styles.signuptext}>Login</Text>
                        )}
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                  <View style={styles.footTextDiv}>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.props.navigation.navigate('ForgotPassword')
                      }>
                      <View>
                        <Text
                          style={
                            (styles.footText,
                            {
                              color: '#564FF5',
                            })
                          }>
                          Forgot password?
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <View style={styles.footTextDiv1}>
                    <Text style={(styles.footText, {marginRight: 10})}>
                      Don’t have account?
                    </Text>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        this.props.navigation.navigate('CreateAccount')
                      }>
                      <View>
                        <Text
                          style={
                            (styles.footText,
                            {
                              color: '#564FF5',
                            })
                          }>
                          Register
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
  footTextDiv1: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  footText: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 17,
  },
});
