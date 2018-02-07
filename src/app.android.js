import React from 'react'; // eslint-disable-line
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import { registerScreens } from './screens';
import configureStore from './redux/store/configureStore'

const store = configureStore();

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
	screen: {
		screen: 'qless.MapScreen',
		title: 'Map'
	}
});