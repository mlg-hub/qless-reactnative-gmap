import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';

const FabComponent = ({onPressAction}) => {
	return (
		<View >
			<Button 
				buttonStyle={styles.fabContainer}
				textStyle={styles.btnText}
				onPress={onPressAction} 
				containerStyle={styles.container}
				title="Get Info"
			/>	
			</View>
	);

}

const styles = StyleSheet.create({
		fabContainer: {
			alignItems: 'center',
			justifyContent: 'center',
			position: 'absolute',
			backgroundColor: '#056eaa',		
			borderColor: "#02a2ff",
			borderWidth: 1,
			height:40,
			width:120,
			borderRadius: 40,
			bottom: 50,
			right: 20,
		},
		btnText: {
			//  fontWeight: "700"
			color: '#c7dce8'
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