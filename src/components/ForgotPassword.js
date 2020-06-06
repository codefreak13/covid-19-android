import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import Arrow from '../assets/arrow.svg';
import ShowMessage, {type} from '../toster/ShowMessage';
import auth from '@react-native-firebase/auth';

export default class ForgotPassword extends React.Component {
  state = {
    loading: false,
    email: '',
  };

  static navigationOptions = {headerShown: false};

  render() {
    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .required()
        .email(),
    });
    return (
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={async values => {
          this.setState({loading: true});
          try {
            await auth().sendPasswordResetEmail(values.email.toLowerCase());
            this.setState({loading: false});
            ShowMessage(type.DONE, 'Mail sent, Please check your mailbox.');
            values.email = '';
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
                  <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.goBack()}>
                    <View>
                      <Arrow />
                    </View>
                  </TouchableWithoutFeedback>
                  <Text style={styles.head}>Forgot Password</Text>
                  <Text style={styles.subText}>
                    To reset your password, enter your email address below and
                    follow the instructions inthe reset link we’ll send to you.
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
                      placeholder="Enter email address"
                      name="email"
                    />
                    {touched.email && errors.email && (
                      <Text style={{fontSize: 10, color: 'red'}}>
                        {errors.email}
                      </Text>
                    )}
                  </View>
                  <View>
                    <TouchableNativeFeedback onPress={handleSubmit}>
                      <View style={styles.signupbox}>
                        {this.state.loading ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <Text style={styles.signuptext}>Reset</Text>
                        )}
                      </View>
                    </TouchableNativeFeedback>
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
    paddingVertical: 50,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginLeft: 27,
    marginRight: 27,
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
    marginTop: 81,
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
});
