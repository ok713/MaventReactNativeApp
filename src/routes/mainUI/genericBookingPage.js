import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableHighlight,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Dimensions
} from 'react-native';

import DatePicker from 'react-native-datepicker';

const SCREEN_WIDTH = Dimensions.get('window').width;

class GenericBookingPage extends Component {
  constructor(props) {
      super(props);

      this.state = {
          maxDate: new Date(),
          date: ''
      };
    }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <View style={styles.viewContainer}>
            <View style={styles.CardContainer}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ marginTop: 10, fontSize: 20, fontWeight: '600' }}>Booking Form</Text>
              </View>

              <View style={{ marginTop: 15, width: 0.85 * SCREEN_WIDTH, backgroundColor: 'white', borderRadius: 3, padding: 6 }}>
                <Text style={{ textAlign: 'center' }}>This is a template form to help you customise your message for the provider. </Text>
              </View>

              <View style={{ width: 0.85 * SCREEN_WIDTH, marginTop: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>Date</Text>
                <View style={{ marginTop: 3, width: 0.85 * SCREEN_WIDTH, backgroundColor: 'white', borderRadius: 3, padding: 6 }}>
                  <DatePicker
                      style={{width: '100%'}}
                      date={this.state.date}
                      mode="date"
                      placeholder="Service Date"
                      format="DD-MM-YYYY"
                      minDate="02-01-1900"
                      maxDate={this.state.maxDate}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={(date) => { this.setState({ date }); }}
                      customStyles={{
                            dateInput: {
                                borderRadius:5, backgroundColor:'#fff'
                            }
                        }}
                  />
                </View>
              </View>

              <View style={{ width: 0.85 * SCREEN_WIDTH, marginTop: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>Offer Price $</Text>
                <View style={{ marginTop: 3, width: 0.85 * SCREEN_WIDTH, backgroundColor: 'white', borderRadius: 3, alignItems: 'center', padding: 6 }}>
                  <TextInput
                    placeholderTextColor="rgba(0,0,0,0.3)"
                    placeholder="Price"
                    returnKeyType='go'
                    keyboardType="numeric"
                    maxLength={6}
                    // ref={(input) => this.postal = input}
                    underlineColorAndroid='transparent'
                    style={{ height: 40, width: 0.8 * SCREEN_WIDTH, padding: 8, fontSize: 16 }}
                  />
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
                    underlineColorAndroid='transparent'
                    style={{ height: 40, width: 0.8 * SCREEN_WIDTH, padding: 8, fontSize: 16 }}
                  />
                </View>
              </View>

              <View style={{ width: 0.85 * SCREEN_WIDTH, marginTop: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>Service Description</Text>
                <View style={{ marginTop: 3, width: 0.85 * SCREEN_WIDTH, backgroundColor: 'white', borderRadius: 3, alignItems: 'center', padding: 8 }}>
                  <TextInput
                    placeholderTextColor="rgba(0,0,0,0.3)"
                    placeholder="Additional Information"
                    keyboardType="default"
                    autoCorrect
                    autoCapitalize="sentences"
                    multiline
                    returnKeyType='next'
                    ref={(input) => this.desc = input}
                    maxLength={140}
                    autoCorrect={false}
                    style={{ height: 100, width: 0.80 * SCREEN_WIDTH, alignItems: 'center', padding: 8, justifyContent: 'center', fontSize: 16, }}
                    underlineColorAndroid="transparent"
                  />
                </View>
              </View>

              <View style={{ width: 0.85 * SCREEN_WIDTH, marginTop: 20, paddingBottom: 12, flexDirection: 'row', justifyContent: 'space-around' }}>
                 <TouchableOpacity onPress={(e)=>{}} style={[styles.btn,{ backgroundColor:'#ccc'}]}>
                    <Text style={{fontSize:20}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={(e)=>{}} style={[styles.btn,{ backgroundColor:'#0B486B'}]}>
                    <Text style={{fontSize:20, color:'#fff'}}>Send Booking</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  btn:{justifyContent:'center', alignItems:'center', height:50,width: 0.4 * SCREEN_WIDTH, borderRadius:5,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 1
        } 
 }
});

export default GenericBookingPage;
