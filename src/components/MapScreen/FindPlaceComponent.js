import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;

class FindPlaceComponent extends Component {
	constructor(props){
		super(props);
		this.state = {
			inputValue:"",
			typing: false
		}
		
	}

	// shouldComponentUpdate(nextProps, nextState){
	// 	console.log(this.props.selectedPlaceName)
	// 	console.log(nextProps, nextState);
	// 	return true;
	// }

	componentWillReceiveProps(nextProps){
		console.log(this.props.selectedPlaceName, nextProps.selectedPlaceName);
		if(this.props.selectedPlaceName !== nextProps.selectedPlaceName){
			this.setState({ inputValue: nextProps.selectedPlaceName})
		}
	}
	_typingOn(){
		return {
			backgroundColor: this.state.typing ? '#fff' : 'transparent'
		}
	}

	_handleTextInput(text) {
		this.setState({inputValue: text});
		this.props.getGooglePlaces(text);
	}

	render() {
		const backgroundColor = this._typingOn();
		const stylesIN = {
			position: 'absolute',
			top:20,	
			justifyContent: 'center',
			alignContent:'center',
			width: width,
			backgroundColor: backgroundColor.backgroundColor,
			// backgroundColor: FindPlaceComponent._typingOn(),
			height: 55,
			marginBottom:50,
			paddingLeft:2,
			paddingRight:2
		}
		return (
			<View style={{...stylesIN}}>
				<Icon style={styles.icon} name="map-marker" size={25} />
				<TextInput 
				underlineColorAndroid='transparent'
				value={this.state.inputValue} 
				placeholder="Find a place..." 
				onFocus={() => this.setState({ typing: true})}
				onBlur={() => this.setState({ typing: false})}
				style={styles.input}
				onChangeText={(text) => this._handleTextInput(text)}
				/>
			</View>
		)
}
}

const styles = StyleSheet.create({
	searchBox: {
		position: 'absolute',
		top:20,	
		justifyContent: 'center',
		alignContent:'center',
		width: width,
		height: 55,
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
	},
	icon: {
		position: 'absolute',
		color: '#aa2525',
		left: 18
	}
})


export default FindPlaceComponent;