import React, { useState } from 'react';
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
import { bindActionCreators } from 'redux';
import { fetchAgents } from '../redux/actions';

function Agents(props) {
	const [isRefreshing, setIsRefreshing] = useState(false);
	const { currentAgent } = props;

	const handleListingPropertiessNavigaiton = item =>
		props.navigation.navigate('AgentDetails', {
			data: item,
		});

	const handelRefresh = () => {
		setIsRefreshing(true);
		console.log('agents refreshing');

		props.fetchAgents();

		setTimeout(() => {
			setIsRefreshing(false);
		}, 1000);
	};

	return (
		<SafeAreaView style={styles.agentContainer}>
			<Searchbar
				theme={{ colors: { primary: '#EA723D' } }}
				style={styles.searchBar}
				placeholder='search agent'
			/>
			<FlatList
				refreshing={isRefreshing}
				onRefresh={handelRefresh}
				contentContainerStyle={{
					padding: 16,
				}}
				style={styles.flatList}
				data={currentAgent}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() => handleListingPropertiessNavigaiton(item)}>
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

const mapDispatchToProps = dispatch =>
	bindActionCreators({ fetchAgents }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Agents);
