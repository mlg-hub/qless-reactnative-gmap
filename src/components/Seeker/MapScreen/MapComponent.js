import React, { Component } from 'react';
import MapView, { Animated, AnimatedRegion, Marker} from 'react-native-maps';
import { View, PermissionsAndroid,StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

const { width, height } = Dimensions.get('window');
const ASPECT_RATION = width / height;
const LATITUDE_DELTA = 0.0422;
const LONGITUDE_DELTA = ASPECT_RATION * LATITUDE_DELTA;

class MapComponent extends Component {
	constructor() {
		super();
		this.state = {
			region: {}
		};
	}

	componentWillMount() {
		this._getUserPosition();
	}
	
	componentDidMount() {
		console.log(this.props, this.state);
	}

	
	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedLatLong.latitude) {
			if (this.props.selectedLatLong.placeID !== nextProps.selectedLatLong.placeID){
				this.setState({ region: nextProps.selectedLatLong });
			}
		}	
	}
	async _getUserPosition() {
		console.log('getting the user position ready!');
		
		// navigator.geolocation.getCurrentPosition((position) => {
		// 		this.setState({ region: position.coords });
		// 		const { latitude, longitude } = this.state.region;
		// 		this.props.storeUserPosition({ latitude, longitude });
		// 	},
		// 	(error) => console.log(error.message),
		// 	{ enableHighAccuracy: true, timeout: 500000, maximumAge: 3000 }
		// );
		const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                        title: 'App needs to access your location',
                        message: 'App needs access to your location ' +
                        'so we can let our app be even more awesome.'
                        }
                    );
     if (granted) {

        FusedLocation.setLocationPriority(FusedLocation.Constants.HIGH_ACCURACY);
// Set options.
        FusedLocation.setLocationPriority(FusedLocation.Constants.BALANCED);
        FusedLocation.setLocationInterval(20000);
        FusedLocation.setFastestLocationInterval(15000);
        FusedLocation.setSmallestDisplacement(10);
        // Get location once.
        const location = await FusedLocation.getFusedLocation();
        this.setState({region: location});
		const { latitude, longitude } = this.state.region;
		this.props.storeUserPosition({ latitude, longitude });
	}

	_onRegionChange(region) {
		console.log(region);
	}
	_renderMap() {
		if (!this.state.region.latitude) {
			return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
			);
		}
		const { latitude, longitude } = this.state.region;
		// const{ latitude, longitude} = this.state.test;
		
		const region = new AnimatedRegion({
			latitude,
			longitude,
			latitudeDelta: LATITUDE_DELTA,
			longitudeDelta: LONGITUDE_DELTA,
		});
			return (
				<View style={styles.container} >
					<Animated
						provider={MapView.PROVIDER_GOOGLE}
						style={styles.map}
						region={region}
						onRegionChange={(reg) => this._onRegionChange(reg)}
					>
					<Marker.Animated
					coordinate={region}
					/>
					</Animated>
				</View>
			);
		// when the latitude is not set yet	
	}

	render() {
		return this._renderMap();
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center'
	},
	map: {
		...StyleSheet.absoluteFillObject
	}
});

export default MapComponent;
