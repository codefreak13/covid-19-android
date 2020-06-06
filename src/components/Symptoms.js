import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
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

class Symptoms extends React.Component {
  state = {
    sliderValue: 61,
    loading: false,
  };

  static navigationOptions = {headerShown: false};

  render() {
    return (
      <Formik
        initialValues={{
          fever: 'No',
          temperature: '',
          tempScale: 'C',
          coughEpisodes: 'No',
          fatigue: 'No',
          breathing: 'No',
          soreThroat: 'No',
          headache: 'No',
          chestPain: 'No',
          abdominalPain: 'No',
          diarrhoea: 'No',
          drowsiness: 'No',
          meals: 'No',
          taste: 'No',
          voice: 'No',
        }}
        onSubmit={async (values) => {
          const token = await AsyncStorage.getItem('token');

          const documentSnapshot = await firestore()
            .collection('users')
            .doc(token)
            .get();
          const symptomsId = documentSnapshot._data.symptomsId;

          this.setState({loading: true});
          if (symptomsId) {
            try {
              await firestore().collection('symptoms').doc(symptomsId).update({
                uid: symptomsId,
                userId: token,
                updated_at: new Date(),
                has_fever_or_a_high_temperature: values.fever,
                temperature: values.temperature,
                temperature_scale: values.tempScale,
                has_persistent_cough: values.coughEpisodes,
                is_feeling_unwell_or_experiencing_fatigue: values.fatigue,
                has_difficulty_breathing: values.breathing,
                has_sore_throat: values.soreThroat,
                has_headache: values.headache,
                has_chest_pain_or_chest_tightness: values.chestPain,
                has_an_unusual_abdominal_pain: values.abdominalPain,
                is_experiencing_diarrhoea: values.diarrhoea,
                is_experiencing_confusion_disorientation_or_drowsiness:
                  values.drowsiness,
                has_been_skipping_meals: values.meals,
                has_loss_of_smell_or_taste: values.taste,
                has_an_unusually_hoarse_voice: values.voice,
              });

              this.setState({loading: false});
              this.props.navigation.navigate('Location');
            } catch (e) {
              this.setState({loading: false});
              let err = e.message.split(' ');
              err.shift();
              ShowMessage(type.ERROR, err.join(' '));
              console.log(err.join(' '));
            }
          } else {
            const id = firestore().collection('symptoms').doc().id;
            try {
              await firestore().collection('symptoms').doc(id).set({
                uid: id,
                userId: token,
                created_at: new Date(),
                has_fever_or_a_high_temperature: values.fever,
                temperature: values.temperature,
                temperature_scale: values.tempScale,
                has_persistent_cough: values.coughEpisodes,
                is_feeling_unwell_or_experiencing_fatigue: values.fatigue,
                has_difficulty_breathing: values.breathing,
                has_sore_throat: values.soreThroat,
                has_headache: values.headache,
                has_chest_pain_or_chest_tightness: values.chestPain,
                has_an_unusual_abdominal_pain: values.abdominalPain,
                is_experiencing_diarrhoea: values.diarrhoea,
                is_experiencing_confusion_disorientation_or_drowsiness:
                  values.drowsiness,
                has_been_skipping_meals: values.meals,
                has_loss_of_smell_or_taste: values.taste,
                has_an_unusually_hoarse_voice: values.voice,
              });

              await firestore().collection('users').doc(token).update({
                symptomsId: id,
                updated_at: new Date(),
              });

              this.setState({loading: false});
              this.props.navigation.navigate('Location');
            } catch (e) {
              this.setState({loading: false});
              let err = e.message.split(' ');
              err.shift();
              ShowMessage(type.ERROR, err.join(' '));
              console.log(err.join(' '));
            }
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
                  Describe the symptoms you are experiencing right now
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
                    Do you have fever or a high temperature?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('fever')}
                      selectedValue={values.fever}
                      onBlur={handleBlur('fever')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('fever', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#323232" />
                      <Picker.Item label="Yes" value="Yes" color="#323232" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    If you are able to measure it, what is your temperature?
                  </Text>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={styles.tempInput}>
                      <TextInput
                        keyboardType="number-pad"
                        placeholderTextColor="#979797"
                        value={values.temperature}
                        onChangeText={handleChange('temperature')}
                        onBlur={handleBlur('temperature')}
                        placeholder="Enter temperature"
                        name="temperature"
                      />
                    </View>
                    <View style={styles.picker1}>
                      <Picker
                        onChangeText={handleChange('tempScale')}
                        selectedValue={values.tempScale}
                        onBlur={handleBlur('tempScale')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('tempScale', itemValue)
                        }>
                        <Picker.Item label="C" value="No" color="#323232" />
                        <Picker.Item label="F" value="Yes" color="#323232" />
                      </Picker>
                    </View>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Do you have a persistent cough (coughing a lot for more than
                    an hour, or 3 or more coughing episodes in 24 hours)?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('coughEpisodes')}
                      selectedValue={values.coughEpisodes}
                      onBlur={handleBlur('coughEpisodes')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('coughEpisodes', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#323232" />
                      <Picker.Item label="Yes" value="Yes" color="#323232" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Are you feeling unwell or experiencing fatigue?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('fatigue')}
                      selectedValue={values.fatigue}
                      onBlur={handleBlur('fatigue')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('fatigue', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#323232" />
                      <Picker.Item label="Yes" value="Yes" color="#323232" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Do you have any difficulty breathing?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('breathing')}
                      selectedValue={values.breathing}
                      onBlur={handleBlur('breathing')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('breathing', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#323232" />
                      <Picker.Item label="Yes" value="Yes" color="#323232" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Do you have sore throat?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('soreThroat')}
                      selectedValue={values.soreThroat}
                      onBlur={handleBlur('soreThroat')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('soreThroat', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#323232" />
                      <Picker.Item label="Yes" value="Yes" color="#323232" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>Do you have headache?</Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('headache')}
                      selectedValue={values.headache}
                      onBlur={handleBlur('headache')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('headache', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#323232" />
                      <Picker.Item label="Yes" value="Yes" color="#323232" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionText}>
                    Do you have any chest pain or chest tightness?
                  </Text>
                  <View style={styles.picker}>
                    <Picker
                      onChangeText={handleChange('chestPain')}
                      selectedValue={values.chestPain}
                      onBlur={handleBlur('chestPain')}
                      onValueChange={(itemValue, itemIndex) =>
                        setFieldValue('chestPain', itemValue)
                      }>
                      <Picker.Item label="No" value="No" color="#323232" />
                      <Picker.Item label="Yes" value="Yes" color="#323232" />
                    </Picker>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Do you have an unusual abdominal pain?
                    </Text>
                    <View style={styles.picker}>
                      <Picker
                        onChangeText={handleChange('abdominalPain')}
                        selectedValue={values.abdominalPain}
                        onBlur={handleBlur('abdominalPain')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('abdominalPain', itemValue)
                        }>
                        <Picker.Item label="No" value="No" color="#323232" />
                        <Picker.Item label="Yes" value="Yes" color="#323232" />
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Are you experiencing diarrhoea?
                    </Text>
                    <View style={styles.picker}>
                      <Picker
                        onChangeText={handleChange('diarrhoea')}
                        selectedValue={values.diarrhoea}
                        onBlur={handleBlur('diarrhoea')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('diarrhoea', itemValue)
                        }>
                        <Picker.Item label="No" value="No" color="#323232" />
                        <Picker.Item label="Yes" value="Yes" color="#323232" />
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Do you have any of the following symptoms: confusion,
                      disorientation or drowsiness?
                    </Text>
                    <View style={styles.picker}>
                      <Picker
                        onChangeText={handleChange('drowsiness')}
                        selectedValue={values.drowsiness}
                        onBlur={handleBlur('drowsiness')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('drowsiness', itemValue)
                        }>
                        <Picker.Item label="No" value="No" color="#323232" />
                        <Picker.Item label="Yes" value="Yes" color="#323232" />
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Have you been skipping meals?
                    </Text>
                    <View style={styles.picker}>
                      <Picker
                        onChangeText={handleChange('meals')}
                        selectedValue={values.meals}
                        onBlur={handleBlur('meals')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('meals', itemValue)
                        }>
                        <Picker.Item label="No" value="No" color="#323232" />
                        <Picker.Item label="Yes" value="Yes" color="#323232" />
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Do you have a loss of smell/taste?
                    </Text>
                    <View style={styles.picker}>
                      <Picker
                        onChangeText={handleChange('taste')}
                        selectedValue={values.taste}
                        onBlur={handleBlur('taste')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('taste', itemValue)
                        }>
                        <Picker.Item label="No" value="No" color="#323232" />
                        <Picker.Item label="Yes" value="Yes" color="#323232" />
                      </Picker>
                    </View>
                  </View>
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>
                      Do you have an unusually hoarse voice?
                    </Text>
                    <View style={styles.picker}>
                      <Picker
                        onChangeText={handleChange('voice')}
                        selectedValue={values.voice}
                        onBlur={handleBlur('voice')}
                        onValueChange={(itemValue, itemIndex) =>
                          setFieldValue('voice', itemValue)
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

export default Symptoms;

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
    width: '90%',
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
  },
  picker1: {
    width: '25%',
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: '#DADADA',
  },
  tempInput: {
    width: '72%',
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: '#DADADA',
    color: '#323232',
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
    color: '#323232',
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
