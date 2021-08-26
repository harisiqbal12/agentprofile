import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigation from './HomeNavigation';
import AgentDetails from '../../components/AgentDetails';
import ListingProperties from '../../components/ListingProperties';
import Profile from '../../components/Profile';
import AgentProfile from '../../components/agentProfile';

const App = createStackNavigator();

function AppNavigation(props) {
  console.log(props)

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
		</App.Navigator>
	);
}

export default AppNavigation;