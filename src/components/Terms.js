import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
export default class Terms extends React.Component {
  static navigationOptions = {headerShown: false};

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#fff'}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.container}>
            <View>
              <Text style={styles.head}>Terms & Conditions</Text>
              <Text style={styles.subText}>
                By using this app, you will be helping medical science to better
                understand coronavirus (COVID-19). This app is designed by
                doctors and scientists for research purposes only. We process
                pseudonymized data to carry out aggregate statistics on the
                geographical prevalence of COVID-19 and present such summarized
                statistics to our research partners on an irreversibly
                anonymized basis. The processing is necessary for statistical
                purposes and we only provide our partners with anonymized and
                summarized statistics from which the identification of a
                specific natural person is impossible. Our legitimate interest
                in processing data for these purposes is to support progress in
                COVID-19 research in line with our goals which is also in the
                public interest to improve healthcare. By using this app, you
                consent to our using the personal information we collect through
                your use of this app in the way we have described.
              </Text>
            </View>

            <TouchableNativeFeedback
              onPress={() => this.props.navigation.navigate('Basic')}>
              <View style={styles.signupbox}>
                <Text style={styles.signuptext}>Accept</Text>
              </View>
            </TouchableNativeFeedback>
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
    marginVertical: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  head: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 14,
    fontStyle: 'normal',
    lineHeight: 43,
    fontFamily: 'SF Pro Display',
    width: '100%',
  },
  subText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'SF Pro Display',
    lineHeight: 26,
    fontWeight: 'normal',
  },
  signupbox: {
    backgroundColor: '#564FF5',
    height: 48,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
