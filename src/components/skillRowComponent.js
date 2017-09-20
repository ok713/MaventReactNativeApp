import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import StarRating from 'react-native-star-rating';
import RateComponent from './rateComponent';

const SkillRowComponent = (props) => {
  return <View style={styles.wrapper}>
                <View style={{ paddingBottom: 3, flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
                  <Text style={{ fontSize: 16, color:'#515151' }}>{ props.mainCategory === 0 ? "My Service" : "My Skill" }</Text>
                  <TouchableOpacity  onPress={() => Actions.skillList({category: props.mainCategory === 0 ? 'Provide a Service' : 'Teach a Skill' })}>
                    <Text style={{ color:'#FFA838' }} >Add</Text>
                  </TouchableOpacity>
                </View>
                <RateComponent {...props} />
              </View>
};
const styles = StyleSheet.create({
  wrapper: { padding: 10, borderBottomWidth: 1, borderColor: '#EDF4F7' }
})

export default SkillRowComponent;