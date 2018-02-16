import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'proptypes';
import { Button } from 'react-native-elements';
import Spinner from 'react-native-spinkit';
import * as requestActions from '../../redux/actions/requestActions';


import styles from '../../styles/screens/RequestPending';

class RequestPending extends Component {

	constructor(props){
		super(props);
		this.state = {
			confirmed: false,
			infosReceived: false
		};
	}

	componentWillReceiveProps(nextProps){
		const $this = this;
		const currentRequestId = this.props.requestID;
		if (currentRequestId === nextProps.requestConfID) {
			this.setState({ confirmed: true }, () => {
				$this.props.navigator.setTitle({
					title: 'Request Confirmed'
				});
			});	
		}
		if (nextProps.requestReponseInfo) {
			this.setState({ infosReceived: true }, () => {
				$this.props.navigator.setTitle({
					title: 'Reponse feedback'
				});
			});
		}
	}

	_renderSpinner() {
		if (!this.state.confirmed) {
			return (
				<View>
					<Spinner isVisible style={{ marginBottom: 40, marginTop: 30 }} size={150} type="Pulse" color="#94bcfc" />
					<Text style={styles.text}> ...Waiting for an assistance confirmation </Text>
				</View>
			);
		}
		return (
				<View>
					<Spinner isVisible style={{ marginBottom: 40, marginTop: 30 }} size={150} type="DoubleBounce" color="#94bcfc" />
					<Text> Request confirmed! </Text>
					<Text style={styles.text}> ...Waiting for activity reponse feedback! </Text>
				</View>
			);
	}
	_renderView() {
		const { placeName, activity } = this.props.requestRespInfo;
		if (!this.state.infosReceived) {
			this._renderSpinner();
		}
		return (
			<View>
				<Text>Place Name : {placeName}</Text>
				<Text>Assisted by: {this.props.assistantInfo.name} </Text>
				<Text>Activity: {activity}</Text>
			</View>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.subContainer}>
					{this._renderView()}
					<Button 
					title='Cancel request' 
					buttonStyle={styles.btnStyle}
					containerStyle={styles.btnContainer}
					onPress={() => this.props.navigator.dismissModal()}
					textStyle={{ color: '#fff' }}
					/>
				</View>
			</View>
		);
	}
}

RequestPending.propTypes = {
	navigator: PropTypes.object,
	requestID: PropTypes.string
};

function mapStateToProps(state) {
	const { requestConfirmation, requestReponseInfo } = state.giver || null;
	return {
		requestConfID: requestConfirmation.requestID || null,
		assistantInfo: requestConfirmation.assistantInfo || null,
		requestRespInfo: requestReponseInfo
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(requestActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestPending);
