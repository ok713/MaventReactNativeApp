import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Icon } from 'native-base';
const SCREEN_WIDTH = Dimensions.get('window').width;
const { width, height } = Dimensions.get('window');
const HORIZONTAL_PADDING = 10;

class SubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  navigate = (data) => {
    Actions.genericView({ data: data, title: data.name });

  }

  renderItem(data, index) {
    const { renderItemContainer, itemImageStyle, placeholderItemNameStyle } = styles;
    return (
      <View style={renderItemContainer}>
        <TouchableOpacity onPress={() => this.navigate(data)}>
          <Image source={data.image} style={itemImageStyle} >
            <Text style={placeholderItemNameStyle}> {data.name} </Text>
          </Image>
        </TouchableOpacity>
      </View>
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topHalf}>
          <View style={styles.imageContainer}>
            <Image source={require('../../../assets/images/chatImage.jpg')} style={styles.chatImageStyle} />
          </View>
          <View style={{flex:1, paddingHorizontal:10}} >
            <Text style={{fontSize:18}}>{this.props.title} chatroom</Text>
            <View style={{flex:1, justifyContent:'flex-end'}}> 
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <View style={{flexDirection:'row'}}>
                  <Icon name='ios-beaker' style={{color:'#00ced1', fontSize:20}}/>
                  <Text style={{color:'#00ced1', fontSize:17, marginLeft:3}} >10</Text>
                </View>
                <TouchableOpacity style={{ borderRadius:5, backgroundColor:'#00ced1', paddingVertical:5, paddingHorizontal:20}} onPress={(e)=>{}}>
                  <Text style={{color:'#fff', fontSize:17}} >Chat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flex: 2.4 }}>
          <Container style={{backgroundColor:'#fff'}}>
            <Content>
              {
                this.props.data.map((item, index) => {
                  if (index % 2 == 0) {
                    return <View key={index} style={{ paddingHorizontal: 5, width: width, flexDirection: 'row', paddingTop: 5, justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      {this.renderItem(this.props.data[index], index)}
                      {this.props.data[index + 1] &&
                        this.renderItem(this.props.data[index + 1], index)
                      }
                    </View>
                  }
                })
              }
            </Content>
          </Container>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topHalf: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 0,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderBottomColor: '#dcdcdc',
    borderBottomWidth:3,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2
  },
  imageContainer: {
    borderRadius: 10,
    height: 180,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    padding:5
  },
  contentContainer: {
    height: 180,
    width: (Platform.OS === 'ios' ? SCREEN_WIDTH / 2.3 : SCREEN_WIDTH / 2.4),
  },
  chatImageStyle: {
    height: '100%',
    width: '100%',
  },
  buttonStyle: {
    flexDirection: 'row',
    marginTop: 10, padding: 10, backgroundColor: '#1F57A0', justifyContent: 'space-around', alignItems: 'center',
    borderRadius: 5
  },
  item: {
    flex: 1,
    height: 160,
  },
  renderItemContainer: {

    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5
  },
  itemImageStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: (width / 2) - HORIZONTAL_PADDING,
    height: 160,
  },
  placeholderItemNameStyle: {
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#0000007F',
    borderRadius: 5,
    paddingLeft: 1,
    paddingRight: 3,
    overflow: 'hidden'
  },

});

export default SubCategory;
