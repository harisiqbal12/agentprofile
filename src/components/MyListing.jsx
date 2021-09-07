import React, { useEffect, useState } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { FlatList, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAgentProperites } from '../redux/actions';
import { default as theme } from '../theme/custom-theme.json';

import Loader from './Loader';
import PropertyCard from './PropertyCard';

function MyListing(props) {
	const [loading, setLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const currentUser = firebase.auth().currentUser;

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				await props.fetchAgentProperites(currentUser.uid);
				setLoading(false);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	const handleRefresh = async () => {
		try {
			setIsRefreshing(true);
			props.fetchAgentProperites(currentUser.uid);

			setTimeout(() => {
				setIsRefreshing(false);
			}, 1000);
		} catch (err) {
			console.log(err);
		}
	};

	if (loading) {
		return <Loader />;
	}

	if (!props.currentAgentProperties.length > 0) {
		return (
			<SafeAreaView style={styles.SafeAreaView}>
				<Layout style={styles.errorContainer}>
					<Layout style={styles.textContainer}>
						<Text style={{ ...styles.title, color: '#fff' }}>No Listing</Text>
					</Layout>
				</Layout>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.SafeAreaView}>
			<Layout style={styles.titleContainer}>
				<Text style={styles.title}>My Listings</Text>
			</Layout>
			<FlatList
				refreshing={isRefreshing}
				onRefresh={handleRefresh}
				contentContainerStyle={{ padding: 16 }}
				data={props.currentAgentProperties}
				renderItem={({ item }) => {
					return (
						<PropertyCard
							authenticatedUser={true}
							navigation={props.navigation}
							data={item}
						/>
					);
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	SafeAreaView: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	titleContainer: {
		backgroundColor: 'transparent',
		marginTop: 20,
	},
	title: {
		textAlign: 'center',
		fontSize: 25,
		color: theme['color-info-800'],
		fontWeight: 'bold',
	},
	errorContainer: {
		flex: 1,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
	},
	textContainer: {
		backgroundColor: theme['color-danger-500'],
		padding: 20,
		borderRadius: 5,
	},
});

const mapStateToProps = state => ({
	currentAgentProperties: state.propertyState.agentProperties,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ fetchAgentProperites }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MyListing);
