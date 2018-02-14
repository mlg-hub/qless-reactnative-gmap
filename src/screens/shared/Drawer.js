import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../styles/screens/Drawer';

class Drawer extends Component {

	_openGiver() {
		console.log('to giver');
	}

	_openSeeker() {
		console.log('to seeker');
	}

	render() {
		const iconGiver = (<Icon name="card-giftcard" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconSeeker = (<Icon name="search" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
		const iconLogout = (<Icon name="exit-to-app" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);
		
		return (
			<LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0,0,0, 0.9)', 'rgba(0,0,0, 1)']} style={styles.linearGradient}>
				<View style={styles.container}>
					<View style={styles.drawerList}>
						<TouchableOpacity onPress={() => this._openGiver()}>
							<View style={styles.drawerListItem}>
								{iconGiver}
								<Text style={styles.drawerListItemText}>
									Seeking
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this._openSeeker()}>
							<View style={styles.drawerListItem}>
								{iconSeeker}
								<Text style={styles.drawerListItemText}>
									Giving
								</Text>
							</View>
						</TouchableOpacity>
						<View style={styles.drawerListItem}>
							{iconLogout}
							<Text style={styles.drawerListItemText} onPress={() => null}>
								Logout
							</Text>
						</View>
					</View>
					<Text style={styles._version}>
						{/* 'v1.0.0' */}
					</Text>
				</View>
			</LinearGradient>
		)
	}
}

export default Drawer;
