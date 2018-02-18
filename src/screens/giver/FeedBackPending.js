import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import { List, ListItem } from 'react-native-elements';
import styles from '../../styles/screens/FeedBackPending';


class FeedBackPending extends Component {

	_submitFeedBack(feedBack) {
		// send to the server
		console.log(feedBack);
		this.props.navigator.dismissModal(); 
	}

	render() {
		return (
			<View style={styles.container}>
					 <Text style={styles.textHeader}>What is the current situation ? </Text>
					 <View style={{ marginTop: 40 }}>
					 	<View style={styles.optionsView}>
							<Text onPress={() => this._submitFeedBack('idle')} style={styles.textOptions}> Idle</Text>
						</View>
						<View style={styles.optionsView}>
							<Text 
							style={styles.textOptions}
							onPress={() => this._submitFeedBack('Not very busy')}
							> Not very busy</Text>
						</View>
						<View style={styles.optionsView}>
							<Text 
							style={styles.textOptions}
							onPress={() => this._submitFeedBack('Busy')}
							> Busy </Text>
						</View>
						<View style={styles.optionsView}>
							<Text 
								style={styles.textOptions}
								onPress={() => this._submitFeedBack('Very busy')}
							> Very busy</Text>
						</View>
					</View>
			</View>
		);
	}
}

export default FeedBackPending;
