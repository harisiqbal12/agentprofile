import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet, StatusBar, FlatList } from 'react-native';
import { connect } from 'react-redux';
import AgentCard from './AgentCard';

function Agents(props) {
	const { currentAgent } = props;
	console.log(StatusBar.currentHeight);

	return (
		<SafeAreaView style={styles.agentContainer}>
			<FlatList
				data={currentAgent}
				renderItem={({ item }) => {
					return <AgentCard item={item} />;
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	agentContainer: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
});

const mapStateToProps = store => ({
	currentAgent: store.agentState.agents,
});

export default connect(mapStateToProps)(Agents);
