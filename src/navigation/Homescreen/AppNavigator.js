import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigation from './HomeNavigation';
import AgentDetails from '../../components/AgentDetails';
import ListingProperties from '../../components/ListingProperties';
import Profile from '../../components/Profile';
import AgentProfile from '../../components/agentProfile';
import CreateProperties from '../../components/CreateProperties';
import Property from '../../components/Property';
import MyListing from '../../components/MyListing';
import UpdateUserProperty from '../../components/UpdateUserProperty';
import Contact from '../../components/Contact';
import About from '../../components/About';
import FavScreen from '../../components/FavScreen';
import FavPropertyScreen from '../../components/FavPropertyScreen';
import FeatureListAdmin from '../../components/FeatureListAdmin';

const App = createStackNavigator();

function AppNavigation() {
	return (
		<App.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<App.Screen name='App' component={HomeNavigation} />
			<App.Screen name='AgentDetails' component={AgentDetails} />
			<App.Screen name='ListingProperties' component={ListingProperties} />
			<App.Screen name='Profile' component={Profile} />
			<App.Screen name='AgentProfile' component={AgentProfile} />
			<App.Screen name='CreateProperties' component={CreateProperties} />
			<App.Screen name='Property' component={Property} />
			<App.Screen name='MyProperties' component={MyListing} />
			<App.Screen name='UpdateUserProperty' component={UpdateUserProperty} />
			<App.Screen name='About' component={About} />
			<App.Screen name='Contact' component={Contact} />
			<App.Screen name='FavScreen' component={FavScreen} />
			<App.Screen name='FavPropertyScreen' component={FavPropertyScreen} />
			<App.Screen name='FeatureListAdmin' component={FeatureListAdmin} />
		</App.Navigator>
	);
}

export default AppNavigation;
