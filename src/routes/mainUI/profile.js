import React, { Component } from 'react';
import { StyleSheet, View, Platform, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import * as actions from '../../actions';
import SkillRowComponent from '../../components/skillRowComponent';
import ReviewComponent from '../../components/reviewComponent';
import data from '../../services/reviews.json';
import LoadingComponent from '../../components/loadingComponent';

const { width, height } = Dimensions.get('window');

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      id: 1,
      rateData: [ { category:"My Skill", data:[{ name: 'Photographer', rate: 3.5 }]},
       { category:"My Service", data:[{ name: 'Angular 2/4', rate: 4.5 }, { name: 'React', rate: 4.0 }]} ],
      reviewData: data.slice(0, 4),
      requestLoading: true
    };
  }
  componentWillMount() {
    // this.fetchdetails();
  }

  componentDidMount() {
    this.props.getProfileInfo(this.props.auth.token);
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.profile.loading !== nextProps.profile.loading && nextProps.profile.loading){
      console.log("nextProps=>",nextProps)
      this.setState({requestLoading: false});
    }
  }

  render() {
    return (
      this.state.requestLoading ?
      <LoadingComponent/>
      :
      <Container>
        <Content>
          <View style={{ paddingHorizontal: 10 }} >
            <Image source={require('../../../assets/images/CarouselView/Image1.jpg')} style={{ position:'absolute',flex:1, width: width}}>
              <View style={{ backgroundColor:'rgba(11, 72, 107, 0.9)', width:'100%', height:'100%'}}/>
            </Image>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
              <Image source={{uri: this.props.profile.user.displayPicture}} style={{ height: 150, width: 150, borderRadius: 50, borderWidth:3, borderColor:'#fff' }} />
            </View>
            <View style={{ flexDirection:'row', alignItems: 'center', justifyContent:'center', paddingTop: 2 }}>
              <Text style={{ fontSize: 20, color: 'white', fontWeight: '500' }}>{this.props.profile.user.firstName + ' ' + this.props.profile.user.lastName}</Text>
              <Icon name="md-checkmark-circle" style={{ fontSize:15, color:'#FFA838', marginLeft:5, marginTop:4}} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent:'center' }}>
              <Text style={{ fontSize: 13, color:'#fff' }}>Member since </Text>
              <Text style={{ fontSize: 13, color:'#fff' }}>{moment(new Date(this.props.profile.user.createdDate)).format('D MMM YYYY ')}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop:20 }}>
              <View style={styles.socialView}>
                <Text style={styles.socialTextValue}>1094</Text>
                <Text style={styles.socialTextTitle}>Followers</Text>
              </View>
              <View style={styles.socialView}>
                <Text style={styles.socialTextValue}>223</Text>
                <Text style={styles.socialTextTitle}>Following</Text>
              </View>
              <View style={{flex:1, justifyContent: 'center', padding: 5, alignItems: 'center' }}>
                <Text style={styles.socialTextValue}>88</Text>
                <Text style={styles.socialTextTitle}>Saved</Text>
              </View>
            </View>
          </View>
          <View style={{ backgroundColor: 'white', padding: 5 }}>
              <View style={styles.wrapper}>
                <Text style={{ fontSize: 16, color:"#515151" }}>About</Text>
                <Text style={{ fontSize: 13, color:"#b5b5b5" }}>I am a dedicated person. I enjoy reading, and the knowledge and perspective that my reading gives me has strengthened my teaching skills....</Text>
              </View>
                {
                  this.state.rateData.map((item, index) => {
                    return <SkillRowComponent key={index} data={item} />
                  })
                }
              <View>
                <View style={{ paddingBottom: 10 }}>
                  <View style={{ padding: 10, flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
                    <View style={{  flexDirection: 'row', alignItems:'center' }}>
                      <Text style={{ fontSize: 16, color:'#515151' }}>Reviews</Text>
                      <Text style={{color:'#b5b5b5'}}> (</Text><Text style={{color:'#b5b5b5'}}>{data.length}</Text><Text style={{color:'#b5b5b5'}}>)</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.setState({ reviewData: data })}>
                      <Text style={{ color:'#FFA838' }} >View all</Text>
                    </TouchableOpacity>
                  </View>  
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {
                      this.state.reviewData.map((item, index)=>{
                        return <ReviewComponent key={index} data={item}/>

                      })
                    }
                  </View>
                </View>
              </View>
          </View>

        </Content>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ball: {
    height: 160,
    width: 160,
    borderRadius: 80,
    borderWidth: 80,
    borderColor: 'white',
    // shadowColor: 'black',
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
  },

  socialTextValue: { fontSize: 20, color: 'white', fontWeight: 'bold' },

  socialTextTitle: {
    fontSize: 13, color: 'white'
  },

  socialView: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5
  },

  wrapper: { padding: 10, borderBottomWidth: 1, borderColor: '#EDF4F7' }
});

const mapStateToProps = (state) =>({
    auth: state.auth,
    profile: state.profile
});
const mapDispatchToProps = (dispatch) =>({
    getProfileInfo: (token) =>dispatch(actions.getProfileInfo(token)),
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);


