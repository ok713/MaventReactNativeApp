import React from 'react';
import { Icon } from 'native-base';
import { View, Text, Image } from 'react-native';

const ItemRow = (props) => {
  let provider = props.data;
  return (
    <View key={provider.id} style={{ height: 80, backgroundColor: 'white', margin: 1, flexDirection: 'row' }}>
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <Image source={require('../../assets/images/profile.png')} style={{ height: 45, width: 45, borderRadius: 22 }} />
        <Text style={{ fontSize: 15 }}>{provider.Name}</Text>
      </View>
      <View style={{ flex: 2, alignItems: 'center' }}>
        <Text style={{ fontSize: 15, paddingBottom: 15, paddingTop: 5 }}>{provider.Dist}</Text>
        <Text style={{ fontSize: 18 }}>{provider.Service}</Text>
      </View>
      <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <Icon name='md-thumbs-up' size={35} style={{ padding: 4 }} />
        <Icon name='md-chatbubbles' size={40} />
      </View>
    </View>
  );
};

export default ItemRow;