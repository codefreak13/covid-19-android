import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Linking,
} from 'react-native';
import Icon from '../assets/health-icon.svg';
import TopBackground from '../assets/top-background.svg';
import RightBackground from '../assets/right-background.svg';

class ReturningScreen extends React.Component {
  static navigationOptions = {headerShown: false};

  render() {
    return (
      <View style={styles.container}>
        <TopBackground style={styles.topBackground} />
        <RightBackground style={styles.rightBackground} />
        <View
          style={{
            marginBottom: 18,
          }}>
          <Text style={styles.head}>COVID-19 </Text>
          <Text style={[styles.head, {paddingLeft: -10}]}>Symptom checker</Text>
        </View>
        <Text style={styles.title}>
          Carry out a daily self-report, help identify high-risk areas and track
          how fast the virus is spreading.
        </Text>
        <Icon style={{alignSelf: 'center', marginVertical: 10}} />
        <Text style={styles.bodyText}>
          This app allows you track if you have COVID-19, but does not give
          health advice. If you need advice please visit{' '}
          <Text
            style={{textDecorationLine: 'underline'}}
            onPress={() => Linking.openURL('https://www.who.int')}>
            WHO
          </Text>{' '}
          website or talk to a doctor.
        </Text>
        <TouchableNativeFeedback
          onPress={() => this.props.navigation.navigate('Covid')}>
          <View style={styles.signupbox}>
            <Text style={styles.signuptext}>Track Symptoms</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

export default ReturningScreen;

const styles = StyleSheet.create({
  rightBackground: {
    position: 'absolute',
    right: 0,
    top: 100,
  },
  topBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  container: {
    justifyContent: 'space-around',
    backgroundColor: '#564FF5',
    flex: 1,
    paddingHorizontal: 30,
    flexDirection: 'column',
    paddingVertical: 30,
  },
  head: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    lineHeight: 36,
    fontStyle: 'normal',
    fontFamily: 'SF Pro Display',
  },
  title: {
    fontWeight: 'normal',
    fontSize: 16,
    fontFamily: 'SF Pro Display',
    alignSelf: 'center',
    lineHeight: 19,
    fontStyle: 'normal',
    color: '#fff',
    marginVertical: 10,
  },
  bodyText: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    alignSelf: 'center',
    lineHeight: 17,
    fontStyle: 'normal',
    marginVertical: 10,
  },
  signupbox: {
    backgroundColor: '#fff',
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
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
