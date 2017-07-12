import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import {connect} from 'react-redux';
import Login from './auth/login';
import Signup from './auth/signup';
// import WelcomeScreen from './auth/WelcomeScreen';


// import registerMain from './auth/registerMain';
// import registerName from './auth/registerName';
// import registerEmail from './auth/registerEmail';
// import registerGender from './auth/registerGender';
// import registerDOB from './auth/registerDOB';
// import registerPassword from './auth/registerPassword';
// import registerTnC from './auth/registerTnC';
// import registerMobile from './auth/registerMobile';
// import registerOTP from './auth/registerOTP';

// import MainCategories from './mainUI/MainCategories';
// import ListSkill from './mainUI/ListSkill';
// import ActivityPage from './mainUI/ActivityPage';

// import comfy from './mainUI/SubCategories/comfy';
// import Care from './mainUI/SubCategories/Care';
// import enEvent from './mainUI/SubCategories/enEvent';
// import fillTummy from './mainUI/SubCategories/fillTummy';
// import health from './mainUI/SubCategories/health';
// import helpHand from './mainUI/SubCategories/helpHand';
// import lookBetter from './mainUI/SubCategories/lookBetter';
// import enKnowledge from './mainUI/SubCategories/enKnowledge';

// import GenericView from './mainUI/SubCategories/GenericView';
// import GenericBookingPage from './mainUI/SubCategories/GenericBookingPage';

const RouterComponent = () => {
  return (
    <Router>
      <Scene
        key='auth'
        navigationBarStyle={{ backgroundColor: '#0B486B', borderBottomWidth: 0 }}
        titleStyle={{ color: 'white', fontSize: 20, fontWeight: '600' }}
        onRight={() => { Actions.ActivityPage(); }}
      >
        <Scene key="login" component={Login} hideNavBar rightButtonImage={null} />
        <Scene key="signup" component={Signup} title="Join Mavent" hideNavBar={false} rightButtonImage={null} />

        
      </Scene>

    </Router>
  );
};


export default connect(( state ) => {
	return {
		listData: state.listData,
		
	}
})(RouterComponent);