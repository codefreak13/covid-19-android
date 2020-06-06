import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
import ShowMessage, {type} from '../toster/ShowMessage';

class Treatment extends React.Component {
  state = {
    loading1: false,
    loading2: false,
    loading3: false,
    loading4: false,
    loading5: false,
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
          treatments: {
            current_treatment: 'Other treatment',
          },
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
          'treatments.current_treatment': 'Oxygen and fluids',
          'treatments.description':
            'Breathing support administered through an oxygen mask, no pressure applied.',
          updated_at: new Date(),
        });
      this.setState({loading2: false});
      this.props.navigation.navigate('Final');
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
          'treatments.current_treatment': 'Non-invasive ventilation',
          'treatments.description':
            'Breathing support administered through an oxygen mask, which pushes oxygen into lungs.',
          updated_at: new Date(),
        });
      this.setState({loading3: false});
      this.props.navigation.navigate('Final');
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
          'treatments.current_treatment': 'Invasive ventilation',
          'treatments.description':
            'Breathing support administered through an inserted tube. People are usually asleep for this procedure.',
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

  handleSubmit5 = async () => {
    const token = await AsyncStorage.getItem('token');
    this.setState({loading5: true});
    try {
      await firestore()
        .collection('users')
        .doc(token)
        .update({
          treatments: {
            current_treatment: 'Other treatment',
          },
          updated_at: new Date(),
        });
      this.setState({loading5: false});
      this.props.navigation.navigate('Treatment2');
    } catch (e) {
      this.setState({loading5: false});
      let err = e.message.split(' ');
      err.shift();
      ShowMessage(type.ERROR, err.join(' '));
      console.log(err.join(' '));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.head}>
          What treatment are you receiving or did you receive at the hospital?
        </Text>
        <TouchableNativeFeedback onPress={this.handleSubmit1}>
          <View style={[styles.signupbox, {marginBottom: 20}]}>
            {this.state.loading1 ? (
              <ActivityIndicator color="#564FF5" />
            ) : (
              <Text style={styles.signuptext}>None</Text>
            )}
          </View>
        </TouchableNativeFeedback>
        <View style={styles.inputDiv}>
          <TouchableNativeFeedback onPress={this.handleSubmit2}>
            <View style={styles.signupbox}>
              {this.state.loading2 ? (
                <ActivityIndicator color="#564FF5" />
              ) : (
                <Text style={styles.signuptext}>Oxygen and fluids</Text>
              )}
            </View>
          </TouchableNativeFeedback>
          <Text style={styles.buttonText}>
            Breathing support administered through an oxygen mask, which pushes
            oxygen into lungs.
          </Text>
        </View>
        <View style={styles.inputDiv}>
          <TouchableNativeFeedback onPress={this.handleSubmit3}>
            <View style={styles.signupbox}>
              {this.state.loading3 ? (
                <ActivityIndicator color="#564FF5" />
              ) : (
                <Text style={styles.signuptext}>Non-invasive ventilation</Text>
              )}
            </View>
          </TouchableNativeFeedback>
          <Text style={styles.buttonText}>
            Breathing support administered through an inserted tube. People are
            usually asleep for this procedure.
          </Text>
        </View>
        <View style={styles.inputDiv}>
          <TouchableNativeFeedback onPress={this.handleSubmit4}>
            <View style={styles.signupbox}>
              {this.state.loading4 ? (
                <ActivityIndicator color="#564FF5" />
              ) : (
                <Text style={styles.signuptext}>Invasive ventilation</Text>
              )}
            </View>
          </TouchableNativeFeedback>
          <Text style={styles.buttonText}>
            Breathing support administered through an oxygen mask, no pressure
            applied.
          </Text>
        </View>
        <TouchableNativeFeedback onPress={this.handleSubmit5}>
          <View style={styles.signupbox}>
            {this.state.loading5 ? (
              <ActivityIndicator color="#564FF5" />
            ) : (
              <Text style={styles.signuptext}>Other treatment</Text>
            )}
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

export default Treatment;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#564FF5',
    flex: 1,
    paddingHorizontal: 30,
    flexDirection: 'column',
    paddingVertical: 52,
    justifyContent: 'flex-start',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 5,
  },
  head: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    fontStyle: 'normal',
    fontFamily: 'SF Pro Display',
    lineHeight: 21,
    marginBottom: 42,
    textAlign: 'center',
  },
  inputDiv: {
    marginBottom: 20,
  },
  buttonText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: 'normal',
    fontSize: 12,
    fontStyle: 'normal',
    fontFamily: 'SF Pro Display',
    lineHeight: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  signupbox: {
    backgroundColor: '#fff',
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signuptext: {
    color: '#595959',
    fontWeight: 'normal',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    alignSelf: 'center',
    lineHeight: 17,
    fontStyle: 'normal',
  },
});
