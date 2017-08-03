import React from 'react';
import { Scene, Router, Actions, Reducer } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {Text, TouchableOpacity, Image, Platform} from 'react-native'
import Login from './auth/login';
import Signup from './auth/signup';
import Otp from './auth/OTP';

import CategoryView from './mainUI/categoryView';
import SubCategory from './mainUI/subCategory';
import Discovery from './mainUI/discovery';
import Profile from './mainUI/profile';
import MySkills from './mainUI/mySkills';
import SkillList from './mainUI/skillList';
import GenericView from './mainUI/genericView';
import GenericBooking from './mainUI/genericBookingPage';

import TabIcon from '../components/tabIcon';


const reducerCreate = params => {
  const defaultReducer = Reducer(params);
  return (state, action) => {
    console.log("ACTION:", action);
    return defaultReducer(state, action);
  }
};

const TabIcon1 = (props) => {
  return <TabIcon  {...props} icon={'md-browsers'} type='main' />
};
const TabIcon2 = (props) => {
  return <TabIcon  {...props} icon={'md-pin'} type='main' />
};
const TabIcon3 = (props) => {
  return <TabIcon  {...props} icon={'ios-contact'} type='main' />
};

const AcitivityIcon1 = (props) => {
  return <TabIcon  {...props} title={'My Skills'} type='activity' />
};
const AcitivityIcon2 = (props) => {
  return <TabIcon  {...props} title={'Requested Skills'} type='activity' />
};
const AcitivityIcon3 = (props) => {
  return <TabIcon  {...props} title={'ALL'} type='activity' />
};

const renderRightButton = ()=>{
  return <TouchableOpacity onPress={(e)=> Actions.ActivityPage()} style={{padding:10}}>
            <Image source={require("../../assets//icons/mailoutline.png")} style={{width:25, height:25}}/>
        </TouchableOpacity>
}

const RouterComponent = () => {
  return (
    <Router createReducer={reducerCreate}>
      <Scene key='root' hideNavBar onRight={() => { Actions.ActivityPage() }}
        navigationBarStyle={{marginTop:Platform.OS==="android"?23:0, backgroundColor: '#0B486B', borderBottomWidth: 0}}
        titleStyle={{ color: 'white', fontSize: 20, fontWeight: '600' }}
         renderRightButton={renderRightButton} >

        <Scene key='auth' >
          <Scene key="login" component={Login} hideNavBar />
          <Scene key="signup" component={Signup} title="Join Mavent" hideNavBar={false} rightButtonImage={null} renderRightButton={null} />
          <Scene key="OTP"  component={Otp} title="ACTIVATION" back={Platform.OS==="android"?false:true} 
           renderRightButton={null} hideNavBar={false} rightButtonImage={null} />
        </Scene>

        <Scene key='home' initial >
          <Scene key="main" gestureEnabled={false} tabs activeBackgroundColor='#0B486B' tabBarStyle={{ backgroundColor: '#0B486B' }}
            animationEnabled showIcon={true} showLabel={false} hideNavBar tabBarPosition='bottom'>
            <Scene key="categoryView"  component={CategoryView} icon={TabIcon1} title="M A V E N T" />
            <Scene key="discovery" component={Discovery} icon={TabIcon2} title="M A V E N T" />
            <Scene key="profile" component={Profile} icon={TabIcon3} title="M A V E N T" />
          </Scene>
          <Scene key="ActivityPage" back={Platform.OS==="android"?false:true} title="Activity"  gestureEnabled={false} tabs hideNavBar={false}
            showIcon={Platform.OS==="android"?false:true} showLabel={Platform.OS==="android"?true:false} tabBarPosition='top' activeBackgroundColor='#f4f4f4'
            tabBarStyle={{backgroundColor:"#f4f4f4", paddingTop: 10, borderBottomWidth:1.5, borderColor:'#ccc' }}
            activeTintColor="#000080" inactiveTintColor="#000" indicatorStyle={{backgroundColor:'#000080'}} labelStyle={{fontWeight:'bold'}}
             rightButtonImage={null} renderRightButton={null} animationEnabled>
            <Scene key="MySkills" component={MySkills} back={false} iconStyle={{width:200, height:'100%'}}
              navigationBarStyle={{ height: 0 }} renderRightButton={null} title='' icon={AcitivityIcon1}
            />
            <Scene key="RequestedSkills" component={MySkills} tabBarLabel='Requested Skills' back={false} 
              navigationBarStyle={{ height: 0 }} renderRightButton={null} title='' icon={AcitivityIcon2}
            />
            <Scene key="ALL" component={MySkills} tabBarLabel='ALL' back={false} 
              navigationBarStyle={{ height: 0 }} renderRightButton={null} title='' icon={AcitivityIcon3}
            />
          </Scene>
          <Scene key="skillList" component={SkillList} title="Monetizing" />
          <Scene key="subCategory" component={SubCategory} title="Subcategory" />
          <Scene key="genericView" component={GenericView} back={Platform.OS==="android"?false:true} title="GenericView" />
          <Scene key="genericBooking" component={GenericBooking} back={Platform.OS==="android"?false:true} title="GenericBookingPage" />
        </Scene>
      </Scene>
    </Router>
  );
};


export default RouterComponent;