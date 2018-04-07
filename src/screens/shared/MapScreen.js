import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as mapActions from '../../redux/actions/mapAction';
import MapComponent from '../../components/Seeker/MapScreen/MapComponent';
import FindPlaceComponent from '../../components/Seeker/MapScreen/FindPlaceComponent';
import ResultPlacesComponent from '../../components/Seeker/MapScreen/ResultPlacesComponent';
import FabComponent from '../../components/Seeker/MapScreen/FabComponent';

class MapScreen extends Component {

	constructor() {
		super();
		this.state = {
			placeInfoArray: [],
			auth: false,
			username: ""
		};
		// this.setState({ placeInfoArray: [] });
	}
	async componentWillMount() {
		console.log('props called', this.props.username);
		// await AsyncStorage.removeItem('userName');
		const auth = await AsyncStorage.getItem('userName');
		console.log('the auth', auth);
		if (this.props.username) {
			console.log('props called', this.props.username);
			this.setState({ username: this.props.username, auth: true }, () => console.log(this.state));
		}
		if (auth !== null) {
			console.log('auth called', auth);
			this.setState({ auth: true, username: auth });
		} else {
			this.props.navigator.resetTo({
				screen: 'qless.AuthScreen',
				title: 'Add your username'
			});
		}
	}
	componentWillReceiveProps(nextProps) {

		if (nextProps.placeInfo.data) {
			this.setState({ placeInfoArray: nextProps.placeInfo.data });
		}
	}
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
	_goToCrowd() {
		const feedback = this.state.placeInfoArray;
		this.props.navigator.showModal({
			screen: 'qless.GetDataStored',
			title: 'Data from Crowd',
			passProps: {
				feedback
			}
		});
	}
	_renderFabComponent() {
		if (this.props.selectedLatLong.latitude) {
			return (
				<FabComponent 
					onPressAction={() => this._goToRequestPage()}
					placeInfo={this.state.placeInfoArray}
					onCrowd={() => this._goToCrowd()}
				/>
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
			console.log('la state', this.state);
			const auth = AsyncStorage.getItem('userName');
		console.log('the auth', auth);
			if (this.state.auth) {
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
		} else {
			return null;
		}
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
		currentUser: state.shared.currentUser || {},
		placeInfo: state.seeker.placeFeedBack ? state.seeker.placeFeedBack : []
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(mapActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
