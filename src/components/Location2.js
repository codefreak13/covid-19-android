import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Arrow from '../assets/whiteArrow.svg';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import ShowMessage, {type} from '../toster/ShowMessage';

class Location extends React.Component {
  state = {
    sliderValue: 75,
    loading1: false,
    loading2: false,
    loading3: false,
    loading4: false,
  };

  static navigationOptions = {headerShown: false};

  handleSubmit1 = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({loading1: true});
    try {
      await firestore()
        .collection('users')
        .doc(token)
        .update({
          'location.details':
            'I’m at home. I haven’t been to the hospital for suspected COVID-19 symptoms',
          'location.location': 'At home',
          updated_at: new Date(),
        });
      this.setState({loading1: false});
      this.props.navigation.navigate('Final');
    } catch (e) {
      this.setState({loading1: false});
      let err = e.message.split(' ');
      err.shift();
      ShowMessage(type.ERROR, err.join(' '));
      console.log(err.join(' '));
    }
  };

  handleSubmit2 = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({loading2: true});
    try {
      await firestore()
        .collection('users')
        .doc(token)
        .update({
          'location.details':
            'I am at the hospital with suspected COVID-19 symptoms.',
          'location.location': 'At the hospital',
          updated_at: new Date(),
        });
      this.setState({loading2: false});
      this.props.navigation.navigate('Treatment');
    } catch (e) {
      this.setState({loading2: false});
      let err = e.message.split(' ');
      err.shift();
      ShowMessage(type.ERROR, err.join(' '));
      console.log(err.join(' '));
    }
  };

  handleSubmit3 = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({loading3: true});
    try {
      await firestore()
        .collection('users')
        .doc(token)
        .update({
          'location.details':
            'I’m back from the hospital, I’d like to tell you about my treatment',
          'location.location': 'Back from hospital',
          updated_at: new Date(),
        });
      this.setState({loading3: false});
      this.props.navigation.navigate('Treatment');
    } catch (e) {
      this.setState({loading3: false});
      let err = e.message.split(' ');
      err.shift();
      ShowMessage(type.ERROR, err.join(' '));
      console.log(err.join(' '));
    }
  };

  handleSubmit4 = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({loading4: true});
    try {
      await firestore()
        .collection('users')
        .doc(token)
        .update({
          'location.details': 'I’ve already told you about my treatment',
          'location.location': 'Back from hospital',
          updated_at: new Date(),
        });
      this.setState({loading4: false});
      this.props.navigation.navigate('Final');
    } catch (e) {
      this.setState({loading4: false});
      let err = e.message.split(' ');
      err.shift();
      ShowMessage(type.ERROR, err.join(' '));
      console.log(err.join(' '));
    }
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps={'handled'}>
        <View style={styles.main}>
          <Text style={styles.head}>Where are you now? </Text>
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
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>At home</Text>
              <Text style={styles.cardBody}>
                I’m at home. I haven’t been to the hospital for suspected
                COVID-19 symptoms.
              </Text>
              {this.state.loading1 ? (
                <ActivityIndicator color="#564FF5" />
              ) : (
                <TouchableNativeFeedback onPress={this.handleSubmit1}>
                  <View style={styles.signupbox}>
                    <Arrow height={7} width={11} />
                  </View>
                </TouchableNativeFeedback>
              )}
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>At the hospital</Text>
              <Text style={styles.cardBody}>
                I am at the hospital with suspected COVID-19 symptoms.
              </Text>
              {this.state.loading2 ? (
                <ActivityIndicator color="#564FF5" />
              ) : (
                <TouchableNativeFeedback onPress={this.handleSubmit2}>
                  <View style={styles.signupbox}>
                    <Arrow height={7} width={11} />
                  </View>
                </TouchableNativeFeedback>
              )}
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Back from hospital</Text>
              <Text style={styles.cardBody}>
                I’m back from the hospital, I’d like to tell you about my
                treatment
              </Text>
              {this.state.loading3 ? (
                <ActivityIndicator color="#564FF5" />
              ) : (
                <TouchableNativeFeedback onPress={this.handleSubmit3}>
                  <View style={styles.signupbox}>
                    <Arrow height={7} width={11} />
                  </View>
                </TouchableNativeFeedback>
              )}
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Back from hospital</Text>
              <Text style={styles.cardBody}>
                I’ve already told you about my treatment
              </Text>
              {this.state.loading4 ? (
                <ActivityIndicator color="#564FF5" />
              ) : (
                <TouchableNativeFeedback onPress={this.handleSubmit4}>
                  <View style={styles.signupbox}>
                    <Arrow height={7} width={11} />
                  </View>
                </TouchableNativeFeedback>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Location;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 30,
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
  signupbox: {
    backgroundColor: '#564FF5',
    padding: 10,
    width: '50%',
    alignSelf: 'center',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    marginTop: 31,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    elevation: 0.9,
    paddingVertical: 31,
    paddingHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardTitle: {
    textAlign: 'center',
    lineHeight: 21,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontFamily: 'SF Pro Display',
    fontSize: 18,
    color: '#595959',
  },
  cardBody: {
    color: '#595959',
    textAlign: 'center',
    lineHeight: 17,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'SF Pro Display',
    fontSize: 14,
    paddingVertical: 16,
  },
});
