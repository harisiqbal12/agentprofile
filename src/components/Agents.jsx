import React from 'react';
import { Searchbar } from 'react-native-paper';
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import AgentCard from './AgentCard';

function Agents(props) {
	const { currentAgent } = props;
	console.log(StatusBar.currentHeight);

	const handleListingPropertiessNavigaiton = () =>
		props.navigation.navigate('ListingProperties', {
			properties: 'haris',
		});

	return (
		<SafeAreaView style={styles.agentContainer}>
			<Searchbar
				theme={{ colors: { primary: '#EA723D' } }}
				style={styles.searchBar}
				placeholder='search agent'
			/>
			<FlatList
				contentContainerStyle={{
					padding: 16,
				}}
				style={styles.flatList}
				data={currentAgent}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity onPress={handleListingPropertiessNavigaiton}>
							<AgentCard item={item} />
						</TouchableOpacity>
					);
				}}
				keyExtractor={item => item.id}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	agentContainer: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	flatList: {
		flex: 1,
	},
	searchBar: {
		margin: 16,
	},
});

const mapStateToProps = store => ({
	currentAgent: store.agentState.agents,
});

export default connect(mapStateToProps)(Agents);
