import React from 'react';
import Expo from 'expo';
import { View, ActivityIndicator, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { Container, Content, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import Search from 'react-native-search-box';
import ItemRow from '../../components/discoveryItem'
import LoadingComponent from '../../components/loadingComponent';

const SCREEN_H = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');

class Discovery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestLoading: true,
            statusBarHeight: 1,
            mapLoaded: false,
            errorMessage: null,
            location: null,
            region: {
                longitude: 103.8198,
                latitude: 1.3521,
                longitudeDelta: 0.0045,
                latitudeDelta: 0.0034
            }
        };
    }
    componentWillMount() {
        this.getLocationAsync();
        setTimeout(()=>this.setState({statusBarHeight: Expo.Constants.statusBarHeight-23}),500);
        this.props.setLocation(this.state.region);
        this.props.getNearbyList(this.state.region, this.props.auth.token);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({requestLoading: false});
    }
    async getLocationAsync() {

        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            Location.getCurrentPositionAsync({ enableHighAccuracy: true, maximumAge: 600000 }).then((position) => {
                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0045,
                    longitudeDelta: 0.0034,
                };
                this.setState({ region: userLocation });
                this.props.setLocation(userLocation);
                this.props.getNearbyList(userLocation, this.props.auth.token);
            }).catch((e) => {
                // this one is firing the error instantly
                alert(e + ' Please make sure your location (GPS) is turned on.');
            });
        } else {
            throw new Error('Location permission not granted');
        }
    }

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
        const {nearbyList} = this.props;
        return (
            <View style={{ flex: 1, paddingTop: this.state.statusBarHeight }}>
               <MapView
                    provider="google"
                    region={this.state.region}
                    showsMyLocationButton
                    showsUserLocation
                    showsScale
                    loadingEnabled
                    style={{ height: 0.3 * SCREEN_H }}
                />
                <View style={styles.listContainer}>
                    <View style={{backgroundColor:'#f8f8f8', padding:3}}>
                        <Search
                            ref="search_box" backgroundColor={'#f8f8f8'} inputStyle={{ backgroundColor:'#fff', borderWidth:1, borderColor:'#ececec'}}
                                placeholderTextColor="#a4a4a4"
                                tintColorSearch="#a4a4a4"
                                tintColorDelete="#e5e5e5"
                                titleCancelColor="#a4a4a4"
                                onSearch={this.onSearch}  onChangeText={this.onChangeText}     />
                    </View>
                    <Container>
                        <Content>
                            {
                                nearbyList.map((item, index)=>{
                                    return <ItemRow key={index} data={item}/>
                                })
                            }
                        </Content>
                        { this.state.requestLoading &&
                            <LoadingComponent/>
                        }
                    </Container>
                </View>

            </View>


        );
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
    },

    listContainer: {
        backgroundColor: '#f8f8f8',
        flex: 1,
    }
});

const mapStateToProps = (state) =>({
    auth: state.auth,
    nearbyList: state.explore.nearbyList,
});
const mapDispatchToProps = (dispatch) =>({
    setLocation: (location) => dispatch(actions.setLocation(location)),
    getNearbyList: (location, token) => dispatch(actions.getNearbyList(location, token)),
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Discovery);
