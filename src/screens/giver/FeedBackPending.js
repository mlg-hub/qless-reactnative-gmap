import React, { Component } from 'react';
import { View, Text, Alert} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { List, ListItem } from 'react-native-elements';
import styles from '../../styles/screens/FeedBackPending';
import { checkCanSubmit } from '../../redux/actions/requestActions';
import { storeUserPosition } from '../../redux/actions/mapAction';


class FeedBackPending extends Component {

	componentWillMount() {
		navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					this.props.storeUserPosition({ latitude, longitude });
				},
				(error) => console.log(error.message),
				{ enableHighAccuracy: true, timeout: 50000, maximumAge: 2000 }
			);
	}

	async _submit(feedBack) {
		const API_CALL = 'https://arcane-mesa-47319.herokuapp.com/api/';
		const activity = {
			info: feedBack,
			requestID: this.props.requestID
		};
		// this.submitResponse(activity);
		const feedback = {
			data: {
				requestID: activity.requestID,
				activity: activity.info,
				submitDate: Date.now()
			}
		};
		const distance = await this.props.checkCanSubmit();
		console.log(distance);
		if (distance > 0.5) {
			console.log('you are not close enough to the destination');
			Alert.alert(
			'Sorry!', 
			'You are not close enough yet to the destination location',
			[
				{ text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
			]);
			return;
		}
			fetch(`${API_CALL}/givings/feedback`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(feedback)
			}).then((resp) => resp.json()).then(data => console.log(data));
			
			this.props.navigator.dismissModal(); 		
	}

	render() {
		return (
			<View style={styles.container}>
					 <Text style={styles.textHeader}>What is the current situation ? </Text>
					 <View style={{ marginTop: 40 }}>
					 	<View style={styles.optionsView}>
							<Text onPress={() => this._submit('idle')} style={styles.textOptions}> Idle</Text>
						</View>
						<View style={styles.optionsView}>
							<Text 
							style={styles.textOptions}
							onPress={() => this._submit('Not very busy')}
							> Not very busy</Text>
						</View>
						<View style={styles.optionsView}>
							<Text 
							style={styles.textOptions}
							onPress={() => this._submit('Busy')}
							> Busy </Text>
						</View>
						<View style={styles.optionsView}>
							<Text 
								style={styles.textOptions}
								onPress={() => this._submit('Very busy')}
							> Very busy</Text>
						</View>
					</View>
			</View>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		checkCanSubmit: bindActionCreators(checkCanSubmit, dispatch),
		storeUserPosition: bindActionCreators(storeUserPosition, dispatch)
	};
}

export default connect(null, mapDispatchToProps)(FeedBackPending);
