import React, { Component } from 'react';
import { StyleSheet, View, Platform, Text, Image } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import { connect } from 'react-redux';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      id: 1,
      details: []
    };
  }
  componentWillMount() {
    this.fetchdetails();
  }

  componentDidMount() {

  }

  fetchdetails = () => {
    const getID = 'https://graph.facebook.com/me?access_token=' + this.props.token;
    fetch(getID)
      .then((response) => response.json())
      .then((responseData) => this.setState({ id: responseData.id }, () => {
        const fetchdetails = 'https://graph.facebook.com/v2.9/' + this.state.id + '?fields=name,first_name,last_name,gender,age_range,email&access_token=' + this.props.token;
        fetch(fetchdetails)
          .then((response) => response.json())
          .then((responseData1) => this.setState({ details: responseData1 }));
      }
      ));
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ backgroundColor: '#0B486B', padding: 10 }} >
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 8 }}>
              <View style={styles.ball} />
              <Image source={require('../../../assets/images/profile.png')} style={{ height: 150, width: 150, borderRadius: 75, position: 'absolute' }} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'flex-start', paddingTop: 2 }}>
              <Text style={{ fontSize: 26, color: 'white', fontWeight: 'bold', textShadowColor: 'black', textShadowOffset: { width: 2, height: 1 } }}>{this.state.details.name}</Text>
              <Text style={{ fontSize: 18, color: 'white', paddingBottom: 2 }}>{this.state.details.email}</Text>
            </View>
          </View>
          <View style={{ backgroundColor: 'rgba(17, 109, 161, 0.9)' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.socialView}>
                <Text style={styles.socialTextValue}>1094</Text>
                <Text style={styles.socialTextTitle}>FOLLOWERS</Text>
              </View>
              <View style={styles.socialView}>
                <Text style={styles.socialTextValue}>223</Text>
                <Text style={styles.socialTextTitle}>FOLLOWING</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', padding: 5, alignItems: 'center' }}>
                <Text style={styles.socialTextValue}>88</Text>
                <Text style={styles.socialTextTitle}>LIKES</Text>
              </View>
            </View>
          </View>
          <View style={{ flex:1, backgroundColor: 'rgba(196, 219, 231, 0.9)', padding:12 }}>
            <View style={{ backgroundColor: 'white', flex: 1,  borderRadius: 8 }}>
              <View style={{ alignItems: 'center', paddingBottom: 5, borderBottomWidth: 1, borderColor: '#EDF4F7' }}>
                <Text style={{ fontSize: 16 }}>Verified</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name='logo-facebook' style={{ marginRight: 10, color: '#3B5895' }} />
                  <Icon name='md-mail' />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 16 }}>Member since </Text>
                  <Text style={{ fontSize: 16 }}>12/06/2017</Text>
                </View>
              </View>
            </View>
          </View>

        </Content>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ball: {
    height: 160,
    width: 160,
    borderRadius: 80,
    borderWidth: 80,
    borderColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  socialTextValue: { fontSize: 20, color: 'white', fontWeight: 'bold' },

  socialTextTitle: {
    fontSize: 13, color: 'white', textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 }
  },

  socialView: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    borderColor: 'rgba(31, 95, 97, 0.9)', borderRightWidth: 1, padding: 5
  }
});

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps)(Profile);


