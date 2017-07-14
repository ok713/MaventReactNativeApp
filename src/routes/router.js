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
      <Scene key='root' hideNavBar onRight={() => { Actions.ActivityPage()}}
        navigationBarStyle={{ backgroundColor: '#0B486B', borderBottomWidth: 0 }}
        titleStyle={{ color: 'white', fontSize: 20, fontWeight: '600' }}
        rightButtonImage={require('../../assets//icons/mailoutline.png')}>

        <Scene key='auth' >
          <Scene key="login" component={Login} hideNavBar  />
          <Scene key="signup" component={Signup} title="Join Mavent" hideNavBar={false} rightButtonImage={null}/>
        </Scene>

        <Scene key='home' initial >
          <Scene key="main" gestureEnabled={false} tabs activeBackgroundColor='#0B486B' tabBarStyle={{ backgroundColor: '#0B486B' }}
            showLabel={false} hideNavBar >
            <Scene key="categoryView" component={CategoryView} icon={TabIcon1} title="M A V E N T" />
            <Scene key="discovery" component={Discovery} icon={TabIcon2} title="M A V E N T" />
            <Scene key="profile" component={Profile} icon={TabIcon3} title="M A V E N T" />
          </Scene>
          {/*<Scene key="ActivityPage" gestureEnabled={false} tabs
           tabBarStyle={{  top:0 }}
            showLabel={false}  >
            <Scene key="tab1" component={ActivityPage} icon={TabIcon1} title="M A V E N T" />
            </Scene>*/}
            <Scene key="ActivityPage" title="Activity" gestureEnabled={false} tabs hideNavBar={false}
             tabBarPosition='top' labelStyle={{fontSize:15}} tabBarStyle={{padding:10}} rightButtonImage={null} >
            <Scene key="MySkills" component={ActivityPage} tabBarLabel='My Skills' tabStyle={{backgroundColor:'red'}}
              navigationBarStyle={{height:0}} rightButtonImage={null} title=''
               />
               <Scene key="RequestedSkills" component={ActivityPage} tabBarLabel='Requested Skills'
              navigationBarStyle={{height:0}} rightButtonImage={null} title=''
               />
               <Scene key="ALL" component={ActivityPage} tabBarLabel='ALL'
              navigationBarStyle={{height:0}} rightButtonImage={null} title=''
               />
            </Scene>

        </Scene>
      </Scene>
    </Router>
  );
};


export default RouterComponent;