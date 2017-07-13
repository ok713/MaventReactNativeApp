import React from 'react';
import { View, ActivityIndicator, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { Container, Content, Tab, Tabs, Header, Icon } from 'native-base';

import ItemRow from '../../components/discoveryItem'
import data from '../../services/provider.json';

const SCREEN_H = Dimensions.get('window').height;

class Discovery extends React.Component {
    constructor() {
        super();
        this.state = {
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
    }
    async getLocationAsync() {

        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        // console.log({ status });
        if (status === 'granted') {
            Location.getCurrentPositionAsync({ enableHighAccuracy: true, maximumAge: 600000 }).then((position) => {
                // console.log({ position });
                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.0045,
                    longitudeDelta: 0.0034,
                };
                this.setState({ region: userLocation });
            }).catch((e) => {
                // this one is firing the error instantly
                alert(e + ' Please make sure your location (GPS) is turned on.');
            });
        } else {
            throw new Error('Location permission not granted');
        }
    }

    render() {
        return (
            <View style={styles.mapContainer}>
                <MapView
                    // provider="google"
                    region={this.state.region}
                    showsMyLocationButton
                    showsUserLocation
                    showsScale
                    loadingEnabled
                    style={{ height: 0.3 * SCREEN_H }}
                />
                <View style={styles.listContainer}>
                    <View style={{ height: 40, borderTopWidth: 1, borderColor: 'gray', backgroundColor: '#0B486B', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 13, color: 'white' }}>Mavens in this area!</Text>
                    </View>
                    <Container>
                        <Content>
                            {
                                data.map((item, index)=>{
                                    return <ItemRow key={index} data={item}/>
                                })
                            }
                        </Content>
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
        backgroundColor: '#D5DED9',
        flex: 1,
    }
});

export default Discovery;
