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
  Picker,
  KeyboardAvoidingView,
} from 'react-native';
import {Formik} from 'formik';
import Aegle from '../assets/aegle.svg';
import * as yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';

export default class TalkToADoctor extends React.Component {
  state = {
    loading: false,
    email: '',
    number: '',
    appointmentTime: '',
    appointmentReason: '',
  };

  static navigationOptions = {headerShown: false};

  render() {
    const validationSchema = yup.object().shape({
      email: yup.string().required(),
      number: yup.string().required(),
      appointmentTime: yup.string().required(),
      appointmentReason: yup.string().required(),
    });
    return (
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.container}>
            <View>
              <Aegle height={45} width={37} style={{alignSelf: 'center'}} />
              <Text style={styles.head}>Hi there, I’m Aegle</Text>
              <Text style={styles.subText}>
                I take care of your health, so you can kick back and enjoy life
              </Text>
              <Text style={styles.subText2}>
                Talk to a doctor with a single click. Save the time wasted at
                hospital waiting rooms and allow patients with more complex
                problems get maximum attention at hospitals.
              </Text>
              <Text style={styles.subText3}>
                Enter your details below to get started.
              </Text>
            </View>
            <View
              style={{
                marginTop: 46,
              }}>
              <Formik
                initialValues={{
                  email: '',
                  number: '',
                  appointmentTime: '',
                  appointmentReason: '',
                }}
                onSubmit={values => {
                  AsyncStorage.clear();
                  this.props.navigation.navigate('CreateAccount');
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
                  <View>
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
                      <View style={styles.error}>
                        {touched.email && errors.email && (
                          <Text style={{fontSize: 10, color: 'red'}}>
                            {errors.email}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View style={styles.inputDiv}>
                      <TextInput
                        keyboardType="number-pad"
                        style={styles.input}
                        placeholderTextColor="#979797"
                        value={values.number}
                        onChangeText={handleChange('number')}
                        onBlur={handleBlur('number')}
                        placeholder="Phone number"
                        name="number"
                      />
                      <View style={styles.error}>
                        {touched.number && errors.number && (
                          <Text style={{fontSize: 10, color: 'red'}}>
                            {errors.number}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View style={{marginBottom: 15}}>
                      <View style={styles.picker}>
                        <Picker
                          onChangeText={handleChange('appointmentTime')}
                          selectedValue={values.appointmentTime}
                          onBlur={handleBlur('appointmentTime')}
                          onValueChange={(itemValue, itemIndex) =>
                            setFieldValue('appointmentTime', itemValue)
                          }>
                          <Picker.Item
                            label="Appointment time"
                            value="Abia"
                            color="#323232"
                          />
                          <Picker.Item
                            label="12am"
                            value="12"
                            color="#323232"
                          />
                        </Picker>
                      </View>
                      <View style={styles.error}>
                        {touched.appointmentTime && errors.appointmentTime && (
                          <Text style={{fontSize: 10, color: 'red'}}>
                            appointment time is a required field
                          </Text>
                        )}
                      </View>
                    </View>
                    <View style={styles.input}>
                      <TextInput
                        placeholder="Enter reason for appointment"
                        keyboardType="default"
                        placeholderTextColor="#979797"
                        value={values.appointmentReason}
                        onChangeText={handleChange('appointmentReason')}
                        onBlur={handleBlur('appointmentReason')}
                        name="appointmentReason"
                        multiline={true}
                        numberOfLines={5}
                        style={{textAlignVertical: 'top'}}
                      />
                    </View>
                    <View style={styles.error}>
                      {touched.appointmentReason &&
                        errors.appointmentReason && (
                          <Text style={{fontSize: 10, color: 'red'}}>
                            appointment reason is a required field
                          </Text>
                        )}
                    </View>
                    <View>
                      <TouchableNativeFeedback onPress={handleSubmit}>
                        <View style={styles.signupbox}>
                          <Text style={styles.signuptext}>
                            Talk to a doctor
                          </Text>
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                  </View>
                )}
              </Formik>
              <View style={styles.footTextDiv}>
                <Text style={styles.footText1}>
                  This is a FREE service to support you during COVID-19 crisis.
                </Text>
              </View>
              <View style={styles.footButtonDiv}>
                <TouchableWithoutFeedback>
                  <View>
                    <Text style={styles.footButton}>About us</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <View>
                    <Text style={styles.footButton}>Contact us</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <View>
                    <Text style={styles.footButton}>Terms</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                  <View>
                    <Text style={styles.footButton}>Privacy Policy</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <Text style={styles.footNote}>
                © Aegle 2020 - All rights reserved
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingTop: 54,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 27,
    marginRight: 27,
  },
  head: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 17,
    fontStyle: 'normal',
    fontFamily: 'SF Pro Display',
    lineHeight: 43,
    textAlign: 'center',
    marginTop: 21.7,
  },
  picker: {
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#DADADA',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: 30,
    borderStyle: 'solid',
    paddingHorizontal: 19,
    paddingVertical: 16,
    color: '#323232',
  },
  inputDiv: {
    marginBottom: 20,
  },
  subText: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    lineHeight: 17,
    width: '90%',
    alignSelf: 'center',
  },
  subText2: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    lineHeight: 17,
    width: '94.2%',
    textAlign: 'center',
    marginTop: 37,
  },
  subText3: {
    color: '#000000',
    marginTop: 17,
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    lineHeight: 17,
    width: '90%',
    textAlign: 'center',
  },
  signupbox: {
    backgroundColor: '#2A3DFA',
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
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
  footTextDiv: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 17,
  },
  footText1: {
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    fontFamily: 'SF Pro Display',
    color: '#595959',
  },
  footButtonDiv: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  footButton: {
    color: '#1B2CC1',
    lineHeight: 17,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'SF Pro Display',
  },
  footNote: {
    color: '#000',
    fontSize: 14,
    lineHeight: 40,
    fontFamily: 'SF Pro Display',
    marginTop: 40,
  },
  error: {
    paddingLeft: 20,
  },
});
