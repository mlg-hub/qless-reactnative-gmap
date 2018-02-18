import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#4463af',
		alignItems: 'center',
		// justifyContent: 'center',	
		paddingTop: 40	
	},
	textHeader: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#bbc8e8'
	},
	textOptions: {
		color: '#dbe5ff',
		marginBottom: 20,
		width: 250,
		textAlign: 'center',
		fontSize: 20
	},
	optionsView: {
		borderColor: '#bbc8e8',
		borderBottomWidth: 0.5,
		paddingTop: 10
	}
});

export default styles;
