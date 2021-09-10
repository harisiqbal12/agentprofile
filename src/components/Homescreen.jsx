import React, { useState, useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet, StatusBar, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
	fetchAgentProperty,
	fetchAgents,
	fetchFavAgents,
	// fetchFaveAgents,
} from '../redux/actions';
import HomescreenCard from './HomescreenCard';
import Loader from './Loader';

function Homescreen(props) {
	const [loading, setLoading] = useState(true);
	const { currentAgent } = props;
	const [isRefreshing, setIsRefreshing] = useState(false);

	useEffect(() => {
		let cancel = false;

		if (cancel) return;
		if (currentAgent.length > 0) {
			currentAgent.forEach((agent, index) => {
				props.fetchAgentProperty(agent.id);
			});

			setLoading(false);
		}

		return () => {
			cancel = true;
		};
	}, [currentAgent]);

	const handleRefresh = () => {
		setIsRefreshing(true);
		props.fetchAgents();
		props.fetchFavAgents();
		setTimeout(() => {
			setIsRefreshing(false);
			currentAgent.forEach((agent, index) => {
				props.fetchAgentProperty(agent.id);
			});
		}, 1000);
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<SafeAreaView style={styles.homeContainer}>
			<Layout style={styles.titleContainer}>
				<Text style={styles.headerTitle}>Agent Profiles</Text>
			</Layout>
			<FlatList
				refreshing={isRefreshing}
				onRefresh={handleRefresh}
				contentContainerStyle={{ padding: 16 }}
				data={currentAgent}
				renderItem={({ item }) => {
					return (
						// <TouchableOpacity onPress={() => handleAgentDetailsNavigation(item)}>
						<HomescreenCard
							navigation={props.navigation}
							agentProperty={props.agentProperty}
							item={item}
							// agentsFaveIds={fetchFaveAgents}
						/>
						// </TouchableOpacity>
					);
				}}
				keyExtractor={item => item.id}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	titleContainer: {
		backgroundColor: 'transparent',
		alignItems: 'center',
		flex: 0.1,
		justifyContent: 'center',
		marginBottom: 30,
		marginTop: 25,
	},
	headerTitle: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#8F9BB3',
		fontFamily: 'Roboto_400Regular',
	},
	flatList: {
		backgroundColor: 'transparent',
	},
});

const mapStateToProps = state => ({
	currentAgent: state.agentState.agents,
	agentProperty: state.propertyState.agentProperty,
	// favAgents: state.agentState.agentsFave,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{ fetchAgentProperty, fetchAgents, fetchFavAgents },
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);
