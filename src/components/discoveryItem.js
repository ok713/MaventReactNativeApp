import React from 'react';
import { Icon } from 'native-base';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Actions } from 'react-native-router-flux';
import categoryData from '../services/category.json';

const ItemRow = (props) => {
  let provider = props.data;
  return (
    <TouchableOpacity style = {{ paddingHorizontal:10, backgroundColor:'#fff' }} onPress={() => Actions.skillPage({ title: 'Photographer' })}>
      <View key={provider.mavenID} style={{ paddingVertical:5, flexDirection: 'row', borderBottomWidth:1, borderBottomColor: '#ececec' }}>
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          <Image source={provider.displayPicture ? {uri: provider.displayPicture} : require('../../assets/images/avatar.png')} style={{ height: 70, width: 70, borderRadius: 25 }} />
        </View>
        <View style={{ flex: 2, justifyContent:'center', paddingHorizontal:5 }}>
          <TextInput defaultValue={provider.title} editable={false} style={{ fontSize:13, color:'#515151', fontWeight:'400', height:17, width:150}}></TextInput>
          <TextInput defaultValue={categoryData[provider.category]} editable={false} style={{ color:'#145775', height:23,width:150, fontSize:12, fontWeight:'400' }}></TextInput>
          <Text style={{ fontSize: 12, color:'#b5b5b5' }}>{provider.firstName + " " + provider.lastName}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <StarRating
              disabled
              maxStars={5}
              rating={provider.rating}
              starSize={15}
              starColor="#FFA838"
              starStyle={{paddingHorizontal:2}}
            />
            <Text style={{ color:'#b5b5b5'}}>({provider.rating})</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'space-around', flex: 1, alignItems: 'flex-end', paddingHorizontal:10 }}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={{color:'#FFA838', fontWeight:"700", fontSize:15}}>${provider.price}</Text>
            <Text style={{ color:'#b5b5b5', fontWeight:'400', fontSize:12 }}>/hr</Text>
          </View>
          <TouchableOpacity style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'center'}}>
            <Icon name = "ios-chatbubbles-outline" style={{ fontSize: 29, color:'#3F6A86', paddingRight:5 }}/>
            <Icon name = "ios-arrow-forward" style={{ fontSize: 18, color:'#BFD9E7', paddingLeft:5 }}/>
          </TouchableOpacity>
          <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <Icon name='md-pin' style={{fontSize:15, paddingRight:2, color:'#BFD9E7'}} />
            <Text style={{ fontSize: 15, color:'#b5b5b5', }}>{ Math.round(provider.distance / 100) / 10 + "Km" }</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemRow;