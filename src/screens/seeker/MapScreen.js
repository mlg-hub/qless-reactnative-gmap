import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as mapActions from '../../redux/actions/mapAction';
import MapComponent from '../../components/MapScreen/MapComponent';
import FindPlaceComponent from '../../components/MapScreen/FindPlaceComponent';
import ResultPlacesComponent from '../../components/MapScreen/ResultPlacesComponent';

class MapScreen extends Component {
	
	_renderResultPlaceComponent(){
		const {
			places, 
			actions: {getPlaceLocation,storeSelectedPlaceName}
		} = this.props;

		if(places.length !== 0) {
			return <ResultPlacesComponent 
				placesResults={places}
				getPlaceLocation={getPlaceLocation}
				storeSelectedPlaceName={storeSelectedPlaceName}
			 />;
		}
		return null;
	}
	render() {
		return (
			<View style={{ flex: 1}}>
				<MapComponent 
					storeUserPosition={this.props.actions.storeUserPosition}
				/>
				<FindPlaceComponent 
					getGooglePlaces={this.props.actions.getGooglePlaces}
					selectedPlaceName={this.props.selectedPlaceName}
				/>
				{this._renderResultPlaceComponent()}
			</View>
		);
	}
}



MapScreen.navigatorStyle = {
	navBarHidden: true,
	statusBarColor: 'rgba(0,0,0,0.3)'
}
function mapStateToProps(state){
	return {
		places: state.seeker.places || [],
		selectedPlace: state.seeker.selectedPlace,
		selectedPlaceName: state.seeker.selectedPlaceName
	}
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(mapActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
