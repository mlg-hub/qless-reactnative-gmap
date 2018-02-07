import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;

const FindPlaceComponent = () => {

	return (
		<View style={styles.searchBox}>
			<Icon style={styles.icon} name="map-marker" size={25} />
			<TextInput 
			underlineColorAndroid='transparent'
			value="" 
			placeholder="find a place ..." 
			style={styles.input}/>
		</View>
	)
}

const styles = StyleSheet.create({
	searchBox: {
		position: 'absolute',
		top:20,	
		justifyContent: 'center',
		alignContent:'center',
		width: width,
		backgroundColor: '#fff',
		height: 55,
		marginBottom:50,
		paddingLeft:2,
		paddingRight:2
		
	},
	input: {
		backgroundColor: 'red',
		fontSize: 20,
		paddingLeft:50,
		color: '#fff',
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: 40,
		// flexWrap: 'wrap'
	},
	icon: {
		position: 'absolute',
		color: '#aa2525',
		left: 18
	}
})


export default FindPlaceComponent;