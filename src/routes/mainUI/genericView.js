import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import {Icon, Container, Content, Card} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';
import Search from 'react-native-search-box';
import LoadingComponent from '../../components/loadingComponent';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class GenericView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requestLoading: true,
      data: [],
      refreshing: false
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    console.log("subcategoryNextProps=>", nextProps);
    if(this.props.explore.catList !== nextProps.explore.catList && nextProps.explore.loading){
    this.setState({requestLoading: false, data: this.props.explore.catList});
    }
  }

  handleRefresh = () => {
    
  };

  handleLoadMore = () => {

  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%'
        }}
      />
    );
  };

  renderHeader = () => {
   return <View style={{backgroundColor:'#f8f8f8', padding:3}}>
                        <Search
                                backgroundColor={'#f8f8f8'} inputStyle={{ backgroundColor:'#fff', borderWidth:1, borderColor:'#ececec'}}  
                                placeholderTextColor="#a4a4a4"
                                tintColorSearch="#a4a4a4"
                                tintColorDelete="#e5e5e5"
                                titleCancelColor="#a4a4a4"
                                onSearch={this.onSearch}  onChangeText={this.onChangeText}     />
                    </View>
 };

  renderFooter = () => {
    if (!this.state.requestLoading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}
      >
      <ActivityIndicator
                    animating = {true}
                    style = {styles.activityIndicator}
                    color = '#0000ff'
                    size = 'large'
                />
      </View>
    );
  };

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

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 0.09 * SCREEN_HEIGHT, justifyContent: 'center' }}>
          <View style={{ height: 0.065 * SCREEN_HEIGHT, flexDirection: 'row' }}>

            <View style={ styles.topView }>
              <Text style={ styles.titleText }>Categories</Text>
              <Text style={ styles.valueText } >Event: Wedding</Text>
            </View>

            <View style={styles.topView }>
              <Text style={ styles.titleText }>Distance</Text>
              <Text style={ styles.valueText }>2 km radius</Text>
            </View>

            <View style={ styles.topView }>
              <Text style={ styles.titleText }>Filter</Text>
              <Text style={ styles.valueText }>Nearest</Text>
            </View>

          </View>
        </View>
        <Container>
          <Content>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableOpacity key = { item.mavenID } style = {{ paddingHorizontal:10, backgroundColor:'#fff' }} onPress={() => Actions.skillPage({ title: 'Photographer' })}>
                <View style={{ paddingVertical:5, flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                    <Image source = {item.displayPicture ? {uri: item.displayPicture} : require('../../../assets/images/avatar.png')} style={{ height: 70, width: 70, borderRadius: 25 }} />
                  </View>
                  <View style={{ flex: 2, justifyContent:'center', paddingHorizontal:5 }}>
                    <TextInput defaultValue={item.title} editable={false} style={{ fontSize:13, color:'#515151', fontWeight:'400', height:17, width:150}}></TextInput>
                    <TextInput defaultValue={item.category} editable={false} style={{ color:'#145775', height:23,width:150, fontSize:12, fontWeight:'400' }}></TextInput>
                    <Text style={{ fontSize: 12, color:'#b5b5b5' }}>{`${item.firstName} ${item.lastName}`}</Text>
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
                  </View>
                  <View style={{ justifyContent: 'space-around', flex: 1, alignItems: 'flex-end', paddingHorizontal:10 }}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                      <Text style={{color:'#FFA838', fontWeight:"700", fontSize:15}}>${item.price}</Text>
                      <Text style={{ color:'#b5b5b5', fontWeight:'400', fontSize:12 }}>/hr</Text>
                    </View>
                    <TouchableOpacity style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}} onPress={() => Actions.genericBooking({ title: `${item.firstName} ${item.lastName}` })}>
                      <Icon name = "ios-chatbubbles-outline" style={{ fontSize: 29, color:'#3F6A86', paddingRight:5 }}/>
                      <Icon name = "ios-arrow-forward" style={{ fontSize: 18, color:'#BFD9E7', paddingLeft:5 }}/>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                      <Icon name='md-pin' style={{fontSize:15, paddingRight:2, color:'#BFD9E7'}} />
                      <Text style={{ fontSize: 15, color:'#b5b5b5', }}>{Math.round(item.distance / 100) / 10 + "Km"}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.email}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            onRefresh={this.handleRefresh}
            refreshing={this.state.refreshing}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.9}
            
          />  
        </Content>
      </Container>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor:'#fff'
  },
  
  titleText: { color:'#515151', fontSize:16 },
  valueText: { color:'#b5b5b5' },
  topView:{ flex: 1, paddingLeft: 10, justifyContent: 'center', borderRightWidth: 1, borderColor: '#ececec', alignItems:'center' }
});

const mapStateToProps = (state) =>({
  auth: state.auth,
  explore: state.explore
});
export default connect(mapStateToProps)(GenericView);
