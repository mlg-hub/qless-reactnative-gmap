import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as reqActions from '../../redux/actions/requestActions';

class RequestsList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			requests: [],
			requestInfo: 'No Feedback yet!'
		};
	}

	componentWillMount() {
		// hard coded username here
			this.props.actions.fetchAllMyRequests('MLGTHEUNO');
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.myRequests) {
			this.setState({ requests: nextProps.myRequests.data });
		}
		if (nextProps.requestInfo) {
				this.setState({ requestInfo: nextProps.requestInfo.data.activity });
		}
	}

	async displayInfo(id) {
		const $this = this;
		this.setState({ requestInfo: 'No FeedBack yet!'});
		await this.props.actions.getRequestInfo(id);
		console.log('this is my state', this.state);
		Alert.alert(
						'Activity Feedback',
						`${$this.state.requestInfo}`,
						[
							{ text: 'OK', onPress: () => console.log('Ok Pressed'), style: 'cancel' }
						] 
					);	
	}

	renderLists() {
		if (this.state.requests.length === 0) {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<ActivityIndicator size="large" color="#ccc" />
				</View>
			);
		}

		return (
			<View>
				<List>
					<FlatList
						
						data={this.state.requests}
						keyExtractor={(item, index) => `${item.placeID}${index}`}
						renderItem={
							({ item, index }) => {
								return (
									<ListItem
									disabled={item.status !== 'Received'}
									onPress={() => this.displayInfo(item._id)}
									title={item.name} 
									subtitle={item.status}
									// keyExtractor={() => `${item.placeID}${index}`}
									/>
								);
							}
						}
					/>
				</List>
			</View>
		);
	}

	render() {
		return this.renderLists();
	}	
}

function mapStateToProps(state) {
	return {
		requestReceived: state.seeker.receivedInfos ? state.seeker.receivedInfos : '',
		myRequests: state.seeker.myRequests ? state.seeker.myRequests : [],
		requestInfo: state.seeker.singleRequestInfo ? state.seeker.singleRequestInfo : false
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(reqActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestsList);
