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
	
	// componentWillReceiveProps(nextProps) {
	// 	if (nextProps.userPosition.latitude) {
	// 		this.setState({ loading: false, region: nextProps.userPosition });
	// 	}
	// }

	_handleTheRequest(){
		this.props.handleTheRequest();
	}

	_showAlert(){
		Alert.alert(
			'Activity feedback',
			'Mlg has requested to get current activity feedback on Nakumatt lifestyle',
			[
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
				{ text: 'I\'am on it', onPress: () => this._handleTheRequest() }
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
						<Marker.Animated 
							coordinate={region}
							onPress={() => this._showAlert()}
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

export default GMapComponent;
