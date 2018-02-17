import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const width = Dimensions.get('window').width;

class FindPlaceComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: "",
			typing: false
		};
	}

	// shouldComponentUpdate(nextProps, nextState){
	// 	console.log(this.props.selectedPlaceName)
	// 	console.log(nextProps, nextState);
	// 	return true;
	// }

	componentWillReceiveProps(nextProps) {
		console.log(this.props.selectedPlaceName, nextProps.selectedPlaceName);
		if (this.props.selectedPlaceName !== nextProps.selectedPlaceName) {
			this.setState({ inputValue: nextProps.selectedPlaceName }, () => console.log('hery morisho'));
		}
	}
	_typingOn() {
		return {
			backgroundColor: this.state.typing ? '#fff' : 'transparent'
		};
	}

	_handleTextInput(text) {
		this.setState({ inputValue: text });
		this.props.getGooglePlaces(text);
	}

	render() {
		const backgroundColor = this._typingOn();
		const stylesIN = {
			position: 'absolute',
			top: 5,	
			flex: 1,
			// flexDirection: 'row',
			justifyContent: 'center',
			alignContent: 'center',
			width,
			backgroundColor: backgroundColor.backgroundColor,
			// backgroundColor: FindPlaceComponent._typingOn(),
			height: 55,
			marginBottom: 50,
			paddingLeft: 2,
			paddingRight: 2,
			zIndex: 1000
		};

		return (
			<View style={{ ...stylesIN }}>
				<Icon style={styles.iconLeft} name="location-on" size={20} />
				<TextInput 
				underlineColorAndroid='transparent'
				value={this.state.inputValue} 
				placeholder="Find a place..." 
				onFocus={() => this.setState({ typing: true})}
				onBlur={() => this.setState({ typing: false})}
				style={styles.input}
				onChangeText={(text) => this._handleTextInput(text)}
				/>
				{/* <Icon style={styles.icon} name="menu" size={25} onPress={() => this.props.toggleDrawer()} /> */}
			</View>
		)
}
}

const styles = StyleSheet.create({
	searchBox: {
		position: 'absolute',
		top: 20,	
		justifyContent: 'center',
		alignContent: 'center',
		width,
		height: 55,
		paddingLeft: 2,
		paddingRight: 2
		
	},
	input: {
		fontSize: 20,
		paddingLeft: 30,
		color: '#fff',
		backgroundColor: 'rgba(0,0,0,0.4)',
		borderRadius: 40,
		// width: width - 50,
		// marginLeft: 45
	},
	icon: {
		position: 'absolute',
		color: 'black',
		left: 10
	},
	iconLeft: {
		position: 'absolute',
		color: 'red',
		right: 10
	}
});

export default FindPlaceComponent;
