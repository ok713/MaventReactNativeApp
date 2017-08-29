import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Container, Content, Icon} from 'native-base';
import Search from 'react-native-search-box';
import CarouselComponent from '../../components/carouselComponent';
const SCREEN_WIDTH = Dimensions
  .get('window')
  .width;
const {width, height} = Dimensions.get('window');
const HORIZONTAL_PADDING = 8;

class SubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  navigate = (data) => {
    Actions.genericView({data: data, title: data.name});

  }

  onSearch = (text) => {
    return new Promise((resolve, reject) => {
        console.log('onSearch', text);
        resolve();
    });
}

onChangeText = (text) => {
    return new Promise((resolve, reject) => {
        console.log('onChangeText', text);
        resolve();
    });
}

  renderItem(data) {
    return (
          <View style={{ width:'50%', alignItems:'center', justifyContent:'center'}}>
            <View style={{ borderRadius:5, borderWidth:1, borderColor:'#b5b5b5', backgroundColor:'#fff'}}>
              <TouchableOpacity onPress={() => this.navigate(data)}>
                <Image source={data.image} style={styles.itemImageStyle} >
                </Image>
                <View style={{ position:'absolute', width: (width / 2) - HORIZONTAL_PADDING,
                    height:130, backgroundColor:'rgba(0,0,0,0.3)', justifyContent:'center', borderRadius:5 }}>
                  <Text style={styles.placeholderItemNameStyle}> {data.name} </Text>
                  </View>
              </TouchableOpacity>
              <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:10}}>
                <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center' }}>
                  <Icon name="ios-people-outline" style={{ color:'#FFA838', marginRight:5}} />
                  <Text style={{ color:'#FFA838' }}>12</Text>
                </View>
                <TouchableOpacity style={{ backgroundColor: '#FFA838', paddingVertical:3, paddingHorizontal:12, justifyContent:'center', alignItems:'center', borderRadius:3}}>
                  <Text style={{ color:'#fff'}} >Chat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Search
                ref="search_box" backgroundColor={'#0B486B'} inputStyle={{ backgroundColor:'#032d44'}}  
                    placeholderTextColor="#d3d3d3"
                    tintColorSearch="#fff"
                    tintColorDelete="#fff"
                onSearch={this.onSearch}  onChangeText={this.onChangeText}     />
        <CarouselComponent/>
        <Container>
          <Content style={{
            width: width
          }}>
            <View style={{
              flex: 1
            }}>
              {this.props.data.map((item, index) => {
                if (index % 2 == 0) {
                  return <View
                    key={index}
                    style={{
                    flexDirection: 'row',
                    paddingTop:HORIZONTAL_PADDING ,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                  }}>
                   {this.renderItem(this.props.data[index])}
                    {
                      this.props.data[index + 1] && this.renderItem(this.props.data[index + 1])
                    }
                  </View>
                }
              })}
            </View>
          </Content>
        </Container>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemImageStyle: {
  	justifyContent: 'center',
  	alignItems: 'center',
  	width: (width / 2) - HORIZONTAL_PADDING,
    height:130,
    borderRadius:5,
  },
  placeholderItemNameStyle: {
  	textAlign: 'center',
  	fontSize: 17,
  	color: '#fff',
  	fontWeight: 'bold',
  },
});

export default SubCategory;
