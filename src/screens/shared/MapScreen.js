import React, { Component } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as mapActions from '../../redux/actions/mapAction';
import MapComponent from '../../components/MapScreen/MapComponent';
import FindPlaceComponent from '../../components/MapScreen/FindPlaceComponent';
import ResultPlacesComponent from '../../components/MapScreen/ResultPlacesComponent';
import FabComponent from '../../components/MapScreen/FabComponent';
import { Text } from 'react-native-elements';

class MapScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			// isSeeker: true,
			// isGiver: false,
			currentUser: 'Seeker'
		};
	}

	componentWillMount() {
		this.props.actions.isUser('Seeker');
	}
	componentWillReceiveProps(nextProps) {
		console.log('mapscreen', nextProps);

		if (this.state.currentUser !== nextProps.currentUser) {
			this.setState({ currentUser: nextProps.currentUser });
		}

		/*if (!this.state.isGiver) {
			if (nextProps.isGiverOn) {
				this.setState({ isSeeker: false, isGiver: true });
			}
		}
		if (!this.state.isSeeker) {
			if (nextProps.isSeekerOn) {
				this.setState({ isGiver: false, isSeeker: true });
			}
		}*/
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

	_renderSeekerView() {
		const { 
			actions: { storeUserPosition },
			selectedLatLong
			} = this.props;
		return (
			<View style={{ flex: 1}}>
				<MapComponent
					user={this.state.currentUser} 
					storeUserPosition={storeUserPosition}
					selectedLatLong={selectedLatLong}
				/>
				{this._renderFindPlaceComponent()}
				{this._renderResultPlaceComponent()}
				{this._renderFabComponent()}
			</View>
		);
	}
	_renderGiverView() {
		const { actions: { storeUserPosition } } = this.props;
		return (
			<View style={{ flex: 1 }}>
				<MapComponent
					user={this.state.currentUser}
					storeUserPosition={storeUserPosition}
				/>
				<Text style={{ position: 'absolute', top: 70 }}> Morisho is not you!!</Text>
			</View>
		);
	}

	_renderViews() {
		if (this.state.currentUser === 'Seeker') {
			return this._renderSeekerView();
		}
		return this._renderGiverView();
	}

	render() {
		return this._renderViews();
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

function mapStateToProps(state){
	const { places, selectedPlaceName } = state.seeker;
	return {
		places: places || [],
		selectedLatLong: state.seeker.selectedPlace ? state.seeker.selectedPlace : {},
		selectedPlaceName,
		userPosition: state.shared.userPosition,
		currentUser: state.shared.currentUser
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(mapActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
