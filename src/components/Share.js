import React, {Component} from 'react';
import {
  Share,
  View,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
} from 'react-native';
import Icon from '../assets/covid.svg';
import TextIcon from '../assets/covid_text.svg';
import Arrow from '../assets/arrow.svg';

class ShareExample extends Component {
  static navigationOptions = {headerShown: false};

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Support the burdened healthcare system by slowing the spread of COVID-19. Help identify high-risk areas and track how fast the virus is spreading by self-reporting your symptoms daily, even if you are feel well. Download the app https://checkcovid-19.com',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <View style={styles.main}>
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.goBack()}>
          <View>
            <Arrow />
          </View>
        </TouchableWithoutFeedback>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingVertical: 50,
            }}>
            <Icon width={160} height={160} style={{marginRight: 20}}></Icon>
            <TextIcon width={130} height={80} />
          </View>
        </View>
        <TouchableNativeFeedback onPress={this.onShare}>
          <View style={styles.signupbox}>
            <Text style={styles.signuptext}>Share</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

export default ShareExample;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: '#fff',
  },
  signupbox: {
    backgroundColor: '#564FF5',
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 38,
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
