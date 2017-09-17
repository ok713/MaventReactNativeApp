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
  Modal
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Form, Item, Icon, Container, Content, Input } from 'native-base';
import * as ractions from '../../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Login extends Component {
  constructor() {
     super();
     this.state = {
       showLoginModal: false,
       email:'',
       password:''
     };
   }

  componentWillMount() {
    if (Platform.OS === 'android') {

    }
  }

  componentWillReceiveProps(nextProps) {

  }

  onShowLoginDialog = () => {
    this.setState({showLoginModal:true});
  }

  onLogin = () => {
      Actions.main();
      this.setState({showLoginModal:false});
  }


  onForgotPassword = () => {

  }



  render() {
    return (
        <View style={{flex: 1, justifyContent:'center' }}>
            <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <Image source={require('../../../assets/images/CarouselView/Image2.jpg')} style={{ flex: 1, height: SCREEN_HEIGHT / 2 , width: SCREEN_WIDTH }}/>
                <View style={{ position: 'absolute' }}>
                  <Image source={require('../../../assets/images/mavent_logo3.png')} style={styles.LogoImage} />
                  <View style={{ alignItems: 'center', width: '100%', paddingTop: 10 }}>
                      <Text style={{ textAlign: 'center', fontSize: 28, color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', fontWeight: 'bold' }}>M A V E N T</Text>
                  </View>
                </View>
            </View>
            <Container marginTop={15}>
                <Content style={{padding:10}}>
                    <TouchableOpacity style={[styles.loginBtn,{backgroundColor:'#0B486B'}]} onPress={(e)=>this.onShowLoginDialog()}>
                        <Icon name='mail' style={{color:'#fff', paddingRight:10}} />
                        <Text style={styles.btnText}>Login with Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.loginBtn,{backgroundColor:'#3B5895'}]}>
                        <Icon name='logo-facebook' style={{color:'#fff', paddingRight:10}} />
                        <Text style={styles.btnText}>Continue with Facebook</Text>
                    </TouchableOpacity>
                    <Text style={{alignSelf:'center', paddingTop:20, paddingBottom:5, fontWeight:'bold'}}>OR</Text>
                    <TouchableOpacity style={[styles.loginBtn,{borderWidth:1.5, borderColor:'#0B486B', padding:10, shadowRadius:1}]} onPress={(e)=>{Actions.signup()}}>
                        <Text style={{color:'#0B486B', fontWeight:'bold'}}>Sign up</Text>
                    </TouchableOpacity>
                    <Modal animationType={'none'} onRequestClose={() => null}
                        transparent={true}
                        visible={this.state.showLoginModal}>
                        <View style={styles.loginModal}>
                            <View style={{backgroundColor:'#fff', paddingHorizontal:15, paddingVertical:10, borderWidth:1, borderRadius:10, width:'100%', justifyContent:'center', alignItems:'center'}}>
                                <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={(e)=>this.setState({showLoginModal:false})}>
                                    <Icon name='close' style={{fontSize:40}}/>
                                </TouchableOpacity>
                                <Form style={{width:'100%' }}>
                                    <Item rounded>
                                    <Icon active name='mail' style={{ color: 'grey' }}/>
                                    <Input
                                        returnKeyType="next"
                                        keyboardType="email-address"
                                        value={ this.state.email }
                                        placeholder="Email"
                                        style={{ height: 40, width:'100%'}}
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        onChangeText={(text) => this.setState({email: text})}
                                        onSubmitEditing={(e)=>{this.refs.password._root.focus()}}
                                    />
                                    </Item>
                                    <Item rounded style={{ marginTop: 20 }}>
                                    <Icon active name='lock' style={{ color: 'grey' }}/>
                                    <Input
                                        ref="password"
                                        value={ this.state.password }
                                        placeholder="Password"
                                        style={{ height: 40 }}
                                        autoCorrect={false}
                                        autoCapitalize="none"
                                        secureTextEntry
                                        onChangeText={(text) => this.setState({password: text})}
                                    />
                                    </Item>
                                </Form>
                                <TouchableOpacity style={{paddingTop:20, paddingBottom:5}} onPress={(e)=>this.onForgotPassword()}>
                                    <Text>Forgot Password?</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.loginBtn,{backgroundColor:'#0B486B', padding:10, marginBottom:10}]} onPress={(e)=>this.onLogin()}>
                                <Text style={styles.btnText}>SIGN IN</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Content>
            </Container>
            <Text style={{alignSelf:'center', padding:10}}>Beta v 1.0.0</Text>
        </View>

    );
  }
}

const styles = StyleSheet.create({
    LogoImage: {
        height: 200,
        width: 200,
        resizeMode:'contain'
    },
    loginBtn:{
        padding:5, marginTop:15, flexDirection:'row', width:'78%', alignSelf:'center', alignItems:'center',
        justifyContent:'center', borderRadius:10,
        height: 50,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
        width: 0,
        height: 1
        }
    },
    btnText:{color:'#fff', fontWeight:'bold'},
    loginModal: {
        flex:1,
        padding: 20,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },

});
