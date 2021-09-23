import React, { useEffect, useState } from 'react';
import { Searchbar, Provider, Modal, Portal } from 'react-native-paper';
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Text, Input, Button, Icon } from '@ui-kitten/components';
import find from 'array-find';

import { fetchAgents, hideModal } from '../redux/actions';
import AgentCard from './AgentCard';
import Loader from './Loader';

import { default as theme } from '../theme/custom-theme.json';

function Agents(props) {
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [searchData, setSearchData] = useState(null);
	const [searchCompleted, setSearchCompleted] = useState(false);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [modalMessage, setModalMessage] = useState(null);

	const { currentAgent } = props;

	useEffect(() => {
		if (currentAgent.length > 0) {
			setLoading(false);
		}
	}, [currentAgent]);

	useEffect(() => {
		console.log(props.modal);
		if (props.modal.showModal) {
			console.log(props.modal);
			setShowModal(props.modal.showModal);
			setModalMessage(props.modal.message);
		} else {
			setShowModal(false);
		}
	}, [props.modal]);

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

	const hideModal = () => {
		setShowModal(false);
		props.hideModal();
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<SafeAreaView style={styles.agentContainer}>
			<Provider>
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
								<AgentCard adminPrevelage={true} item={item} />
							</TouchableOpacity>
						);
					}}
					keyExtractor={item => item.id}
				/>
				<Portal>
					<Modal
						visible={showModal}
						onDismiss={hideModal}
						contentContainerStyle={styles.modal}>
						<Layout style={styles.modalContainer}>
							<Icon
								style={styles.icon}
								name='email-outline'
								fill={theme['color-primary-500']}
							/>

							<Text style={styles.textModal}>{modalMessage}</Text>
							{/* <Text style={styles.textModal}>{email}</Text> */}
							<Layout style={styles.modalButtonContainer}>
								<Button
									status='primary'
									appearance='outline'
									onPress={hideModal}
									style={styles.modalButton}>
									Ok
								</Button>
							</Layout>
						</Layout>
					</Modal>
				</Portal>
			</Provider>
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
	modal: {
		width: 250,
		height: 250,
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
});

const mapStateToProps = store => ({
	currentAgent: store.agentState.agents,
	modal: store.userState.modal,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ fetchAgents, hideModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Agents);
