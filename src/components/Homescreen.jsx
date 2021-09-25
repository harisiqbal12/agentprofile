import React, { useState, useEffect } from 'react';
import { Layout, Text, Icon, Button, Avatar } from '@ui-kitten/components';
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	FlatList,
	View,
	Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Provider, Modal, Portal } from 'react-native-paper';
import { bindActionCreators } from 'redux';
import ConfettiCannon from 'react-native-confetti-cannon';

import {
	fetchAgentProperty,
	fetchAgents,
	fetchFavAgents,
	// fetchFaveAgents,
} from '../redux/actions';
import HomescreenCard from './HomescreenCard';
import Loader from './Loader';

import { default as theme } from '../theme/custom-theme.json';

function Homescreen(props) {
	const [loading, setLoading] = useState(true);
	const { currentAgent } = props;
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [executeAgain, setExecuteAgain] = useState(false);
	const [featuredAgent, setFeaturedAgent] = useState(null);

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

	useEffect(() => {
		if (props.featuredAgent.length >= 1) {
			setFeaturedAgent(props.featuredAgent[0]);
			setShowModal(true);
		}
	}, [props.featuredAgent]);

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

		setExecuteAgain(true);
	};

	const hideModal = () => {
		setShowModal(false);
		setExecuteAgain(true);
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<Provider>
			<View style={styles.root}>
				<SafeAreaView style={styles.homeContainer}>
					<Layout style={styles.titleContainer}>
						<Text style={styles.headerTitle}>Agent Profiles</Text>
					</Layout>

					<FlatList
						refreshing={isRefreshing}
						onRefresh={handleRefresh}
						data={currentAgent}
						renderItem={({ item }) => {
							return (
								// <TouchableOpacity onPress={() => handleAgentDetailsNavigation(item)}>
								<HomescreenCard
									navigation={props.navigation}
									agentProperty={props.agentProperty}
									item={item}
									executeAgain={executeAgain}
									// agentsFaveIds={fetchFaveAgents}
								/>
								// </TouchableOpacity>
							);
						}}
						keyExtractor={item => item.id}
					/>
				</SafeAreaView>
			</View>

			{featuredAgent ? (
				<Portal>
					<Modal
						visible={showModal}
						onDismiss={hideModal}
						contentContainerStyle={styles.modal}>
						<Layout style={styles.modalContainer}>
							<Avatar
								size='giant'
								style={styles.modalImage}
								source={{
									uri: featuredAgent
										? featuredAgent.profileURL
										: 'https://www.omnitouchinternational.com/wp-content/uploads/2018/05/user-placeholder.jpg',
								}}
							/>

							<Text style={styles.textModal}>Agent of the week</Text>
							<Text style={styles.textModal}>
								{featuredAgent ? featuredAgent.displayName : 'No Agent Found'}
							</Text>
							{/* <Text style={styles.textModal}>{email}</Text> */}
							<Layout style={styles.modalButtonContainer}>
								<Button
									status='success'
									appearance='outline'
									onPress={hideModal}
									style={styles.modalButton}>
									Ok
								</Button>
							</Layout>
						</Layout>
					</Modal>
					<ConfettiCannon fadeOut={true} count={150} origin={{ x: -10, y: 0 }} />
				</Portal>
			) : null}
		</Provider>
	);
}

const styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
		backgroundColor: theme['color-primary-700'],
		marginTop: StatusBar.currentHeight,
	},
	titleContainer: {
		backgroundColor: 'transparent',
		alignItems: 'center',
		flex: 0.1,
		justifyContent: 'center',
		marginBottom: 30,
		marginTop: 20,
	},
	headerTitle: {
		fontSize: 25,
		fontWeight: 'bold',
		color: theme['color-primary-100'],
		fontFamily: 'Roboto_400Regular',
	},
	flatList: {
		backgroundColor: 'transparent',
	},
	modal: {
		width: 250,
		height: 300,
		alignSelf: 'center',
	},
	modalContainer: {
		backgroundColor: '#fff',
		borderRadius: 10,
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 0.5,
		borderColor: '#fff',
	},
	modalButtonContainer: {
		backgroundColor: 'transparent',
		marginTop: '15%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		width: 100,
		height: 100,
	},
	modalButton: {
		width: 150,
	},
	textModal: {
		color: theme['color-primary-500'],
		fontWeight: 'bold',
		fontSize: 12,
	},
	modalImage: {
		width: 120,
		height: 120,
		marginBottom: 10,
	},
	root: {
		flex: 1,
		backgroundColor: theme['color-primary-700']
	},
});

const mapStateToProps = state => ({
	currentAgent: state.agentState.agents,
	agentProperty: state.propertyState.agentProperty,
	featuredAgent: state.agentState.featuredList,
	// favAgents: state.agentState.agentsFave,
	modal: state.userState.modal,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{ fetchAgentProperty, fetchAgents, fetchFavAgents },
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen);
