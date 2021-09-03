import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner } from '@ui-kitten/components';

function SpinnerSmall(props) {
	return (
		<View style={[props.style, styles.indicator]}>
			<Spinner status='info' size='small' />
		</View>
	);
}

const styles = StyleSheet.create({
	indicator: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default SpinnerSmall;
