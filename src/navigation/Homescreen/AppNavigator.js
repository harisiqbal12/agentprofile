import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeNavigation from './HomeNavigation';
import AgentDetails from '../../components/AgentDetails';
import ListingProperties from '../../components/ListingProperties';

const App = createStackNavigator();

function AppNavigation(props) {
  console.log(props)

	return (
		<App.Navigator
			screenOptions={{
				headerShown: false,
			}}>

        <App.Screen name='App' component={HomeNavigation}  />
        <App.Screen name='AgentDetails' component={AgentDetails} />
        <App.Screen name='ListingProperties' component={ListingProperties} />
      </App.Navigator>
	);
}

export default AppNavigation;