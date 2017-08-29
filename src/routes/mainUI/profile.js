import React, { Component } from 'react';
import { StyleSheet, View, Platform, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import SkillRowComponent from '../../components/skillRowComponent';
import ReviewComponent from '../../components/reviewComponent';
import data from '../../services/reviews.json';

const { width, height } = Dimensions.get('window');

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      id: 1,
      details: { name: 'Harvey Lawrence', email: 'person@example.com'},
      rateData: [ { category:"Learn a Skill", data:[{ name: 'Photographer', rate: 3.5 }]},
       { category:"Get a Service", data:[{ name: 'Angular 2/4', rate: 4.5 }, { name: 'React', rate: 4.0 }]} ],
      reviewData: data.slice(0, 4),
    };
  }
  componentWillMount() {
    // this.fetchdetails();
  }

  componentDidMount() {

  }

  fetchdetails = () => {
    const getID = 'https://graph.facebook.com/me?access_token=' + this.props.token;
    fetch(getID)
      .then((response) => response.json())
      .then((responseData) => this.setState({ id: responseData.id }, () => {
        const fetchdetails = 'https://graph.facebook.com/v2.9/' + this.state.id + '?fields=name,first_name,last_name,gender,age_range,email&access_token=' + this.props.token;
        fetch(fetchdetails)
          .then((response) => response.json())
          .then((responseData1) => this.setState({ details: responseData1 }));
      }
      ));
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ paddingHorizontal: 10, marginTop:Platform.OS==="android"?23:0 }} >
            <Image source={require('../../../assets/images/CarouselView/Image1.jpg')} style={{ position:'absolute',flex:1, width: width}}>
              <View style={{ backgroundColor:'rgba(11, 72, 107, 0.9)', width:'100%', height:'100%'}}/>
            </Image>
            <View style={{flexDirection:'row', justifyContent:'flex-end', paddingTop:10}}>
              <TouchableOpacity onPress={(e)=> Actions.ActivityPage()}>
                <Icon name = "md-mail" style={{ fontSize: 25, color:'#fff' }}/>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
              <Image source={require('../../../assets/images/profile.png')} style={{ height: 150, width: 150, borderRadius: 50, borderWidth:3, borderColor:'#fff' }} />
            </View>
            <View style={{ flexDirection:'row', alignItems: 'center', justifyContent:'center', paddingTop: 2 }}>
              <Text style={{ fontSize: 20, color: 'white', fontWeight: '500' }}>{this.state.details.name}</Text>
              <Icon name="md-checkmark-circle" style={{ fontSize:15, color:'#FFA838', marginLeft:5, marginTop:4}} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent:'center' }}>
              <Text style={{ fontSize: 13, color:'#fff' }}>Member since </Text>
              <Text style={{ fontSize: 13, color:'#fff' }}>12 Jun 2017</Text>
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

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps)(Profile);


