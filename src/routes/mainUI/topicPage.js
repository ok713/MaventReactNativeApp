import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Container, Content, Icon} from 'native-base';
import Search from 'react-native-search-box';
const SCREEN_WIDTH = Dimensions
  .get('window')
  .width;
const {width, height} = Dimensions.get('window');
const HORIZONTAL_PADDING = 8;
const data = [{pic: require('../../../assets/images/profile.png'), name: 'Laura Lee', day: '4d ago', comments: 1, likes:14,
              topic: 'I am a dedicated person. I enjoy reading, and the knowledge and perspective that my reading gives me has strengthened my teaching skills asdfsdfsdfsdfsdfsdsfd' },
              {pic: require('../../../assets/images/profile.png'), name: 'John David', day: '4d ago', comments: 1, likes:14,
              image: require('../../../assets/images/Announcement_banner.jpg')
             },
              {pic: require('../../../assets/images/profile.png'), name: 'Eric Lou', day: '4d ago', comments: 1, likes:14,
              topic: 'I am a dedicated person. I enjoy reading, and the knowledge and perspective that my reading gives me has strengthened my teaching skills' },                            
            ]

class TopicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeList:[],
      moreList: [],
      data: data
    }
  }

  componentDidMount() {
    let temp = [];
    let tempMore = [];
    data.map((item, index)=>{
      temp.push(false);
      tempMore.push(false);
    })
    this.setState({ likeList: temp, moreList: tempMore })
  }

  navigate = (data) => {
    Actions.commentsPage({data:data});

  }

  onclickMore = (index) =>{
    let list = this.state.moreList;
    list[index] = !list[index];
    this.setState({moreList: list});
  }

  
  onclickLike = (index) =>{
    let temp = this.state.likeList;
    temp[index] = !temp[index];
    let tempData = this.state.data;
    tempData[index].likes = temp[index] ? tempData[index].likes + 1 : tempData[index].likes - 1
    this.setState({likeList: temp, data: tempData});
  }

  renderItem(item, index) {
    return (
          <View style = {{ borderWidth: 1, borderRadius: 8, borderColor: '#c9c9c9', marginBottom: 13}}>
            <View style = {{flexDirection: "row", alignItems: 'center', padding: 10}}>
              <Image source = {item.pic} style = {{ width: 55, height: 55, borderRadius: 17 }}/>
              <View style = {{paddingHorizontal: 10}} >
                <Text style = {styles.nameText} >{item.name}</Text>
                <Text style ={{ color: '#a4a4a4', fontSize: 15}} >{item.day}</Text>
              </View>
            </View>
            <View style = {{ paddingBottom: 5}}>
              {
                item.topic &&
                <Text style ={{ color: '#ababab', fontSize: 15, paddingHorizontal: 10}} numberOfLines = {this.state.moreList[index] ? null : 3} >{item.topic}</Text>
              }
              {
                item.image &&
                  <View>
                    <Text style = {[styles.nameText, {paddingHorizontal: 10}]}>
                      {item.name}
                      <Text style = {{ color: '#ababab', fontSize: 15}}> added a new photo </Text>
                    </Text>
                    <Image source = {item.image} style ={{ marginTop: 10,  width: '100%', height: 200}}/>
                  </View>
              }
            </View>
            <TouchableOpacity style={{paddingHorizontal: 10, paddingBottom: 5}} onPress={(e)=>this.onclickMore(index)}>
              <Text style = {{ color: '#f69021', fontSize: 16}} >{ this.state.moreList[index] ? "Less" : "See More"}</Text>
            </TouchableOpacity>
            <View style = {{ flexDirection: 'row', alignItems:'center', paddingHorizontal: 10, paddingBottom: 5}}>
              <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} >
                <TouchableOpacity onPress={(e)=>this.onclickLike(index)} >
                  <Icon style={{ fontSize:20, marginTop: 3, color: this.state.likeList[index]?'#f69021':'#515151' }} name = {this.state.likeList[index]?'ios-heart':'ios-heart-outline'} />
                </TouchableOpacity>
                <Text style = {{ color: '#a4a4a4', paddingLeft: 5}}>{item.likes}</Text>
              </View>
              <View style = {{ marginLeft: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} >
                <TouchableOpacity onPress={(e)=>this.navigate(item)} >
                  <Icon style={{ fontSize:20, marginTop: 3, color: '#515151' }} name = {'ios-chatbubbles-outline'} />
                </TouchableOpacity>
                <Text style = {{ color: '#a4a4a4', paddingLeft: 5}}>{item.comments}</Text>
              </View>
              <View style = {{ marginLeft: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} >
                <TouchableOpacity onPress={(e)=>{}} >
                  <Icon style={{ fontSize:27, marginTop: 3, color: '#515151' }} name = {'ios-send-outline'} />
                </TouchableOpacity>
              </View>
              
            </View>

          </View>
    );
  }

  render() {
    return (
      <Container>
        <Content padder style = {{backgroundColor: '#fff'}}>
       {
         this.state.data.map((item, index)=>{
           return <View key={index}>
             {this.renderItem(item, index)}
            </View>
         })
       }
       </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  nameText: {color: '#656565', fontSize:17}
});

export default TopicPage;
