import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
  View,
  TextInput,
  TouchableHighlight,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
  Picker,
  Animated
} from 'react-native';
import { Icon } from 'native-base';
import {ImagePicker} from 'expo';
import ListModal from '../../components/listModal';
import PickerModal from '../../components/picker';
import { Actions } from 'react-native-router-flux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const data = [
            { key: '0', section: true, label: 'Category' },
            { key: '1', label: 'Provide a Service' },
            { key: '2', label: 'Teach a Skill' }
        ];

const service = [
            { key: '0', section: true, label: 'Get a Service' },
            { key: 'cooking', label: 'Cooking & Baking' },
            { key: 'gadgets', label: 'Installation & reparation of gadgets' },
            { key: 'improvement', label: 'Home Improvement' },
            { key: 'clean', label: 'Cleaning' },
            { key: 'beauty', label: 'Beauty' },
            { key: 'photography', label: 'Photography & videography' },
            { key: 'art', label: 'Art & Design' },
            { key: 'care', label: 'Home Care' },
            { key: 'pet', label: 'Pet related' },
            { key: 'others', label: 'Others' },
        ];

const skill = [
            { key: '1', section: true, label: 'Learn a Skill' },
            { key: 'school', label: 'School subjects' },
            { key: 'art_skill', label: 'Art & Design' },
            { key: 'information', label: 'Information Technology' },
            { key: 'sports', label: 'Sports & Fitness' },
            { key: 'music', label: 'Music' },
            { key: 'cooking_skill', label: 'Cooking & Baking' },
            { key: 'others_skill', label: 'Others' },
        ];

const pickerData = Platform.OS==="android"?['Please Select...','Take photo...','Choose from Library...']:['Take photo...','Choose from Library...'];


class SkillList extends Component {
  constructor(props) {
      super(props);
      let subData = [];
      let mainCategory = '';
      if(this.props.category){
        if(this.props.category === 'Provide a Service') {
          subData = service;
          mainCategory = 0;
        }
        else {
          subData = skill;
          mainCategory = 1;
        }
      }
      this.state = {
            categoryShowModal:false,
              category: this.props.category?this.props.category:'',
              mainCategory: mainCategory,
              subData: subData,
              subcategory: '',
              categoryId: '',
              textInputValue: '',
              Mon: false,
              Tue: false,
              Wed: false,
              Thu: false,
              Fri: false,
              Sat: false,
              Sun: false,
              morning: false,
              afternoon: false,
              evening: false,
              night: false,
              modalData:data,
              showPicker:false,
              offSet: new Animated.Value(SCREEN_HEIGHT),
              pictures: [],
              idPictures: []
      };
  }

  onPressMon = () => {
    this.setState({ Mon: !this.state.Mon });
  }

  onPressTue = () => {
    this.setState({ Tue: !this.state.Tue });
  }

  onPressWed = () => {
    this.setState({ Wed: !this.state.Wed });
  }

  onPressThu = () => {
    this.setState({ Thu: !this.state.Thu });
  }

  onPressFri = () => {
    this.setState({ Fri: !this.state.Fri });
  }

  onPressSat = () => {
    this.setState({ Sat: !this.state.Sat });
  }

  onPressSun = () => {
    this.setState({ Sun: !this.state.Sun });
  }

  onPressMorning = () => {
    this.setState({ morning: !this.state.morning });
  }

  onPressAfternoon = () => {
    this.setState({ afternoon: !this.state.afternoon });
  }

  onPressEvening = () => {
    this.setState({ evening: !this.state.evening });
  }

  onPressNight = () => {
    this.setState({ night: !this.state.night });
  }

  modalHandler = (isShow, category, id) => {
        if(this.state.isCategory) {
            let subData ;
            switch (category) {
                case 'Provide a Service':
                    subData = service;
                    break;
                case 'Teach a Skill':
                    subData = skill;
                    break;
                default:
                    subData = [];
                    break;
            }
            this.setState({categoryShowModal:false, subData:subData, category:category, subcategory:'', mainCategory: id});
        }
        else {
            this.setState({categoryShowModal:false, subcategory:category, categoryId: id});
        }
  }

