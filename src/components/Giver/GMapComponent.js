import React, { Component } from 'react';
import MapView, { Animated, AnimatedRegion, Marker} from 'react-native-maps';
import {
	View,
	StyleSheet,
	Dimensions, 
	ActivityIndicator,
	Alert
	} from 'react-native';
const { width, height } = Dimensions.get('window');
const ASPECT_RATION = width / height;
const LATITUDE_DELTA = 0.0422;
const LONGITUDE_DELTA = ASPECT_RATION * LATITUDE_DELTA;

class GMapComponent extends Component {
	constructor() {
		super();
		this.state = {
			region: {
				latitude: -1.292066,
				longitude: 36.821946
			},
			loading: false
		};
	}
	
	componentWillReceiveProps(nextProps) {
		// 
		console.log('gmapComponent will receive props', nextProps);
	}


	_handleTheRequest(requestID) {
		 this.props.handleTheRequest(requestID);
	}

	_renderMarker() {
		const requests = this.props.requests;
		return requests.map((req) => {
			const coords = { latitude: req.latitude, longitude: req.longitude };
			return (
				<Marker.Animated
					key={req._id} 
					coordinate={coords}
					onPress={() => this._showAlert(req._id)}
				/>
			);
		});
	}

	_showAlert(requestID) {
		Alert.alert(
			'Activity feedback',
			'Someone has requested for current activity information',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{ text: 'I\'am on it', onPress: () => this._handleTheRequest(requestID) }
			]
		);
	}

	_renderMap() {
		if (this.state.loading) {
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
					>
						{this._renderMarker()}
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

export default GMapComponent;
