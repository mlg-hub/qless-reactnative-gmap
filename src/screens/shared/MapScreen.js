import React, { Component } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as mapActions from '../../redux/actions/mapAction';
import MapComponent from '../../components/Seeker/MapScreen/MapComponent';
import FindPlaceComponent from '../../components/Seeker/MapScreen/FindPlaceComponent';
import ResultPlacesComponent from '../../components/Seeker/MapScreen/ResultPlacesComponent';
import FabComponent from '../../components/Seeker/MapScreen/FabComponent';

class MapScreen extends Component {

	_renderResultPlaceComponent() {
		const {
			places,
			actions: { getPlaceLocation, storeSelectedPlaceName }
		} = this.props;

		if (places.length !== 0) {
			return (<ResultPlacesComponent 
					placesResults={places}
					getPlaceLocation={getPlaceLocation}
					storeSelectedPlaceName={storeSelectedPlaceName}
			/>);
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
	
	_renderFindPlaceComponent() {
		const { actions: { getGooglePlaces }, userPosition, selectedPlaceName } = this.props;
		if (userPosition) {
			return (
				<FindPlaceComponent 
					toggleDrawer={() => this._toggleDrawer()}
					getGooglePlaces={getGooglePlaces}
					selectedPlaceName={selectedPlaceName}
				/>
			);
		}
	}

	_renderSeekerView() {
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


	render() {
		// return this._renderViews();
		return this._renderSeekerView();
	}
}

MapScreen.navigatorStyle = {
	// navBarHidden: true,
	statusBarColor: 'rgba(0,0,0,0.3)',
	statusBarTextColorScheme: 'light',
	navigationBarColor: 'black',
	navBarBackgroundColor: '#0a0a0a',
	navBarTextColor: 'white',
	navBarButtonColor: 'white'
};

function mapStateToProps(state) {
	const { places, selectedPlaceName } = state.seeker;
	return {
		places: places || [],
		selectedLatLong: state.seeker.selectedPlace ? state.seeker.selectedPlace : {},
		selectedPlaceName,
		userPosition: state.shared.userPosition,
		currentUser: state.shared.currentUser || {}
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(mapActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
