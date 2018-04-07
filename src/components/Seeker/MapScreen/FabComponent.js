import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

class FabComponent extends Component {

	handleOnPress() {
		this.props.onPressAction();
	}
	gotoCrowd() {
		this.props.onCrowd();
	}
	renderCrowd() {
		console.log(this.props.placeInfo, 'this is the place info');
		if (this.props.placeInfo.length > 0) {
			return (
				<Button 
					buttonStyle={styles.btnStyle2}
					textStyle={styles.btnText}
					onPress={() => this.gotoCrowd()} 
					containerStyle={styles.container}
					title="Get From the crowd"
				/>
			);
		}
		return null;
	}

	render() {
		return (
		<View style={styles.fabContainer}>
				{this.renderCrowd()}
			<Button 
				buttonStyle={styles.btnStyle}
				textStyle={styles.btnText}
				onPress={() => this.handleOnPress()} 
				containerStyle={styles.container}
				title="Get Info"
			/>	
		</View>
	);
	}	
}
const styles = StyleSheet.create({
		fabContainer: {
			flex: 1,
			flexDirection: 'row',
			position: 'absolute',
			justifyContent: 'space-between',
			backgroundColor: 'transparent',
			padding: 0,	
			bottom: 50
		},
		btnStyle: {
			borderColor: '#02a2ff',
			backgroundColor: 'black',
			borderWidth: 1,
			height: 50,
			width: 120,
			borderRadius: 20
		},
		btnStyle2: {
			backgroundColor: 'black',
			borderColor: 'green',
			borderWidth: 1,
			height: 50,
			width: 150,
			borderRadius: 20
		},
		btnText: {
			//  fontWeight: "700"
			color: '#fff'
		},
		container: {
			shadowColor: "red",
			shadowOpacity: 0.8,
			shadowRadius: 2,
			shadowOffset: {
				height: 1,
				width: 0
			}
		}
});

export default FabComponent;
