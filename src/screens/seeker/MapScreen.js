import React, { Component } from 'react';
import { View } from 'react-native';
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
			actions: { getPlaceLocation, storeSelectedPlaceName }
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
	async _saveAndRequestID() {
				const resquestId = await this.props.actions.requestPlaceInfo();
				console.log('this is the request id', resquestId);
				return resquestId;
	}
	async _goToRequestPage() {
			const requestID = await this._saveAndRequestID();
					this.props.navigator.showModal({
						screen: 'qless.RequestPending',
						title: 'Request pending...',
						passProps: {
							requestID
						}
					});
	}
	_renderFabComponent() {
		if(this.props.selectedLatLong.latitude) {
			return (
				<FabComponent onPressAction={() => this._goToRequestPage()} />
			);
		}
	}
	_toggleDrawer() {
			console.log('show clicked!');
			this.props.navigator.toggleDrawer({
					side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
					animated: true, // does the toggle have transition animation or does it happen immediately (optional)
					to: 'open' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
				});
	}

	_renderFindPlaceComponent() {
		const { actions: { getGooglePlaces }, userPosition, selectedPlaceName } = this.props;
		if(userPosition) {
			return (
				<FindPlaceComponent 
					toggleDrawer={() => this._toggleDrawer()}
					getGooglePlaces={getGooglePlaces}
					selectedPlaceName={selectedPlaceName}
				/>
			);
		}
	}
	render() {
		const { 
			actions: { storeUserPosition },
			selectedLatLong
			} = this.props;
		return (
			<View style={{ flex: 1}}>
				<MapComponent 
					storeUserPosition={storeUserPosition}
					selectedLatLong={selectedLatLong}
				/>
				{this._renderFindPlaceComponent()}
				{this._renderResultPlaceComponent()}
				{this._renderFabComponent()}
			</View>
		);
	}
}



MapScreen.navigatorStyle = {
	navBarHidden: true,
	navBarBackgroundColor: 'transparent',
	navBarTextColor: 'transparent',
	navBarButtonColor: '#0a0a0a',
	statusBarColor: 'rgba(0,0,0,0.3)'
}
function mapStateToProps(state){
	const { places, selectedPlaceName } = state.seeker;
	return {
		places: places || [],
		selectedLatLong: state.seeker.selectedPlace ? state.seeker.selectedPlace : {},
		selectedPlaceName,
		userPosition: state.shared.userPosition
	}
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(mapActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
