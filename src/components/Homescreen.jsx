import React, { useState, useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';

import HomescreenCard from './HomescreenCard';
import Loader from './Loader';

function Homescreen(props) {
	const [loading, setLoading] = useState(true);
	const { currentAgent } = props;

	useEffect(() => {
		console.log('current agent: ' + currentAgent.length);
		if (currentAgent.length > 0) {
			console.log('truee');
			setLoading(false);
		}
	}, [currentAgent]);

	const handleAgentDetailsNavigation = data =>
		props.navigation.navigate('AgentDetails', {
			data,
		});

	if (loading) {
		return <Loader />;
	}

	return (
		<SafeAreaView style={styles.homeContainer}>
			<Layout style={styles.titleContainer}>
				<Text style={styles.headerTitle}>Agent Profiles</Text>
			</Layout>
			<FlatList
				contentContainerStyle={{ padding: 16 }}
				data={currentAgent}
				renderItem={({ item }) => {
					console.log('itemsss');
					console.log(item.email);
					return (
						<TouchableOpacity onPress={() => handleAgentDetailsNavigation(item)}>
							<HomescreenCard item={item} />
						</TouchableOpacity>
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

const mapStateToProps = store => ({
	currentAgent: store.agentState.agents,
});

export default connect(mapStateToProps)(Homescreen);
