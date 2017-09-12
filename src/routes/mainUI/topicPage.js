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
const data = [{pic: require('../../../assets/images/profile.png'), name: 'Laura', day: '4d ago', comments: 1, likes:14,
              topic: 'I am a dedicated person. I enjoy reading, and the knowledge and perspective that my reading gives me has strengthened my teaching skills' },
              {pic: require('../../../assets/images/profile.png'), name: 'John', day: '4d ago', comments: 1, likes:14,
              topic: 'I am a dedicated person. I enjoy reading, and the knowledge and perspective that my reading gives me has strengthened my teaching skills' },
              {pic: require('../../../assets/images/profile.png'), name: 'Eric', day: '4d ago', comments: 1, likes:14,
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
          <View>
            <View style = {{flexDirection: "row", alignItems: 'center', padding: 10}}>
              <Image source = {item.pic} style = {{ width: 50, height: 50, borderRadius: 25 }}/>
              <View style = {{paddingHorizontal: 10}} >
                <Text style = {{color: '#515151', fontSize:15}} >{item.name}</Text>
                <Text>{item.day}</Text>
              </View>
            </View>
            <View style = {{padding: 10}}>
              <Text numberOfLines = {this.state.moreList[index] ? null : 2} >{item.topic}</Text>
            </View>
            <TouchableOpacity style={{paddingHorizontal: 10, paddingBottom: 10}} onPress={(e)=>this.onclickMore(index)}>
              <Text style = {styles.commentText} >{ this.state.moreList[index] ? "Less" : "See more"}</Text>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress = {(e)=>{this.navigate(item)}}>
              <View style = {{padding:10, flexDirection: 'row', justifyContent:'space-between', alignItems:'center', borderColor: '#ececec', borderBottomWidth: 1, borderTopWidth: 1 }}>
                <Text style = {styles.commentText} >{item.comments} comment</Text>
                <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} >
                  <Text style = {styles.commentText}>{item.likes}</Text>
                  <TouchableOpacity onPress={(e)=>this.onclickLike(index)} >
                    <Icon style={{ fontSize:17, color: '#515151' }} name = {this.state.likeList[index]?'ios-heart':'ios-heart-outline'} />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>

          </View>
    );
  }

  render() {
    return (
      <Container style={{backgroundColor: '#fff'}}>
        <Content>
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
  commentText: {
    color: '#515151'
  }
});

export default TopicPage;
