import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet, Dimensions } from 'react-native';
// import { SearchBar } from 'react-native-elements'
const { width, height } = Dimensions.get('window');

const Aspect_Ratio = width/height;

const LATITUDE_DELTA = 0.0422;
const LONGITUDE_DELTA = Aspect_Ratio * LATITUDE_DELTA;

class MapComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			region: {
				latitude: -3.401554,
				longitude: 29.354072,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA
			}
		}
	}



	render(){
		return (
			<View style={styles.container} >
				<MapView
					provider={MapView.PROVIDER_GOOGLE}
					style={styles.map}
					region={this.state.region}
				>
				</MapView>
			
				
			</View>
		)
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