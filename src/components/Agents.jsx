import React, { useEffect, useState } from 'react';
import { Searchbar, Button } from 'react-native-paper';
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import find from 'array-find';

import { fetchAgents } from '../redux/actions';
import AgentCard from './AgentCard';
import Loader from './Loader';

import { default as theme } from '../theme/custom-theme.json';

function Agents(props) {
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [searchData, setSearchData] = useState(null);
	const [searchCompleted, setSearchCompleted] = useState(false);
	const [loading, setLoading] = useState(true);

	const { currentAgent } = props;

	useEffect(() => {
		if (currentAgent.length > 0) {
			setLoading(false);
		}
	}, [currentAgent]);

	const handleListingPropertiessNavigaiton = item =>
		props.navigation.navigate('AgentDetails', {
			data: item,
		});

	const handelRefresh = async () => {
		setIsRefreshing(true);

		await props.fetchAgents();

		setTimeout(() => {
			setIsRefreshing(false);
		}, 1000);
	};

	const search = async text => {
		try {
			let data = [];
			find(currentAgent, (element, index, array) => {
				if (element.displayName.includes(text)) {
					data.push(element);
					setSearchData(data);
					setSearchCompleted(data);
				}
			});

			if (!text.length > 0) {
				setSearchCompleted(false);
			}
		} catch (err) {
			console.log(err);
		}
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<SafeAreaView style={styles.agentContainer}>
			<Searchbar
				theme={{ colors: { primary: '#fff' } }}
				style={styles.searchBar}
				placeholder='search agent'
				onChangeText={search}
				inputStyle={{ color: '#fff' }}
				placeholderTextColor='#fff'
				iconColor='#fff'
			/>
			<FlatList
				refreshing={isRefreshing}
				onRefresh={handelRefresh}
				style={styles.flatList}
				data={searchCompleted ? searchData : currentAgent}
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
		backgroundColor: theme['color-primary-400'],
		color: '#fff',
	},
});

const mapStateToProps = store => ({
	currentAgent: store.agentState.agents,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ fetchAgents }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Agents);
