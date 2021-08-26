import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from '@ui-kitten/components';

import {
	fetchUser,
	fetchAgents,
	fetchCurrentAgent,
} from '../../redux/actions/index';
import Homescreen from '../../components/Homescreen';
import Agents from '../../components/Agents';
import Settings from '../../components/Settings';

const Tab = createMaterialBottomTabNavigator();

function HomeNavigation({ fetchUser, fetchAgents, fetchCurrentAgent }) {
	useEffect(() => {
		fetchUser();
		fetchAgents();
		fetchCurrentAgent();
		console.log('fetch agents');
	}, []);

	return (
		<Tab.Navigator
			labeled={true}
			activeColor={'#FF8E33'}
			barStyle={{ backgroundColor: '#fff' }}
			initialRouteName='home'>
			<Tab.Screen
				component={Homescreen}
				name='Home'
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color }) => (
						<Icon style={{ height: 26, width: 26 }} fill={color} name='home' />
					),
				}}
			/>
			<Tab.Screen
				component={Agents}
				name='Agents'
				options={{
					tabBarLabel: 'Agents',
					tabBarIcon: ({ color }) => (
						<Icon style={{ height: 26, width: 26 }} fill={color} name='people' />
					),
				}}
			/>
			<Tab.Screen
				component={Settings}
				name='Settings'
				options={{
					tabBarLabel: 'Settings',
					tabBarIcon: ({ color }) => (
						<Icon
							style={{ height: 26, width: 26 }}
							fill={color}
							name='settings'
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}

const mapDispatchtoProps = dispatch =>
	bindActionCreators({ fetchUser, fetchAgents, fetchCurrentAgent }, dispatch);

export default connect(null, mapDispatchtoProps)(HomeNavigation);
