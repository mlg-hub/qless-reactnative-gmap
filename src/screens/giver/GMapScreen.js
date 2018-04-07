import React, { Component } from 'react';
import { View, Text, ToastAndroid } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GMapComponent from '../../components/Giver/GMapComponent';
import * as reqActions from '../../redux/actions/requestActions';

class GMapScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userPosition: {},
			requests: [],
			requestID: '',
			success: false
		};
	}

	componentWillMount() {
		console.log('component will mount from gmapScreen');
		this.props.actions.fetchAllRequest();
		// if (req_results.length >= 1) {
		// 	console.log('the requests from gmapScree', req_results);
		// 	this.setState({ requests: req_results });
		// }
	}

	componentWillReceiveProps(nextProps) {
		
		console.log('will receive props gmapscreen', nextProps);
		if (nextProps.requests) {
			this.setState({ requests: nextProps.requests });
		}
		if (nextProps.requestID) {
			if (this.state.requestID === nextProps.requestID) {
				this.setState({ success: true }, () => {
					console.log('after the props received', this.state);
					ToastAndroid.showWithGravity(
						'Activity successfully sent',
						 ToastAndroid.SHORT,
						 ToastAndroid.CENTER
						 );
				});
			} 
		}

		this.setState({ userPosition: nextProps.userPosition });
	}

	_iamOnIt(requestID){
		const API_CALL = 'https://arcane-mesa-47319.herokuapp.com/api/';
		fetch(`${API_CALL}givings/confirm/${requestID}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				}
		}).then((resp) => console.log('you are in!!', resp.json()));
	}

	_handleTheRequest(requestID) {

		this._iamOnIt(requestID);
		this.setState({ requestID });
		this.props.navigator.showModal({
			screen: 'qless.FeedBackPending',
			title: 'Mlg is waiting...',
			passProps: {
				requestID
			}
		});
		console.log('this is the state from gmapsc', this.state);
		this.props.actions.fetchAllRequest();
	}

	_renderMap() {
		return (
			<View style={{ flex: 1 }}>
				<GMapComponent 
					requests={this.state.requests}
					userPosition={this.state.userPosition} 
					handleTheRequest={(requestID) => this._handleTheRequest(requestID)}
				/>
			</View>
		);
	}

	render() {
		return this._renderMap();
	}
} 

function mapStateToProps(state) {
	return {
		userPosition: state.shared.userPosition,
		requests: state.giver.requests ? state.giver.requests.data : [],
		requestID: state.seeker.receivedInfos ? state.seeker.receivedInfos.requestID : ''
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(reqActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GMapScreen);
