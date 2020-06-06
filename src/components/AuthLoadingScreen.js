import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from '../assets/covid.svg';
import TextIcon from '../assets/covid_text.svg';
import SplashScreen from 'react-native-splash-screen';

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
    SplashScreen.hide();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem('token');
    const email = await AsyncStorage.getItem('verificationEmail');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(
      token ? (email ? 'VerifyAccount' : 'App') : 'Auth',
    );
  };

  // Render any loading content that you like here
  render() {
    return <ActivityIndicator color="#564ff5" style={{flex: 1}} size="large" />;
  }
}

export default AuthLoadingScreen;
