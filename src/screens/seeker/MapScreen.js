import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet, Dimensions } from 'react-native';

import MapComponent from '../../components/MapScreen/MapComponent';
import FindPlaceComponent from '../../components/MapScreen/FindPlaceComponent';
import ResultPlacesComponent from '../../components/MapScreen/ResultPlacesComponent';

class MapScreen extends Component {

	

	render() {
		return (
			<View style={{ flex: 1}}>
			
				<MapComponent />
				<FindPlaceComponent />
				<ResultPlacesComponent />
			</View>
		);
	}
}



MapScreen.navigatorStyle = {
	navBarHidden: true,
	statusBarColor: 'rgba(0,0,0,0.3)'
}

export default MapScreen;
