import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StarRating from 'react-native-star-rating';

const RateComponent = (props) => {
  return <View style={styles.container}>
    <View style={{ flexDirection:'row', alignItems:'center' }}>
      <View style={{ backgroundColor: 'rgba(196, 219, 231, 0.9)', justifyContent:'center', alignItems:'center', width:50, height:50, borderRadius:17 }}>
        <Text style={{ color: '#2399E6' }} >{props.data.rate}</Text>
      </View>
      <Text style={{ fontSize: 18, paddingLeft:10, color:'#515151' }}>{props.data.name}</Text>
    </View>
    <StarRating
      disabled
      maxStars={5}
      rating={props.data.rate}
      starSize={20}
      starColor="#FFA838"
    />
  </View>
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding:10
  }
})

export default RateComponent;