  changeValue = (value) => {
    if(Platform.OS==="android"){
      if(value === 1) this.takePhoto();
      else if(value === 2) this._openCameraRoll();
    }
    else{
      if(value === 0) this.takePhoto();
      else if(value === 1) this._openCameraRoll();
    }
  }

  _openCameraRoll = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({allowsEditing:true, aspect:[4,3]});
    let tempPictures = this.state.pictures;
    let tempIdPictures = this.state.idPictures;
    if(!image.cancelled) {
      if(this.state.picNumber === 0) this.setState({picUrl0:{uri:image.uri}});
      if(this.state.picNumber === 1) this.setState({picUrl1:{uri:image.uri}});
      if(this.state.picNumber === 2) this.setState({picUrl2:{uri:image.uri}});
      if(this.state.picNumber === 3) this.setState({idPicUrl0:{uri:image.uri}});
      if(this.state.picNumber === 4) this.setState({idPicUrl1:{uri:image.uri}});
      if(this.state.picNumber < 3) tempPictures.push(image.uri);
      if(this.state.picNumber > 2) tempIdPictures.push(image.uri);
      this.setState({pictures: tempPictures, idPictures: tempIdPictures});
    }
  }

  takePhoto = async () => {
      let image = await ImagePicker.launchCameraAsync({allowsEditing:true, aspect:[4,3]});
      if(!image.cancelled) {
        if(this.state.picNumber === 0) this.setState({picUrl0:{uri:image.uri}});
        if(this.state.picNumber === 1) this.setState({picUrl1:{uri:image.uri}});
        if(this.state.picNumber === 2) this.setState({picUrl2:{uri:image.uri}});
        if(this.state.picNumber === 3) this.setState({idPicUrl0:{uri:image.uri}});
        if(this.state.picNumber === 4) this.setState({idPicUrl1:{uri:image.uri}});
      }
  }

  onAdd = () => {
    if(!this.state.mainCategory || this.state.mainCategory.length < 0) {
      alert('Please select main category.');
      return;
    }
    if(!this.state.categoryId || this.state.categoryId.length < 0) {
      alert('Please select category.');
      return;
    }
    if(!this.state.title || this.state.title.length < 0) {
      alert('Please input title.');
      return;
    }
    if(!this.state.description || this.state.description.length < 0) {
      alert('Please input description.');
      return;
    }
    if(!this.state.price || this.state.price.length < 0) {
      alert('Please input title.');
      return;
    }
    let dayList = [];
    if(this.state.Mon) dayList.push(0);
    if(this.state.Tue) dayList.push(1);
    if(this.state.Wed) dayList.push(2);
    if(this.state.Thu) dayList.push(3);
    if(this.state.Fri) dayList.push(4);
    if(this.state.Sat) dayList.push(5);
    if(this.state.Sun) dayList.push(6);

    if(dayList.length < 0) {
      alert('Please select available day.');
      return;
    }
    let timeList = [];
    if(this.state.morning) timeList.push(0);
    if(this.state.afternoon) timeList.push(1);
    if(this.state.evening) timeList.push(2);
    if(this.state.night) timeList.push(3);

    if(timeList.length < 0) {
      alert('Please select available time.');
      return;
    }
    let data = {
      mainCategory: this.state.mainCategory,
      category: this.state.categoryId,
      title: this.state.title,
      description: this.state.description,
      postalCode: this.state.postalCode,
      dayAvailable: dayList.join(','),
      timeAvailable: timeList.join(','),
      price: this.state.price,
      idPictures: this.state.idPictures,
      pictures: this.state.pictures
    }
    console.log(data);
    
  }

  
  render() {
    return (
        <View style={{flex:1}} >
          <ScrollView style={styles.container}>
            <View style={styles.viewContainer}>
              <View style={styles.CardContainer}>

                <View style={{ width: 0.85 * SCREEN_WIDTH, marginTop: 10 }}>
                  <Text style={{ marginBottom:5 ,fontSize: 16, fontWeight: '600' }}>Service Category</Text>
                  <TouchableHighlight onPress={(e)=>{this.setState({modalData:data, categoryShowModal:true, isCategory:true})}}>
                      <TextInput
                          style={{ backgroundColor:'#fff', borderWidth: 1, borderColor: '#ccc', padding: 10, height: 40 }}
                          editable={false}
                          placeholder="Select a Category"
                          value={this.state.category}
                      />
                  </TouchableHighlight>
                  <TouchableHighlight onPress={(e)=>{ if(this.state.category!=='') this.setState({modalData:this.state.subData, categoryShowModal:true, isCategory:false})}}>
                      <TextInput
                          style={{ backgroundColor:'#fff', borderWidth: 1, borderColor: '#ccc', padding: 10, height: 40 }}
                          editable={false}
                          placeholder={this.state.category===''?"Select a Category first":'Select a Sub-Category'}
                          value={this.state.subcategory}
                      />
                  </TouchableHighlight>
                  {
                      this.state.categoryShowModal &&
                          <ListModal data={this.state.modalData} show={this.state.categoryShowModal} handler={this.modalHandler}/>
                  }
                </View>
                <View style={{ width: 0.85 * SCREEN_WIDTH, marginTop: 15 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>Service Title</Text>
                  <View style={{ marginTop: 3, width: 0.85 * SCREEN_WIDTH, backgroundColor: 'white', borderRadius: 3, alignItems: 'center', padding: 6 }}>
                    <TextInput
                      placeholderTextColor="rgba(0,0,0,0.3)"
                      placeholder="Title"
                      keyboardType="default"
                      autoCorrect
                      autoCapitalize="sentences"
                      // multiline
                      returnKeyType='next'
                      onSubmitEditing={() => this.desc.focus()}
                      ref={(input) => this.title = input}
                      onChangeText = {title => this.setState(title)}
                      maxLength={80}
                      autoCorrect={false}
                      style={{ height: 40, width: 0.80 * SCREEN_WIDTH, alignItems: 'center', padding: 8, justifyContent: 'center', fontSize: 16, }}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                </View>

                <View style={{ width: 0.85 * SCREEN_WIDTH, marginTop: 15 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>Service Description</Text>
                  <View style={{ marginTop: 3, width: 0.85 * SCREEN_WIDTH, backgroundColor: 'white', borderRadius: 3, alignItems: 'center', padding: 8 }}>
                    <TextInput
                      placeholderTextColor="rgba(0,0,0,0.3)"
                      placeholder="Please keep it within 140 characters"
                      keyboardType="default"
                      returnKeyType="next"
                      autoCapitalize="sentences"
                      multiline={true}
                      numberOfLines={4}
                      ref={(input) => this.desc = input}
                      onChangeText = {description => this.setState(description)}
                      maxLength={140}
                      autoCorrect={false}
                      style={{ width: 0.80 * SCREEN_WIDTH, alignItems: 'center', padding: 8, justifyContent: 'center', fontSize: 16, }}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                </View>

                <View style={{ width: 0.85 * SCREEN_WIDTH, marginTop: 15 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>Price</Text>
                  <View style={{ marginTop: 3, width: 0.85 * SCREEN_WIDTH, backgroundColor: 'white', borderRadius: 3, alignItems: 'center', padding: 6 }}>
                    <TextInput
                      placeholderTextColor="rgba(0,0,0,0.3)"
                      placeholder="Price"
                      keyboardType="default"
                      autoCorrect
                      autoCapitalize="sentences"
                      // multiline
                      returnKeyType='next'
                      onSubmitEditing={() => this.desc.focus()}
                      ref={(input) => this.price = input}
                      onChangeText = {price => this.setState(price)}
                      maxLength={80}
                      autoCorrect={false}
                      style={{ height: 40, width: 0.80 * SCREEN_WIDTH, alignItems: 'center', padding: 8, justifyContent: 'center', fontSize: 16, }}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                </View>

                <View style={{ width: 0.85 * SCREEN_WIDTH, marginTop: 15 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>Photos</Text>
                  <View style={{ marginTop: 3,  flexDirection:'row' }}>
                    <TouchableOpacity style={ styles.photoView } onPress={(e)=>this.setState({ picNumber:0, showPicker:true})} >
                      {
                        this.state.picUrl0?
                        <Image source={ this.state.picUrl0 } style={{ width:'100%', height:'100%' }}/>
                        :
                        <Icon name="md-add-circle"/>
                      }
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.photoView } onPress={(e)=>this.setState({ picNumber:1, showPicker:true})} >
                      {
                        this.state.picUrl1?
                        <Image source={ this.state.picUrl1 } style={{ width:'100%', height:'100%' }}/>
                        :
                        <Icon name="md-add-circle"/>
                      }
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.photoView } onPress={(e)=>this.setState({ picNumber:2, showPicker:true})} >
                      {
                        this.state.picUrl2?
                        <Image source={ this.state.picUrl2 } style={{ width:'100%', height:'100%' }}/>
                        :
                        <Icon name="md-add-circle"/>
                      }
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ width: 0.85 * SCREEN_WIDTH, marginTop: 15 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>Address: Postal Code</Text>
                  <View style={{ marginTop: 3, width: 0.85 * SCREEN_WIDTH, backgroundColor: 'white', borderRadius: 3, alignItems: 'center', padding: 8 }}>
                    <TextInput
                      placeholderTextColor="rgba(0,0,0,0.3)"
                      placeholder="6-Digits postal code"
                      returnKeyType='go'
                      keyboardType="numeric"
                      maxLength={6}
                      // ref={(input) => this.postal = input}
                      onChangeText = {postalCode => this.setState(postalCode)}
                      underlineColorAndroid='transparent'
                      style={{ height: 40, width: 0.8 * SCREEN_WIDTH, padding: 8, fontSize: 16 }}
                    />
                  </View>
                </View>

                <View style={{ width: 0.85 * SCREEN_WIDTH, marginTop: 15 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>Day Availability</Text>
                  <View style={{ marginTop: 3, width: 0.85 * SCREEN_WIDTH, backgroundColor: 'white', borderRadius: 3, alignItems: 'center', padding: 8, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableHighlight underlayColor='#158BCF' style={this.state.Mon ? styles.buttonPressed : styles.button} onPress={this.onPressMon}>
                      <View style={{ borderWidth: 1, borderColor: '#ccc', height: 40, width: 40, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>M</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='#158BCF' style={this.state.Tue ? styles.buttonPressed : styles.button} onPress={this.onPressTue}>
                      <View style={{ borderWidth: 1, borderColor: '#ccc', height: 40, width: 40, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>T</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='#158BCF' style={this.state.Wed ? styles.buttonPressed : styles.button} onPress={this.onPressWed}>
                      <View style={{ borderWidth: 1, borderColor: '#ccc', height: 40, width: 40, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>W</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='#158BCF' style={this.state.Thu ? styles.buttonPressed : styles.button} onPress={this.onPressThu}>
                      <View style={{ borderWidth: 1, borderColor: '#ccc', height: 40, width: 40, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>T</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='#158BCF' style={this.state.Fri ? styles.buttonPressed : styles.button} onPress={this.onPressFri}>
                      <View style={{ borderWidth: 1, borderColor: '#ccc', height: 40, width: 40, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>F</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='#158BCF' style={this.state.Sat ? styles.buttonPressed : styles.button} onPress={this.onPressSat}>
                      <View style={{ borderWidth: 1, borderColor: '#ccc', height: 40, width: 40, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>S</Text>
                      </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='#158BCF' style={this.state.Sun ? styles.buttonPressed : styles.button} onPress={this.onPressSun}>
                      <View style={{ borderWidth: 1, borderColor: '#ccc', height: 40, width: 40, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>S</Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                </View>

                <View style={{ width: 0.85 * SCREEN_WIDTH, marginTop: 15, height: 140 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>Time Availability</Text>
                  <View style={{ marginTop: 3, width: 0.85 * SCREEN_WIDTH, backgroundColor: 'white', borderRadius: 3, padding: 8, justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <TouchableHighlight underlayColor='#158BCF' style={this.state.morning ? styles.buttonPressed : styles.button} onPress={this.onPressMorning}>
                        <View style={{ borderWidth: 1, borderColor: '#ccc', height: 42, width: 95, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 16, fontWeight: '600' }}>Morning</Text>
                        </View>
                      </TouchableHighlight>

                      <TouchableHighlight underlayColor='#158BCF' style={this.state.afternoon ? styles.buttonPressed : styles.button} onPress={this.onPressAfternoon}>
                        <View style={{ borderWidth: 1, borderColor: '#ccc', height: 42, width: 95, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 16, fontWeight: '600' }}>Afternoon</Text>
                        </View>
                      </TouchableHighlight>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <TouchableHighlight underlayColor='#158BCF' style={this.state.evening ? styles.buttonPressed : styles.button} onPress={this.onPressEvening}>
                        <View style={{ borderWidth: 1, borderColor: '#ccc', height: 42, width: 95, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 16, fontWeight: '600' }}>Evening</Text>
                        </View>
                      </TouchableHighlight>
                      <TouchableHighlight underlayColor='#158BCF' style={this.state.night ? styles.buttonPressed : styles.button} onPress={this.onPressNight}>
                        <View style={{ borderWidth: 1, borderColor: '#ccc', height: 42, width: 95, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 16, fontWeight: '600' }}>Night</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>
                <View style={{ width: 0.85 * SCREEN_WIDTH, marginTop: 15 }}>
                  <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <View style={{flex:1, borderBottomWidth:1, borderColor:'#a9a9a9'}} />
                        <Text style={{padding:10, color:'#808080'}}>OPTIONAL</Text>
                        <View style={{flex:1, borderBottomWidth:1, borderColor:'#a9a9a9'}} />
                  </View>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>ID Verification</Text>
                  <View style={{ marginTop: 3,  flexDirection:'row' }}>
                    <TouchableOpacity style={ styles.photoView } onPress={(e)=>this.setState({ picNumber:3, showPicker:true})} >
                      {
                        this.state.idPicUrl0?
                        <Image source={ this.state.idPicUrl0 } style={{ width:'100%', height:'100%' }}/>
                        :
                        <Icon name="md-add-circle"/>
                      }
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.photoView } onPress={(e)=>this.setState({ picNumber:4, showPicker:true})} >
                      {
                        this.state.idPicUrl1?
                        <Image source={ this.state.idPicUrl1 } style={{ width:'100%', height:'100%' }}/>
                        :
                        <Icon name="md-add-circle"/>
                      }
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ width: 0.85 * SCREEN_WIDTH, marginTop: 15, paddingBottom: 12, flexDirection: 'row', justifyContent: 'space-around' }}>
                  <TouchableOpacity onPress={(e)=>{ Actions.pop() }} style={[styles.btn,{ backgroundColor:'#ccc'}]}>
                      <Text style={{fontSize:20}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={(e)=> {this.onAdd()}} style={[styles.btn,{ backgroundColor:'#0B486B'}]}>
                      <Text style={{fontSize:20, color:'#fff'}}>List it!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
           {this.state.showPicker ? <PickerModal closeModal={() => this.setState({ showPicker: false })} data={pickerData} offSet={this.state.offSet}  changeValue={this.changeValue} /> : null}
        </View>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  CardContainer: {
    flex: 1,
    width: 0.95 * SCREEN_WIDTH,
    backgroundColor: '#D7D7D9',
    marginTop: 8,
    borderRadius: 4,
    alignItems: 'center'
  },
  buttonPressed: {
    backgroundColor: '#158BCF',
  },
  button: {
    backgroundColor: 'white'
  },
  btn:{justifyContent:'center', alignItems:'center', height:50,width: 0.35 * SCREEN_WIDTH, borderRadius:5,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1
        } 
 },
 photoView: { flex:1, borderWidth:1, borderRadius:3, borderColor: '#ccc', height:80, 
        backgroundColor:'#fff', justifyContent:"center", alignItems:'center' }
});

export default SkillList;
