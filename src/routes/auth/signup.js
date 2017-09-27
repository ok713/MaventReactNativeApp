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
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import IconBadge from 'react-native-icon-badge';
import {ImagePicker} from 'expo';
import DatePicker from 'react-native-datepicker'
import {connect} from 'react-redux';
import LoadingComponent from '../../components/loadingComponent';
// import ImageResizer from 'react-native-image-resizer';

class Signup extends Component {
  constructor(props) {
     super(props);
     this.state = {
         showLoginModal: false,
         email:'',
         password:'',
         firstName:'',
         lastName:'',
         phoneNumber:'',
         birthDay:'',
         gender:'',
     };
   }

  componentWillMount() {
    if (Platform.OS === 'android') {

    }
  }

  componentWillReceiveProps(nextProps) {
      if(this.props.auth.signupLoading !== nextProps.auth.signupLoading && !nextProps.auth.signupLoading && nextProps.auth.signedUp){
        Actions.OTP({phoneState: "1"});
      }
      if(this.props.auth.signupLoading !== nextProps.auth.signupLoading && !nextProps.auth.signupLoading && !nextProps.auth.signedUp){
        alert(nextProps.auth.signupMsg);
      }
  }

  _openCameraRoll = async () => {
    let image = await ImagePicker.launchImageLibraryAsync();
    if(!image.cancelled) {
          this.setState({profileUrl: image.uri});
      }
  }

  takePhoto = async () => {
      let image = await ImagePicker.launchCameraAsync();
      if(!image.cancelled) {
            this.setState({profileUrl: image.uri});
        }
  }

  onPrivacy = () => {

  }

  onTerms = () => {

  }

