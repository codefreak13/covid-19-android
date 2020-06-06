import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import Icon from '../assets/health-icon.svg';
import Arrow from '../assets/right-arrow.svg';
import TopBackground from '../assets/top-background.svg';
import RightBackground from '../assets/right-background.svg';

class Splash extends React.Component {
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
        <Icon
          width={200}
          height={200}
          style={{alignSelf: 'center', marginVertical: 20}}
        />
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
          onPress={() => this.props.navigation.navigate('CreateAccount')}>
          <View style={styles.signupbox}>
            <Text style={styles.signuptext}>Get Started</Text>
            <Arrow />
          </View>
        </TouchableNativeFeedback>
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate('Login')}>
          <View
            style={{
              marginTop: 26,
              alignSelf: 'center',
            }}>
            <Text style={styles.login}>Log in</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default Splash;

const styles = StyleSheet.create({
  imageBackgroundStyle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
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
    backgroundColor: '#564FF5',
    flex: 1,
    paddingHorizontal: 30,
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  head: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    fontStyle: 'normal',
    fontFamily: 'SF Pro Display',
    lineHeight: 36,
  },
  title: {
    fontWeight: 'normal',
    fontSize: 16,
    fontFamily: 'SF Pro Display',
    alignSelf: 'center',
    lineHeight: 19,
    fontStyle: 'normal',
    color: '#fff',
    marginVertical: 15,
  },
  bodyText: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    alignSelf: 'center',
    lineHeight: 17,
    fontStyle: 'normal',
    marginVertical: 15,
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
    flexDirection: 'row',
  },
  signuptext: {
    color: '#595959',
    fontWeight: 'normal',
    fontSize: 14,
    fontFamily: 'SF Pro Display',
    alignSelf: 'center',
    lineHeight: 17,
    fontStyle: 'normal',
    marginRight: 25,
  },
  login: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'SF Pro Display',
    alignSelf: 'center',
    lineHeight: 18,
    fontStyle: 'normal',
  },
});
