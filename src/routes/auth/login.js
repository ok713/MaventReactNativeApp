import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon, Container, Content } from 'native-base';
import { connect } from 'react-redux';
import * as ractions from '../../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Login extends Component {
  constructor() {
     super();
     this.state = {
       showView: true,
     };
   }

  componentWillMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onAuthComplete(props) {
    if (props.token) {
      Actions.mainUI();
    }
  }

  onEmailChange(text) {
    this.props.emailLoginChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordLoginChanged(text);
  }
  
  render() {
    return (
        <View style={{flex:1, justifyContent:'center'}}>
            <View style={{ flex:1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0B486B' }}>
                <Image source={require('../../../assets/images/mavent_logo.png')} style={styles.LogoImage} />
                <View style={{ alignItems: 'center', width: '100%', paddingTop: 40 }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, fontStyle: 'italic', color: 'white', fontWeight: '200' }}>"If you're good at something, never do it for free, offer it as a service, at a small fee."</Text>
                </View>
            </View>
            <Container marginTop={15}>
                <Content style={{padding:10}}>
                    <TouchableOpacity style={[styles.loginBtn,{backgroundColor:'#0B486B'}]}>
                        <Icon name='mail' style={{color:'#fff', paddingRight:10}} />
                        <Text style={styles.btnText}>Login with Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.loginBtn,{backgroundColor:'#3B5895'}]}>
                        <Icon name='logo-facebook' style={{color:'#fff', paddingRight:10}} />
                        <Text style={styles.btnText}>Continue with Facebook</Text>
                    </TouchableOpacity>
                    <Text style={{alignSelf:'center', paddingTop:20, paddingBottom:5, fontWeight:'bold'}}>OR</Text>
                    <TouchableOpacity style={[styles.loginBtn,{borderWidth:1.5, borderColor:'#0B486B', padding:10, shadowRadius:1}]}>
                        <Text style={{color:'#0B486B', fontWeight:'bold'}}>Sign up</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
            <Text style={{alignSelf:'center', padding:10}}>Beta v 1.0.0</Text>
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
    LogoImage: {
        height: 180,
        width: 180
    },
    loginBtn:{
        padding:5, marginTop:15, flexDirection:'row', width:'78%', alignSelf:'center', alignItems:'center',
        justifyContent:'center', borderRadius:10,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
        width: 0,
        height: 1
        } 
    },
    btnText:{color:'#fff', fontWeight:'bold'}
 
});



