import React, { Component } from 'react';
import MapView, { Animated, AnimatedRegion, Marker} from 'react-native-maps';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

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
		// const socket = io('https://afternoon-shore-67188.herokuapp.com', { 
		// 					jsonp: false });
		// socket.on('connect', () => {
		// 	console.log('conneted');
		// });
	}
	componentWillReceiveProps(nextProps){
		// console.log('this is the next props', nextProps);

		if (this.props.selectedLatLong.latitude) {

			  this.setState({ region: nextProps.selectedLatLong });
		// 	// if(this.props.selectedLatLong !== nextProps.selectedLatLong){
		// 	// 	// const { latitude, longitude} = nextProps.selectedLatLong;
		// 	// 	console.log(this.state);
		// 	// }
		}
	}
	//
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
		);
	}

	_onRegionChange(region){
		console.log(region);
	}

	_renderMap() {
		if(!this.state.region.latitude) {
			return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
			)
		}else {
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
					/>
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