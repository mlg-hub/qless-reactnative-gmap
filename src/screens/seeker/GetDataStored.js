import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import moment from 'moment';

class GetDataStored extends Component {

	constructor(props) {
		super(props);
		this.state = {
			feedback: []
		};
	}

	componentWillReceiveProps(nextProps) {
		console.log('this is the next props', nextProps);
		if (nextProps.feedback) {
			this.setState({ feedback: nextProps.feedback });
		}
	}

	renderLists() {
		if (this.props.feedback.length === 0) {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue'}}>
					<ActivityIndicator size="large" color="#ccc" />
				</View>
			);
		}

		return (
			<View style={{ flex: 1, backgroundColor: 'black'}}>
				<List>
					<FlatList
						
						data={this.props.feedback}
						keyExtractor={(item) => item._id}
						renderItem={
							({ item }) => {
								return (
									<ListItem
									title={item.activity} 
									subtitle={moment(item.submitDate).fromNow()}
									// keyExtractor={() => `${item.placeID}${index}`}
									/>
								);
							}
						}
					/>
				</List>
			</View>
		);
	}

	render() {
		return this.renderLists();
	}	
}

export default GetDataStored;
