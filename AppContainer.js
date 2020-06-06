import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AuthLoadingScreen from './src/components/AuthLoadingScreen';
import Basic from './src/components/Basic';
import Covid from './src/components/Covid';
import Covid2 from './src/components/Covid2';
import CreateAccount from './src/components/CreateAccount';
import Feelings from './src/components/Feelings';
import Final from './src/components/Final';
import ForgotPassword from './src/components/ForgotPassword';
import Health from './src/components/Health';
import Location from './src/components/Location';
import Location2 from './src/components/Location2';
import Login from './src/components/Login';
import ReturningScreen from './src/components/ReturningScreen';
import Splash from './src/components/Splash';
import Symptoms from './src/components/Symptoms';
import TalkToADoctor from './src/components/TalkToADoctor';
import Terms from './src/components/Terms';
import Treatment from './src/components/Treatment';
import Treatment2 from './src/components/Treatment2';
import Share from './src/components/Share';

const AppNavigator = createStackNavigator(
  {
    Basic,
    Covid,
    Covid2,
    Feelings,
    Final,
    Health,
    Location,
    Location2,
    ReturningScreen,
    Symptoms,
    TalkToADoctor,
    Treatment,
    Treatment2,
    Share,
  },
  {initialRouteName: 'ReturningScreen'},
);

// const AppContainer = createAppContainer(AppNavigator);
// export default AppContainer;

const AuthStack = createStackNavigator(
  {
    Login,
    CreateAccount,
    ForgotPassword,
    Splash,
    Terms,
  },
  {
    initialRouteName: 'Splash',
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
