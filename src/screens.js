/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';
import AuthScreen from './screens/shared/AuthScreen';
import MapScreen from './screens/shared/MapScreen';
import Drawer from './screens/shared/Drawer';
import RequestPending from './screens/seeker/RequestPending';
import GMapScreen from './screens/giver/GMapScreen';
import FeedBackPending from './screens/giver/FeedBackPending';


export function registerScreens(store, Provider) {
	Navigation.registerComponent('qless.MapScreen', () => MapScreen, store, Provider);
	Navigation.registerComponent('qless.AuthScreen', () => AuthScreen, store, Provider);
	Navigation.registerComponent('qless.RequestPending', () => RequestPending, store, Provider);
	Navigation.registerComponent('qless.GMapScreen', () => GMapScreen, store, Provider);
	Navigation.registerComponent('qless.FeedBackPending', () => FeedBackPending, store, Provider);
	Navigation.registerComponent('qless.Drawer', () => Drawer, store, Provider);
	
	// Navigation.registerComponent('movieapp.Drawer', () => Drawer);
}
