import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  ScrollView,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {Formik} from 'formik';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import ShowMessage, {type} from '../toster/ShowMessage';

class Health extends React.Component {
  state = {
    sliderValue: 43,
    loading: false,
  };

  static navigationOptions = {headerShown: false};

  render() {
    return (
      <Formik
        initialValues={{
          daily: 'No',
          heart: 'No',
          diabetes: 'No',
          asthma: 'No',
          smoker: 'No',
          cancer: 'No',
          suppresant: 'No',
          ibuprofen: 'No',
          pril: 'No',
          covid: 'No',
          cough: 'No',
          home: 'No',
        }}
        onSubmit={async (values) => {
          const token = await AsyncStorage.getItem('token');
          const id = firestore().collection('healths').doc().id;
          this.setState({loading: true});
          try {
            await firestore().collection('healths').doc(id).set({
              uid: id,
              userId: token,
              created_at: new Date(),
              has_any_health_condition_that_requires_to_stay_at_home:
                values.home,
              has_classic_symptoms_for_the_past_3_days: values.cough,
              has_diabetes: values.diabetes,
              has_heart_diesease: values.heart,
              has_lung_diesease_or_asthma: values.asthma,
              has_pre_existing_health_conditions: values.daily,
              has_taken_antipyretics_in_the_past_3_days: values.ibuprofen,
              has_undergo_chemotherapy_radiotherapy_or_immunotherapy_for_cancer:
                values.cancer,
              is_a_smoker: values.smoker,
              is_currently_taking_immunosuppressant: values.suppresant,
              is_taking_blood_pressure_medications_ending_in_pril: values.pril,
              think_you_have_COVID19_but_not_been_tested: values.covid,
            });

            await firestore().collection('users').doc(token).update({
              healthId: id,
              updated_at: new Date(),
            });

            this.setState({loading: false});
            this.props.navigation.navigate('Covid');
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
                  Now, let’s talk about your health
                </Text>
                <Slider
                  style={styles.slider}
                  thumbTintColor="#2560FB"
                  minimumTrackTintColor="#2560FB"
                  maximumValue={100}
                  minimumValue={0}
                  step={1}
                  value={this.state.sliderValue}
                  onValueChange={(sliderValue) => this.setState({sliderValue})}
                />
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Do you have any pre existing health condition that limits
                    your daily activities?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      selectedValue={values.daily}
                      onBlur={handleBlur('daily')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('daily', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#323232" />
                      <Picker.Item label="Yes" value="Yes" color="#323232" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Do you have any heart disease?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      selectedValue={values.heart}
                      onBlur={handleBlur('heart')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('heart', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#323232" />
                      <Picker.Item label="Yes" value="Yes" color="#323232" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>Do you have diabetes?</Text>
                  <View style={styles.picker}>
                    <Picker
                      selectedValue={values.diabetes}
                      onBlur={handleBlur('diabetes')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('diabetes', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#323232" />
                      <Picker.Item label="Yes" value="Yes" color="#323232" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Do you have any lung disease or asthma?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      selectedValue={values.asthma}
                      onBlur={handleBlur('asthma')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('asthma', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#323232" />
                      <Picker.Item label="Yes" value="Yes" color="#323232" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>Are you a smoker?</Text>
                  <View style={styles.picker}>
                    <Picker
                      selectedValue={values.smoker}
                      onBlur={handleBlur('smoker')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('smoker', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#323232" />
                      <Picker.Item label="Yes" value="Yes" color="#323232" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Do you undergo chemotherapy, radiotherapy or immunotherapy
                    for cancer?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      selectedValue={values.cancer}
                      onBlur={handleBlur('cancer')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('cancer', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#323232" />
                      <Picker.Item label="Yes" value="Yes" color="#323232" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Are you currently taking immunosuppressant?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      selectedValue={values.suppresant}
                      onBlur={handleBlur('suppresant')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('suppresant', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#323232" />
                      <Picker.Item label="Yes" value="Yes" color="#323232" />
                    </Picker>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Have you taken antipyretics(e.g Paracetamol , Ibuprofen or
                      Diclofenac) in the past 3 days?
                    </Text>
                    <View style={styles.picker}>
                      <Picker
                        selectedValue={values.ibuprofen}
                        onBlur={handleBlur('ibuprofen')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('ibuprofen', itemValue)
                        }>
                        <Picker.Item label="No" value="No" color="#323232" />
                        <Picker.Item label="Yes" value="Yes" color="#323232" />
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Are you regularly taking blood pressure medications ending
                      in “-pril”, such as enalapril, ramipril, perindopril?
                    </Text>
                    <View style={styles.picker}>
                      <Picker
                        selectedValue={values.pril}
                        onBlur={handleBlur('pril')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('pril', itemValue)
                        }>
                        <Picker.Item label="No" value="No" color="#323232" />
                        <Picker.Item label="Yes" value="Yes" color="#323232" />
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Do you think you have COVID-19, but you’ve not been
                      tested?
                    </Text>
                    <View style={styles.picker}>
                      <Picker
                        selectedValue={values.covid}
                        onBlur={handleBlur('covid')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('covid', itemValue)
                        }>
                        <Picker.Item label="No" value="No" color="#323232" />
                        <Picker.Item label="Yes" value="Yes" color="#323232" />
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Have you been having the classic symptoms(high grade fever
                      and persistent cough) for the past 3 days or more?
                    </Text>
                    <View style={styles.picker}>
                      <Picker
                        selectedValue={values.cough}
                        onBlur={handleBlur('cough')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('cough', itemValue)
                        }>
                        <Picker.Item label="No" value="No" color="#323232" />
                        <Picker.Item label="Yes" value="Yes" color="#323232" />
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      In general, do you have any health condition that requires
                      you to stay at home?
                    </Text>
                    <View style={styles.picker}>
                      <Picker
                        selectedValue={values.home}
                        onBlur={handleBlur('home')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('home', itemValue)
                        }>
                        <Picker.Item label="No" value="No" color="#323232" />
                        <Picker.Item label="Yes" value="Yes" color="#323232" />
                      </Picker>
                    </View>
                  </View>
                </View>
                <TouchableNativeFeedback onPress={handleSubmit}>
                  <View style={styles.signupbox}>
                    {this.state.loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.signuptext}>Next</Text>
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

export default Health;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 30,
    justifyContent: 'center',
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
    width: '85%',
  },
  slider: {
    width: '110%',
  },
  picker: {
    width: '100%',
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: '#DADADA',
    color: '#979797',
  },
  picker1: {
    width: '100%',
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: '#DADADA',
    color: '#979797',
  },
  section: {
    width: '100%',
    marginTop: 25,
  },
  sectionText: {
    marginBottom: 6,
    letterSpacing: 0.0646154,
    color: '#373C3C',
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: '500',
  },
  calendarStyle: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: 'normal',
    color: '#979797',
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
  footerText: {
    marginTop: 21,
    marginBottom: 38,
    color: '#373C3C',
    fontSize: 10,
    lineHeight: 12,
    fontFamily: 'SF Pro Display',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
});
