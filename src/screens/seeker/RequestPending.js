import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../../styles/screens/RequestPending';

class RequestPending extends Component {

	render() {
		return (
			<View style={styles.container}>
				<Text> YOUR REQUEST IS BEING {this.props.requestID} </Text>
			</View>
		);
	}
}

export default RequestPending;
