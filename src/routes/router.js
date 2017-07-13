import React from 'react';
import { Scene, Router, Actions, Reducer } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Login from './auth/login';
import Signup from './auth/signup';

import CategoryView from './mainUI/categoryView';
import Discovery from './mainUI/discovery';
import Profile from './mainUI/profile';
import ActivityPage from './mainUI/activity';

import TabIcon from '../components/tabIcon';


const reducerCreate = params => {
  const defaultReducer = Reducer(params);
  return (state, action) => {
    console.log("ACTION:", action);
    return defaultReducer(state, action);
  }
};

const TabIcon1 = (props) => {
  return <TabIcon  {...props} icon={'md-browsers'} />
};
const TabIcon2 = (props) => {
  return <TabIcon  {...props} icon={'md-pin'} />
};
const TabIcon3 = (props) => {
  return <TabIcon  {...props} icon={'ios-contact'} />
};

const RouterComponent = () => {
  return (
    <Router createReducer={reducerCreate}>
      <Scene key='root' hideNavBar onRight={() => { Actions.ActivityPage(); }} rightButtonImage={require('../../assets//icons/mailoutline.png')}>
        <Scene
          key='auth'
          navigationBarStyle={{ backgroundColor: '#0B486B', borderBottomWidth: 0 }}
          titleStyle={{ color: 'white', fontSize: 20, fontWeight: '600' }}
          onRight={() => { Actions.ActivityPage(); }}
        >
          <Scene key="login" component={Login} hideNavBar rightButtonImage={null} />
          <Scene key="signup" component={Signup} title="Join Mavent" hideNavBar={false} rightButtonImage={null} />
        </Scene>
        <Scene key="ActivityPage" component={ActivityPage} title="Join Mavent" hideNavBar rightButtonImage={null} />
        <Scene key="main" gestureEnabled={false} tabs activeBackgroundColor='#0B486B' tabBarStyle={{ backgroundColor: '#0B486B' }}
          navigationBarStyle={{ backgroundColor: '#0B486B' }} showLabel={false} initial>
          <Scene key="categoryView" component={CategoryView} title="M A V E N T" titleStyle={{ color: 'white' }}
            icon={TabIcon1}
          />
          <Scene key="discovery" component={Discovery} title="M A V E N T" titleStyle={{ color: 'white' }}
            icon={TabIcon2}
          />
          <Scene key="profile" component={Profile} title="M A V E N T" titleStyle={{ color: 'white' }}
            icon={TabIcon3}

          />
        </Scene>
      </Scene>
    </Router>
  );
};


export default RouterComponent;