  register = () => {
      let gender = ''
    if(this.state.gender.length > 1) {
        gender = this.state.gender === 'male' ? 1: 0;
    }
    let data = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        dob: this.state.birthDay,
        gender: gender,
        phoneNumber: this.state.phoneNumber,
        photo:this.setState.profileUrl
    }
    this.props.requestSignup(data);
    // if(this.state.profileUrl)
    //     {
    //         ImageResizer.createResizedImage(this.state.profileUrl, 20, 20, "JPEG", 10).then((response) => {
    //             let data = {
    //                 email: this.state.email,
    //                 password: this.state.password,
    //                 firstName: this.state.firstName,
    //                 lastName: this.state.lastName,
    //                 dob: this.state.birthDay,
    //                 gender: gender,
    //                 phoneNumber: this.state.phoneNumber,
    //                 photo: response.uri
    //             }
    //             console.log(response.uri);
    //             this.props.requestSignup(data);
    //         }).catch((err) => {
    //             console.log(err);
    //         });
    //     }
    //     else {
    //         let data = {
    //             email: this.state.email,
    //             password: this.state.password,
    //             firstName: this.state.firstName,
    //             lastName: this.state.lastName,
    //             dob: this.state.birthDay,
    //             gender: gender,
    //             phoneNumber: this.state.phoneNumber,
    //             photo:this.setState.profileUrl
    //         }
    //         this.props.requestSignup(data);
    //     }
  }

  render() {
    return (
        <View style={{flex:1, justifyContent:'center', padding:10}}>
            <Container>
                <Content>
                    <View style={{flexDirection:'row',  alignItems:'center'}}>
                            <IconBadge
                                MainElement={
                                    <TouchableOpacity onPress={this._openCameraRoll}>
                                        <Image source={ this.state.profileUrl ? {uri:this.state.profileUrl} : require('../../../assets/images/avatar.png')} style={styles.profileImage} />
                                    </TouchableOpacity>
                                }
                                BadgeElement={
                                    <TouchableOpacity onPress={this.takePhoto}>
                                        <Icon name='md-camera' style={{color:'#fff', fontSize:19}} />
                                    </TouchableOpacity>
                                }
                                IconBadgeStyle={
                                {width:30,
                                height:30,
                                left:40,
                                top:40,
                                backgroundColor: '#ff0000', borderWidth:2, borderColor:'#b22222'}
                                }
                                />


                        <View style={{marginLeft:10}}>
                            <Text style={{fontSize:12}}>Smile, add a photo!</Text>
                            <Text style={{fontSize:12, color:'#808080'}}>Show everyone your beautiful face!</Text>
                        </View>
                    </View>
                    <TextInput
                        returnKeyType="next"
                        style={[styles.textInput,{marginTop:20}]}
                        placeholder="First name"
                        onChangeText={(text) => this.setState({firstName:text})}
                        onSubmitEditing={(e)=>{this.refs.lastName.focus()}}
                        autoCapitalize="none"
                        value={this.state.firstName}
                    />
                    <View style={{ height: 3 }}></View>
                    <TextInput
                        ref='lastName'
                        returnKeyType="next"
                        style={[styles.textInput,{}]}
                        placeholder="Last name"
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({lastName:text})}
                        onSubmitEditing={(e)=>{this.refs.email.focus()}}
                        value={this.state.lastName}
                    />
                    <TextInput
                        ref='email'
                        returnKeyType="next"
                        keyboardType="email-address"
                        style={[styles.textInput,{marginTop:10}]}
                        placeholder="Email address"
                        autoCapitalize="none"
                        onChangeText={(text) => this.setState({email:text})}
                        onSubmitEditing={(e)=>{this.refs.password.focus()}}
                        value={this.state.email}
                    />
                    <Text style={styles.text}>We'll send your order confirmation here.</Text>
                    <TextInput
                        ref='password'
                        returnKeyType="next"
                        style={[styles.textInput,{marginTop:5}]}
                        placeholder="Password"
                        autoCapitalize="none"
                        secureTextEntry
                        onChangeText={(text) => this.setState({password:text})}
                        onSubmitEditing={(e)=>{this.refs.phoneNumber.focus()}}
                        value={this.state.password}
                    />
                    <Text style={styles.text}>At least 6 characters.</Text>
                    <TextInput
                        ref='phoneNumber'
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        style={[styles.textInput,{marginTop:10}]}
                        placeholder="Your mobile number"
                        onChangeText={(text) => this.setState({phoneNumber:text})}
                        value={this.state.phoneNumber}
                    />
                    <Text style={styles.text}>We'll need this to activate your account and keep it secured.</Text>

                    <DatePicker
                        style={{width: '100%'}}
                        date={this.state.birthDay}
                        mode="date"
                        placeholder="Date of birth"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date) => this.setState({birthDay:date})}
                        customStyles={{
                            dateInput: {
                                borderRadius:5, backgroundColor:'#fff'
                            }
                        }}
                    />
                    <Text style={styles.text}>We'll give you a birthday treat. Promise!</Text>
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <TouchableOpacity style={[styles.genderItemView,{borderRightWidth:1, borderColor:'#a9a9a9'}]}
                            onPress={(e)=>this.setState({gender:'male'})}>
                            <Icon name='man' style={this.state.gender==='male'?{color:'#FFA838'}:{color:'#808080'}}/>
                            <Text style={this.state.gender==='male'?styles.genderSelItem:styles.genderItem}>MALE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.genderItemView} onPress={(e)=>this.setState({gender:'female'})}>
                            <Icon name='woman' style={this.state.gender==='female'?{color:'#FFA838'}:{color:'#808080'}}/>
                            <Text style={this.state.gender==='female'?styles.genderSelItem:styles.genderItem}>FEMALE</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 10 }}></View>
                    <TouchableOpacity style={styles.btn} onPress={(e)=>this.register()}>
                        <Text style={{color:'#fff', fontWeight:'bold'}}>JOIN MAVENT</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center', marginTop:10}}>
                        <Text style={{fontSize:12}}>By joining Mavent, you agree with our </Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop:5, justifyContent: 'center' }}>
                      <TouchableOpacity style={{borderBottomWidth:1, borderColor:'#000'}} onPress={(e)=>this.onPrivacy()}>
                          <Text style={{fontSize:12, fontWeight:'bold'}}>Privacy Policy</Text>
                      </TouchableOpacity>
                      <Text style={{fontSize:12}}> and</Text>
                        <TouchableOpacity style={{borderBottomWidth:1, borderColor:'#000'}} onPress={(e)=>this.onTerms()}>
                                <Text style={{fontSize:12, fontWeight:'bold' }}> Terms and Conditions</Text>
                        </TouchableOpacity>
                    </View>
                </Content>
            </Container>
            {
             this.props.auth.signupLoading &&
                <LoadingComponent/>
            }
        </View>

    );
  }
}
const mapStateToProps = (state) =>({
    auth: state.auth
});
const mapDispatchToProps = (dispatch) =>({
    requestSignup: (userData) =>dispatch(actions.requestSignup(userData)),
    actions: bindActionCreators(actions, dispatch)
});
export default connect(
    mapStateToProps, mapDispatchToProps
)(Signup)

const styles = StyleSheet.create({
    profileImage: {
        height: 66,
        width: 66,
        borderWidth:4,
        borderColor:'#fff',
        borderRadius:33
    },
    textInput:{backgroundColor:'#fff', paddingHorizontal:10, height: 40, borderColor: '#a9a9a9', borderWidth: 0.5, borderRadius:5},
    text:{paddingVertical: 8, fontSize:12, color:'#808080'},
    genderItemView:{ flexDirection:'row',
        flex:1, backgroundColor:'#fff', padding:5, justifyContent:'center', alignItems:'center'
    },
    genderItem:{color:'#808080', paddingLeft:10},
    genderSelItem:{color:'#000', paddingLeft:10},
    genderIcon:{color:'#808080'},
    genderSelIcon:{color:'#ff0000'},
    btn:{
        padding:10, marginTop:15, flexDirection:'row', width:'78%', alignSelf:'center', alignItems:'center',
        justifyContent:'center', borderRadius:5,
        backgroundColor:'#0B486B',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
        width: 0,
        height: 1
        }
    },

});
