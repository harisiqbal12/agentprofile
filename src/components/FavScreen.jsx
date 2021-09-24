import React, { useEffect, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { default as theme } from '../theme/custom-theme.json';
import HomescreenCard from './HomescreenCard';
import { fetchFavAgentFromDatabase } from '../redux/actions/index';
import Loader from './Loader';
import NotFound from './Notfound';

function FavScreen(props) {
	const [loading, setLoading] = useState(true);
	const [currentAgent, setCurrentAgent] = useState([]);
	const [isRefresh, setIsRefres] = useState(false);
	const [favAgents, setFavAgents] = useState([]);

	useEffect(() => {
		if (props.favAgents) {
			setCurrentAgent(props.favAgents);
			setLoading(false);
		}
	}, [props.favAgents]);

	useEffect(() => {
		if (props.favAgentsArray.length > 0) {
			props.fetchFavAgentFromDatabase(props.favAgentsArray);
		}
	}, [props.favAgentsArray]);

	const handleRefresh = () => {
		setIsRefres(true);

		props.fetchFavAgentFromDatabase(props.favAgentsArray);

		setTimeout(() => {
			setIsRefres(false);
		}, 1000);
	};

	if (loading) {
		return <Loader />;
	}

	if (!currentAgent.length > 0) {
		return <NotFound title='No Favourite Agent Found' />;
	}


	return (
		<SafeAreaView style={styles.SafeAreaView}>
			<Layout style={styles.favAgents}>
				<Text style={styles.textHeading}>Favourite Agents</Text>
			</Layout>
			<FlatList
				contentContainerStyle={{ padding: 16 }}
				data={currentAgent}
				refreshing={isRefresh}
				onRefresh={handleRefresh}
				renderItem={({ item }) => {
					return (
						<HomescreenCard
							navigation={props.navigation}
							item={item}
							// favAgents={props.route.params.data}
							agentProperty={props.route.params.agentProperty}
							// agentsFaveIds={favAgents}
						/>
					);
				}}
				keyExtractor={item => item.id}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	SafeAreaView: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	favAgents: {
		backgroundColor: 'transparent',
		padding: 20,
	},
	textHeading: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		color: theme['color-info-800'],
	},
});

const mapStateTorProps = state => ({
	favAgents: state.agentState.favAgents,
	favAgentsArray: state.agentState.favAgentsIDS,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ fetchFavAgentFromDatabase }, dispatch);

export default connect(mapStateTorProps, mapDispatchToProps)(FavScreen);
