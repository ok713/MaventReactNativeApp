import React from 'react';
import { Icon } from 'native-base';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';

const ItemRow = (props) => {
  let provider = props.data;
  return (
    <View style = {{ paddingHorizontal:10, backgroundColor:'#fff' }}>
      <View key={provider.id} style={{ paddingVertical:5, flexDirection: 'row', borderBottomWidth:1, borderBottomColor: '#ececec' }}>
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          <Image source={require('../../assets/images/profile.png')} style={{ height: 70, width: 70, borderRadius: 25 }} />
        </View>
        <View style={{ flex: 2, justifyContent:'center', paddingHorizontal:5 }}>
          <TextInput defaultValue={provider.tags.toString()} editable={false} style={{ fontSize:13, color:'#515151', fontWeight:'400', height:17, width:150}}></TextInput>
          <TextInput defaultValue={provider.Service} editable={false} style={{ color:'#145775', height:23,width:150, fontSize:12, fontWeight:'400' }}></TextInput>
          <Text style={{ fontSize: 12, color:'#b5b5b5' }}>{provider.Name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <StarRating
              disabled
              maxStars={5}
              rating={props.data.rate}
              starSize={15}
              starColor="#FFA838"
              starStyle={{paddingHorizontal:2}}
            />
            <Text style={{ color:'#b5b5b5'}}>({props.data.rate})</Text>
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
            <Text style={{ fontSize: 15, color:'#b5b5b5', }}>{provider.Dist}</Text>
          </View>
          {/*<Icon name='md-thumbs-up' size={35} style={{ padding: 4 }} />
          <Icon name='md-chatbubbles' size={40} />*/}
        </View>
      </View>
    </View>
  );
};

export default ItemRow;