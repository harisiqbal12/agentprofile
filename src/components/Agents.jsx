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
import AgentCard from './AgentCard';
import { bindActionCreators } from 'redux';
import { fetchAgents } from '../redux/actions';
import firebase from 'firebase';

function Agents(props) {
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [searchData, setSearchData] = useState(null);
	const [searchCompleted, setSearchCompleted] = useState(false);

	const { currentAgent } = props;

	useEffect(() => {}, [searchData]);

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
			const agentsRef = firebase.database().ref('agents');
			const agent = agentsRef
				.orderByChild('displayName')
				.equalTo(text)
				.on('child_added', snaphot => {
					console.log(snaphot.val());
					const res = snaphot.val();
					res['id'] = snaphot.key;
					data.push(res);

					setSearchData(data);
					setSearchCompleted(true);
				});

			if (!text.length > 0) {
				setSearchCompleted(false);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<SafeAreaView style={styles.agentContainer}>
			<Searchbar
				theme={{ colors: { primary: '#EA723D' } }}
				style={styles.searchBar}
				placeholder='search agent'
				onChangeText={search}
			/>
			<FlatList
				refreshing={isRefreshing}
				onRefresh={handelRefresh}
				contentContainerStyle={{
					padding: 16,
				}}
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
	},
});

const mapStateToProps = store => ({
	currentAgent: store.agentState.agents,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ fetchAgents }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Agents);
