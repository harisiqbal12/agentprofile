import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';

import PropertyCard from './PropertyCard';

function Properties(props) {
	const { currentProperties } = props;

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<Searchbar
				theme={{ colors: { primary: '#EA723D' } }}
				style={styles.searchBar}
				placeholder='search properties'
			/>
			<FlatList
				contentContainerStyle={{ padding: 16 }}
				data={currentProperties}
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
