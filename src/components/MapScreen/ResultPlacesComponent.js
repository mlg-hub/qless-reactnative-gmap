import React, { Component } from 'react';
import { 
	View, 
	StyleSheet, 
	Dimensions,
	FlatList
	} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';

const width = Dimensions.get('window').width;

const ResultPlacesComponent = ({
	placesResults,
 	getPlaceLocation, 
	storeSelectedPlaceName 
	}) => {

	function handlePlaceLocation(place_id, place_name){
		// dispatch an action to handle the placeID
		getPlaceLocation(place_id);
		storeSelectedPlaceName(place_name)
	}
	return (
		<View style={styles.resultList}>
			<List>
			<FlatList
				keyExtractor = {(item, index) => item.placeID}
				data={placesResults}
				renderItem={
					({item, index}) => {
						return (
							<ListItem 
							onPress={()=> handlePlaceLocation(item.placeID, item.primaryText)}
							title={item.primaryText} 
							leftIcon={{name: 'search'}} 
							subtitle={item.primaryText}
							keyExtractor={(item, index) => item.placeID}
							/>
						)
					}
				}
			/>
			</List>
		</View>
	)
}

const styles = StyleSheet.create({
	resultList: {
		position: 'absolute',
		top: 75,
		flex:1,
		width:width,
		backgroundColor: '#fff'
	},
	displayResults: {
		height:60,
		width: 200
	}
})


export default ResultPlacesComponent;