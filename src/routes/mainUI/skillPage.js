import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableHighlight,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Dimensions
} from 'react-native';
import { Icon } from 'native-base';
import StarRating from 'react-native-star-rating';
import DatePicker from 'react-native-datepicker';

const SCREEN_WIDTH = Dimensions.get('window').width;

class SkillPage extends Component {
  constructor(props) {
      super(props);

      this.state = {
          availability:[{ label: 'S', value: false },{ label: 'M', value: false },{ label: 'T', value: false },
                        { label: 'W', value: false },{ label: 'T', value: false },{ label: 'F', value: false },{ label: 'S', value: false }],
          availableTime:[{ label: 'Morning', value: false },{ label: 'Afternoon', value: false },{ label: 'Evening', value: false },
                        { label: 'Night', value: false }],
          reviewData:[{ name:'Kamai Matthews', rating:3.5, description:'I am a dedicated person. I enjoy reading, and the knowledge and perspective that my reading gives me has strengthened my teaching skills....' },
                      { name:'Priscilla Moore', rating:4.5, description:'I am a dedicated person. I enjoy reading, and the knowledge and perspective that my reading gives me has strengthened my teaching skills....' }]
      };
    }

  onClickAvailability = (index) => {
    let temp = this.state.availability;
    temp[index].value = !temp[index].value;
    this.setState({ availability:temp});
  }

  onClickAvailableTime = (index) => {
    let temp = this.state.availableTime;
    temp[index].value = !temp[index].value;
    this.setState({ availableTime:temp});
  }

  render() {
    return (
      <View style={ styles.container}>
        <ScrollView>
          <View style={{ padding: 20 }} >
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
              <Image source={require('../../../assets/images/profile.png')} style={{ height: 150, width: 150, borderRadius: 50, borderWidth:3, borderColor:'#fff' }} />
              <Text style={{ fontSize: 20, color: '#145775', fontWeight: '500', paddingVertical:5 }}>Harvey Lawrence</Text>
              <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <Icon name='md-pin' style={{fontSize:15, paddingRight:2, color:'#BFD9E7'}} />
                <Text style={{ fontSize: 15, color:'#b5b5b5', }}>0.2km</Text>
              </View>
            </View>
            <View style={ [styles.viewContainer,{ paddingTop:0 }] } >
              <Text style={ styles.subjectText }>Wedding Photographer</Text>
              <Text style={ styles.subjectText }>Skill Description</Text>
                <Text style={ styles.contentText }>I am a dedicated person. I enjoy reading, and the knowledge and perspective that my reading gives me has strengthened my teaching skills....</Text>
            </View>
            <View style={ [styles.viewContainer, { flexDirection:'row', justifyContent:'space-between' }] } >
              <Text style={ styles.subjectText }>Price</Text>
              <View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={{color:'#FFA838', fontWeight:"700", fontSize:19}}>$39</Text>
                <Text style={{ color:'#b5b5b5', fontWeight:'400', fontSize:15 }}>/hr</Text>
              </View>
            </View>
            <View style={ styles.viewContainer }>
              <View style={{ flexDirection:'row', justifyContent:'space-between' }} >
                <Text style={ styles.subjectText }>Availability</Text>
                <View style={{ flexDirection:'row' }}>
                  {
                    this.state.availability.map((item,index)=>{
                      return <TouchableOpacity key={index} onPress={(e)=> this.onClickAvailability(index) }
                                style={ { width:30, height:30, borderRadius:15, marginHorizontal:3, backgroundColor:item.value?'#fc912f':'#f1f1f1', justifyContent:'center', alignItems:'center' } }>
                              <Text style={{ color: item.value?'#fff':'#515151' }} >{item.label}</Text>                        
                        </TouchableOpacity>
                    })
                  }
                </View>
              </View>
              <View style={{ flexDirection:'row', justifyContent:'space-between',  marginTop:20 }}>
                  {
                    this.state.availableTime.map((item,index)=>{
                      return <TouchableOpacity key={index} onPress={(e)=> this.onClickAvailableTime(index) }
                                style={ { flex:1, height:39, borderRadius:17, marginHorizontal:3, backgroundColor:item.value?'#fc912f':'#f1f1f1', justifyContent:'center', alignItems:'center' } }>
                              <Text style={{ color: item.value?'#fff':'#515151' }} >{item.label}</Text>                        
                        </TouchableOpacity>
                    })
                  }
                </View>
            </View>
            <View style={ styles.viewContainer }>
              <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={ styles.subjectText }>Ratings and Reviews</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <StarRating
                    disabled
                    maxStars={5}
                    rating={4}
                    starSize={15}
                    starColor="#FFA838"
                    starStyle={{paddingHorizontal:2}}
                  />
                  <Text style={{ color:'#b5b5b5'}}>(4.0)</Text>
                </View>
              </View>
            </View>
            {
              this.state.reviewData.map((item,index)=>{
                return <View key={index} style={ [styles.viewContainer, {flexDirection:'row', alignItems:'center' }] }>
                  <Image source={require('../../../assets/images/profile.png')} style={{ height: 70, width: 70, borderRadius: 25 }} />
                  <View style={{paddingHorizontal:10, flex:1}} >
                    <Text style={ styles.subjectText }>{item.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                      <StarRating
                        disabled
                        maxStars={5}
                        rating={item.rating}
                        starSize={15}
                        starColor="#FFA838"
                        starStyle={{paddingHorizontal:2}}
                      />
                      <Text style={{ color:'#b5b5b5'}}>({item.rating})</Text>
                    </View>
                    <Text style={ styles.contentText }>{item.description}</Text>
                  </View>
                </View>
              })
            }
            <TouchableOpacity style={{ justifyContent:'center', alignItems:'center', paddingVertical:15 }}>
              <Text style={{ fontSize: 17, color:"#FFA838" }} >Other services by this Maven</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{ flexDirection:'row'}} >
          <TouchableOpacity style={ [styles.btnView, {backgroundColor:'#004869'}] } >
            <Text style={styles.btnText}>SKILL REQUEST</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ [styles.btnView, {backgroundColor:'#fc912f'}] } >
            <Text style={styles.btnText}>SAVE FOR LATER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor:'#fff'
  },
  subjectText:{ fontSize: 17, color:"#515151", paddingVertical:5 },
  contentText: { fontSize: 14, color:"#b5b5b5" },
  viewContainer: {
    borderBottomWidth:1, borderBottomColor: '#f8f8f8', paddingVertical:15
  },
  btnView: { flex:1, justifyContent:'center', alignItems:'center', paddingVertical:15 },
  btnText: { color:'#fff', fontSize:17, fontWeight:'600' }
  
});

export default SkillPage;
