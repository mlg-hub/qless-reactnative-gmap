import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';

class AuthScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: ""
		};
	}

	hanldleText(text){
		this.setState({ username: text });
	}
	async saveUsername(){

		const $this = this;
		await AsyncStorage.setItem('userName', this.state.username, () => {
			$this.props.navigator.resetTo({
				screen: 'qless.MapScreen',
				title: 'Seeker',
				leftButtons: [
					{
						id: 'sideMenu'
					}
				]
			});
		});
	}

	render() {
		return (
			<View style={styles.container}>

				<Text 
					style={{
						color: '#93b8f2',
						fontSize: 24,
						alignSelf: 'center',
						marginBottom: 70
					}}
				> Enter your username </Text>
				<View 
					style={{
						borderRadius: 40,
						height: 50,
						backgroundColor: '#718dba',
						marginHorizontal: 20,
						marginBottom: 50
					}}
				>
					<TextInput
						underlineColorAndroid={'transparent'}
						placeholder="Your username..."
						onChangeText={(text) => this.hanldleText(text)}
						value={this.state.username}
						style={{
							color: '#fff',
							paddingLeft: 25,
							fontSize: 20
						}}
					/>
				</View>
				<Button 
					onPress={() => this.saveUsername()}
					disabled={this.state.username === ""}
					disabledStyle={{
						backgroundColor: '#6e7f9b'
					}}
					title="Save and proceed"
					textStyle={{
						color: '#93b8f2'
					}}
					buttonStyle={{
						borderRadius: 40,
						width: 150,
						backgroundColor: '#082a60',
						borderWidth: 1,
						borderColor: '#718dba'
					}}
					containerViewStyle={{
						alignSelf: 'center'
					}}
				/>
			</View>
		);
	}
}

AuthScreen.navigatorStyle = {
	navBarHidden: true
	// statusBarColor: 'rgba(0,0,0,0.3)',
	// statusBarTextColorScheme: 'light',
	// navigationBarColor: 'black',
	// navBarBackgroundColor: '#0a0a0a',
	// navBarTextColor: 'white',
	// navBarButtonColor: 'white'
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2c5393',
		paddingTop: 50
	}
});

export default AuthScreen;
