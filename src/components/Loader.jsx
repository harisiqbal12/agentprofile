import React from 'react';
import { ApplicationProvider, Layout, Spinner } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { StyleSheet } from 'react-native';

import { default as theme } from '../theme/custom-theme.json';

const Loader = () => (
	<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
		<Layout style={styles.loadingContainer}>
			<Spinner size='large' />
		</Layout>
	</ApplicationProvider>
);

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Loader;
