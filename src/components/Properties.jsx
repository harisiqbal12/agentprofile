import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';
import find from 'array-find';
import Loader from './Loader';
import { bindActionCreators } from 'redux';

import PropertyCard from './PropertyCard';
import { fetchAllProperties } from '../redux/actions/index';

function Properties(props) {
	const [searchCompleted, setSearchCompleted] = useState(false);
	const [searchResult, setSearchResult] = useState([]);
	const { currentProperties } = props;
	const [loading, setLoading] = useState(true);
	const [favProperties, setFavProperties] = useState([]);
	const [isRefreshing, setIsRefreshin] = useState(false);

	useEffect(() => {
		if (currentProperties.length > 0) {
			setLoading(false);
		}
	}, [currentProperties]);
	useEffect(() => {
		setFavProperties(props.favProperties);
	}, [props.favProperties]);

	const handleSearch = async text => {
		try {
			let data = [];

			find(currentProperties, (element, index, array) => {
				// console.log(element.propertyName);
				// console.log(element.propertyName === text);
				if (element.propertyName.includes(text)) {
					data.push(element);
					setSearchResult(data);
					setSearchCompleted(true);
				}
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handleRefresh = () => {
		setIsRefreshin(true);
		props.fetchAllProperties();
		setTimeout(() => {
			setIsRefreshin(false);
		}, 1000);
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<Searchbar
				theme={{ colors: { primary: '#EA723D' } }}
				style={styles.searchBar}
				placeholder='search properties'
				onChangeText={handleSearch}
			/>
			<FlatList
				refreshing={isRefreshing}
				onRefresh={handleRefresh}
				contentContainerStyle={{ padding: 16 }}
				data={searchCompleted ? searchResult : currentProperties}
				renderItem={({ item }) => {
					return (
						<PropertyCard
							favProperties={favProperties}
							navigation={props.navigation}
							data={item}
						/>
					);
				}}
				keyExtractor={(item, index) => index.toString()}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	searchBar: {
		margin: 16,
	},
});

const mapStateToProps = state => ({
	currentProperties: state.propertyState.currentProperties,
	favProperties: state.propertyState.favProperty,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ fetchAllProperties }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
