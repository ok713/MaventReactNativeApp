import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  ScrollView,
  Platform,
  BackHandler,
  ToastAndroid,
  Text
} from 'react-native';
import { Container, Content, Tab, Tabs, Header, Icon } from 'native-base';

class ActivityPage extends Component {
  // This is to remove fb token for retry purposes
  componentWillMount() {
    
  }

  render() {
    return (
        <Container>
           <Text>ActivityPage</Text>
        </Container>
      
    );
  }
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
  },
});

export default ActivityPage;
