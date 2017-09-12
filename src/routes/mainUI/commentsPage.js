import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
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
const data = ['I am a dedicated person. I enjoy reading, and the knowledge and perspective that my reading gives me has strengthened my teaching skills',
              'I am a dedicated person. I enjoy reading, and the knowledge and perspective that my reading gives me has strengthened my teaching skills',
              'I am a dedicated person. I enjoy reading, and the knowledge and perspective that my reading gives me has strengthened my teaching skills',
            ]

class CommentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data
    }
  }

  componentDidMount() {
   
  }
  
  renderItem(item, index) {
    return (
          <View style={{padding: 10}}>
            <View style = {{flexDirection: "row",  borderWidth: 1, borderColor: '#ececec', padding: 10}}>
              <Image source = {this.props.data.pic} style = {{ width: 50, height: 50, borderRadius: 25 }}/>
              <View style = {{paddingHorizontal: 10, flex:1}} >
                <Text style = {{color: '#515151', fontSize:15}} >{this.props.data.name}</Text>
                <Text style={{paddingVertical: 5}} >{item}</Text>
                <Text style={{color: '#b5b5b5'}} >{this.props.data.day}</Text>
              </View>
            </View>
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
       <View style = {{flexDirection: 'row', alignItems: 'center', borderWidth: 1, paddingHorizontal:10, borderColor: '#b5b5b5'}}>
         <TextInput returnKeyType="next" multiline={true} placeholder = "Write a comments..." style = {{ fontSize:15, flex: 1, height:50 }}/>
         <TouchableOpacity onPress = {(e)=>{}}>
           <Icon name = "ios-happy-outline" style={{ color: '#b5b5b5' }}/>
          </TouchableOpacity>
        </View>
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

export default CommentsPage;
