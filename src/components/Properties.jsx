import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';
import find from 'array-find';

import PropertyCard from './PropertyCard';

function Properties(props) {
	const [searchCompleted, setSearchCompleted] = useState(false);
	const [searchResult, setSearchResult] = useState([]);
	const { currentProperties } = props;

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

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<Searchbar
				theme={{ colors: { primary: '#EA723D' } }}
				style={styles.searchBar}
				placeholder='search properties'
				onChangeText={handleSearch}
			/>
			<FlatList
				contentContainerStyle={{ padding: 16 }}
				data={ searchCompleted ? searchResult : currentProperties}
				renderItem={({ item }) => {
					return <PropertyCard navigation={props.navigation} data={item} />;
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
});
export default connect(mapStateToProps)(Properties);
