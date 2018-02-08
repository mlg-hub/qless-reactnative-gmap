import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

const { width, height } = Dimensions.get('window');
const Aspect_Ratio = width/height;
const LATITUDE_DELTA = 0.0422;
const LONGITUDE_DELTA = Aspect_Ratio * LATITUDE_DELTA;

class MapComponent extends Component {
	constructor(){
		super();
		this.state = {
			region: {}
				// latitude: -3.401554,
				// longitude: 29.354072,
				// latitudeDelta: LATITUDE_DELTA,
				// longitudeDelta: LONGITUDE_DELTA
		}
	}

	componentWillMount() {
		this._getUserPosition();
	}

	 _getUserPosition() {
		console.log('getting the user position ready!');

		navigator.geolocation.getCurrentPosition((position) => {
			this.setState({ region: position.coords});
			console.log('the state is ', this.state);
			this.props.storeUserPosition({ latitude, longitude} = this.state.region)
			console.log('position was set');	
		},
		(error) => console.log(error.message),
		{enableHighAccuracy: true, timeout:50000, maximumAge: 2000}
		)
	}

	_renderMap(){
		if(!this.state.region.latitude) {
			return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
			)
		}else {
			const { latitude, longitude } = this.state.region;
			// const{ latitude, longitude} = this.state.test;
			
			region = {
				latitude: latitude,
				longitude: longitude,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			};
		
			return (
				<View style={styles.container} >
					<MapView
						provider={MapView.PROVIDER_GOOGLE}
						style={styles.map}
						region={region}
					>
					</MapView>
				</View>
			)
		}
		// when the latitude is not set yet
		
	}

	render(){
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