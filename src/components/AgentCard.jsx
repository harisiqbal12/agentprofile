import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const AgentCard = () => {
	return (
		<Layout style={styles.cardContainer}>
			<Text>Haris</Text>
		</Layout>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
	},
});

export default AgentCard;
