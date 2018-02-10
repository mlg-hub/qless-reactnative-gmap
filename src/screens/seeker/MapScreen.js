import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { View, StyleSheet, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as mapActions from '../../redux/actions/mapAction';
import MapComponent from '../../components/MapScreen/MapComponent';
import FindPlaceComponent from '../../components/MapScreen/FindPlaceComponent';
import ResultPlacesComponent from '../../components/MapScreen/ResultPlacesComponent';
import FabComponent from '../../components/MapScreen/FabComponent';

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
	_renderFabComponent(){
		if(this.props.selectedLatLong.latitude){
			return (
				<FabComponent onPressAction={() => null}/>
			)
		}
	}
	render() {
		const { 
			actions:{ storeUserPosition, getGooglePlaces},
			selectedPlaceName,
			selectedLatLong
			} = this.props;
		return (
			<View style={{ flex: 1}}>
				<MapComponent 
					storeUserPosition={storeUserPosition}
					selectedLatLong={selectedLatLong}
				/>
				<FindPlaceComponent 
					getGooglePlaces={getGooglePlaces}
					selectedPlaceName={selectedPlaceName}
				/>
				{this._renderResultPlaceComponent()}
				{this._renderFabComponent()}
			</View>
		);
	}
}



MapScreen.navigatorStyle = {
	navBarHidden: true,
	statusBarColor: 'rgba(0,0,0,0.3)'
}
function mapStateToProps(state){
	const { places, selectedPlaceName} = state.seeker;
	return {
		places: places || [],
		selectedLatLong: state.seeker.selectedPlace ? state.seeker.selectedPlace : {},
		selectedPlaceName:selectedPlaceName
	}
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(mapActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
