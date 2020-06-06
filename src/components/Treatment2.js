import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {Formik} from 'formik';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import ShowMessage, {type} from '../toster/ShowMessage';

class Treatment extends React.Component {
  state = {
    sliderValue: 100,
    loading: false,
  };

  static navigationOptions = {headerShown: false};

  render() {
    return (
      <Formik
        initialValues={{
          optional: '',
        }}
        onSubmit={async values => {
          const token = await AsyncStorage.getItem('token');
          this.setState({loading: true});
          try {
            await firestore()
              .collection('users')
              .doc(token)
              .update({
                treatments: {
                  current_treatment: 'Other treatment',
                  description: values.optional,
                },
                updated_at: new Date(),
              });
            this.setState({loading: false});
            this.props.navigation.navigate('Final');
          } catch (e) {
            this.setState({loading: false});
            let err = e.message.split(' ');
            err.shift();
            ShowMessage(type.ERROR, err.join(' '));
            console.log(err.join(' '));
          }
        }}>
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
              <View style={styles.main}>
                <Text style={styles.head}>
                  What medical treatment are you receiving?
                </Text>
                <Slider
                  style={styles.slider}
                  thumbTintColor="#2560FB"
                  minimumTrackTintColor="#2560FB"
                  maximumValue={100}
                  minimumValue={0}
                  step={1}
                  value={this.state.sliderValue}
                  onValueChange={sliderValue => this.setState({sliderValue})}
                />
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    What medical treatment are you receiving?
                  </Text>
                  <View style={styles.picker}>
                    <TextInput
                      placeholder="Optional"
                      keyboardType="default"
                      placeholderTextColor="#979797"
                      value={values.optional}
                      onChangeText={handleChange('optional')}
                      onBlur={handleBlur('optional')}
                      name="optional"
                      multiline={true}
                      numberOfLines={6}
                      style={{textAlignVertical: 'top'}}
                    />
                  </View>
                </View>
                <TouchableNativeFeedback onPress={handleSubmit}>
                  <View style={styles.signupbox}>
                    {this.state.loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.signuptext}>Done</Text>
                    )}
                  </View>
                </TouchableNativeFeedback>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Formik>
    );
  }
}

export default Treatment;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 80,
  },
  head: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 18,
    fontStyle: 'normal',
    fontFamily: 'SF Pro Display',
    marginTop: 6,
    lineHeight: 29,
    textAlign: 'center',
    width: '90%',
  },
  slider: {
    width: '100%',
  },
  picker: {
    width: '100%',
    paddingHorizontal: 19,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DADADA',
    paddingVertical: 10,
    color: '#323232',
  },
  section: {
    width: '100%',
    marginTop: 25,
  },
  sectionText: {
    marginBottom: 16,
    letterSpacing: 0.0646154,
    color: '#373C3C',
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: '500',
  },
  signupbox: {
    backgroundColor: '#564FF5',
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 56,
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
