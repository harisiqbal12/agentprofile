import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	StatusBar,
	FlatList,
} from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAgentProperites } from '../redux/actions';
import Loader from './Loader';
import PropertyCard from './PropertyCard';
import NotFound from './Notfound'

import { default as theme } from '../theme/custom-theme.json';

function ListingProperties(props) {
	const { agentID, displayName } = props.route.params;
	const [loading, setLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	useEffect(() => {
		(async () => {
			setLoading(true);

			try {
				await props.fetchAgentProperites(agentID);
			} catch (err) {
				console.log(err);
			}
		})();
		setLoading(false);
	}, []);

	const handleRefreshing = async () => {
		try {
			setIsRefreshing(true);
			await props.fetchAgentProperites(agentID);

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

	if (!props.agentProperties.length > 0) {
		return (
		<NotFound title='No Listing Properties Found' />
		);
	}

	return (
		<SafeAreaView style={styles.SafeAreaView}>
			<Layout style={styles.titleContainer}>
				<Text style={styles.title}>{displayName} Properties</Text>
			</Layout>
			<FlatList
				refreshing={isRefreshing}
				onRefresh={handleRefreshing}
				contentContainerStyle={{ padding: 16 }}
				data={props.agentProperties}
				renderItem={({ item }) => {
					return (
						<Layout>
							<PropertyCard navigation={props.navigation} data={item} />
						</Layout>
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

	titleContainer: {
		margin: 25,
		backgroundColor: 'transparent',
	},
	title: {
		fontWeight: 'bold',
		color: theme['color-info-800'],
		fontSize: 25,
		textAlign: 'center',
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
	agentProperties: state.propertyState.agentProperties,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ fetchAgentProperites }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListingProperties);
