import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Landing from '../../components/Landing';
import Register from '../../components/Register';
import Login from '../../components/Login';
import Instructions from '../../components/Instructions';
import ResetPassword from '../../components/ResetPassword';
import Success from '../../components/Success';

const Stack = createStackNavigator();

function LandingNavigation() {
	return (
		<Stack.Navigator initialRouteName='Instructions'>
			<Stack.Screen
				name='Instructions'
				component={Instructions}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Landing'
				component={Landing}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='ResetPassword'
				component={ResetPassword}
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
			<Stack.Screen
				name='Succcess'
				component={Success}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}

export default LandingNavigation;
