import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../styles/screens/Drawer';
import { isUser } from '../../redux/actions/mapAction';

class Drawer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			currentUser: 'Seeker'
		};
	}

	componentWillMount() {
		this.props.isUser(this.state.currentUser);
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.currentUser !== nextProps.currentUser) {
			this.setState({ currentUser: nextProps.currentUser });
		}
	}

	_toggleDrawer() {
		this.props.navigator.toggleDrawer({
			to: 'closed',
			side: 'left',
			animated: true
		});
	}

	_resetTo(title) {
		this.props.navigator.resetTo({
			screen: 'qless.MapScreen',
			title,
			leftButtons: [
				{
					id: 'sideMenu'
				}
			],
			animationType: 'slide-horizontal',
		});
	}

	_openPage(user) {
		// const $this = this;
		console.log('open page', user);

		this.props.isUser(user);
		this._toggleDrawer();
		this._resetTo(user);
		// setTimeout(() => {
		// 	$this._toggleDrawer();
		// 	$this._resetTo(user);
		// }, 800);
	}
	render() {
		const iconGiver = (<Icon name="card-giftcard" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 2 }]} />);
		const iconSeeker = (<Icon name="search" size={26} color="#9F9F9F" style={[styles.drawerListIcon, { paddingLeft: 3 }]} />);
		const iconLogout = (<Icon name="exit-to-app" size={26} color="#9F9F9F" style={styles.drawerListIcon} />);
		
		return (
			<LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0,0,0, 0.9)', 'rgba(0,0,0, 1)']} style={styles.linearGradient}>
				<View style={styles.container}>
					<View style={styles.drawerList}>
						<TouchableOpacity 
							onPress={() => this._openPage('Giver')} 
							disabled={this.state.currentUser === 'Giver'}
						>
							<View style={styles.drawerListItem}>
								{iconGiver}
								<Text style={styles.drawerListItemText}>
									Givings
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity 
							onPress={() => this._openPage('Seeker')} 
							disabled={this.state.currentUser === 'Seeker'}
						>
							<View style={styles.drawerListItem}>
								{iconSeeker}
								<Text style={styles.drawerListItemText}>
									Seeking
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

function mapStateToProps(state) {

	return {
		currentUser: state.shared.currentUser || {}
	};
}

function mapDispatchToProps(dispatch) {
	return {
		isUser: bindActionCreators(isUser, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
