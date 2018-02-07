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

const ResultPlacesComponent = () => {

	function displaResults(place){
		return (
			<View>

			</View>
		);
	}

	return (
		<View style={styles.resultList}>
			<FlatList
				data={[
					{title: 'Title Text', key: 'item1', icon:'search'},
					{title: 'Title Text', key: 'item1', icon:'search'},
					{title: 'Title Text', key: 'item1', icon:'search'}]}
				renderItem={({item}) => <ListItem title={item.title} leftIcon={{name: item.icon}} subtitle={item.title}/>}
			/>
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