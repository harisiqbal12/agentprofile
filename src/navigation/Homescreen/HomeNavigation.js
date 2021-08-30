import React, { useEffect, useState } from 'react';
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
import Properties from '../../components/Properties';

const Tab = createMaterialBottomTabNavigator();

function HomeNavigation({ fetchUser, fetchAgents, fetchCurrentAgent }) {
	useEffect(() => {
		let cancel = false;

		if (cancel) return;
		fetchUser();
		fetchAgents();
		fetchCurrentAgent();

		return () => {
			cancel = true;
		};
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
				component={Properties}
				name='Properties'
				options={{
					tabBarLabel: 'Properties',
					tabBarIcon: ({ color }) => (
						<Icon
							style={{ height: 26, width: 26 }}
							fill={color}
							name='pie-chart'
						/>
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
