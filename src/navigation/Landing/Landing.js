import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../../components/Landing';
import Register from '../../components/Register';
import Login from '../../components/Login';

const Stack = createStackNavigator();

function LandingNavigation() {
	return (
		<Stack.Navigator initialRouteName='Landing'>
			<Stack.Screen
				name='Landing'
				component={Landing}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Register'
				component={Register}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Login'
				component={Login}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

export default LandingNavigation;
