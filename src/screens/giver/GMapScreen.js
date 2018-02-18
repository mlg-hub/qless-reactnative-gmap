import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GMapComponent from '../../components/Giver/GMapComponent';

class GMapScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			userPosition: {}
		};
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
	     this.setState({ userPosition: nextProps.userPosition });
	}

	_handleTheRequest() {
		console.log('pressed');
		console.log(this.props);
		this.props.navigator.showModal({
			screen: 'qless.FeedBackPending',
			title: 'Mlg is waiting...',
		});
	}

	_renderMap() {
		return (
			<View style={{ flex: 1 }}>
				<GMapComponent 
					userPosition={this.state.userPosition} 
					handleTheRequest={() => this._handleTheRequest()}
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
		userPosition: state.shared.userPosition
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GMapScreen);
