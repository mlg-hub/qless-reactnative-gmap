/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';
import AuthScreen from './screens/shared/AuthScreen';
import MapScreen from './screens/seeker/MapScreen';

export function registerScreens(store, Provider) {
	Navigation.registerComponent('qless.MapScreen', () => MapScreen, store, Provider);
	Navigation.registerComponent('qless.AuthScreen', () => AuthScreen, store, Provider);
	// Navigation.registerComponent('movieapp.MoviesList', () => MoviesList, store, Provider);
	// Navigation.registerComponent('movieapp.Search', () => Search, store, Provider);
	// Navigation.registerComponent('movieapp.Drawer', () => Drawer);
}
