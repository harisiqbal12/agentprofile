import React from 'react';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Layout, Text, Avatar } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import { default as theme } from '../theme/custom-theme.json';

const AgentCard = props => {
	const { item } = props;

	return (
		<Card style={styles.agentCard}>
			<Layout style={styles.agentProfile}>
				<Text style={styles.agentName}>{item.displayName}</Text>
				<Text style={styles.agentListedProperties}>
					Listed Properties {item.listingProperties}
				</Text>
				<Text style={styles.agentListedPropertiesNumber}>
					{item.listedProperties}
				</Text>
				<Avatar
					style={styles.avatar}
					size='giant'
					source={{ uri: item.profileURL }}
				/>
			</Layout>
			<Card.Content>
				<Title style={styles.agentNumber}>Mobile: {item.mobile}</Title>
				<Title style={styles.agentEmail}>{item.email}</Title>
			</Card.Content>
		</Card>
	);
};

const styles = StyleSheet.create({
	agentCard: {
		flex: 1,
		margin: 10,
		backgroundColor: theme['color-primary-400'],
	},
	avatar: {
		height: 80,
		width: 80,
		borderRadius: 0,
		borderColor: '#fff',
		borderWidth: 3,
		marginTop: 10,
	},
	agentProfile: {
		position: 'relative',
		top: 10,
		marginLeft: 10,
		backgroundColor: theme['color-primary-400'],
	},
	agentNumber: {
		fontSize: 10,
		fontWeight: 'bold',
		color: '#fff',
		fontFamily: 'Roboto_400Regular',
		position: 'relative',
		top: 50,
	},
	agentName: {
		position: 'absolute',
		left: 85,
		top: 30,
		fontSize: 15,
		fontWeight: 'bold',
		color: '#fff',
		fontFamily: 'Roboto_400Regular',
	},
	agentEmail: {
		fontSize: 10,
		fontWeight: 'bold',
		color: '#fff',
		fontFamily: 'Roboto_400Regular',
		textAlign: 'right',
		position: 'relative',
		top: 13,
	},
	agentListedProperties: {
		fontSize: 10,
		fontWeight: 'bold',
		color: '#FFF',
		fontFamily: 'Roboto_400Regular',
		position: 'absolute',
		right: 10,
		top: 10,
	},
	agentListedPropertiesNumber: {
		fontSize: 10,
		fontWeight: 'bold',
		color: '#fff',
		fontFamily: 'Roboto_400Regular',
		position: 'absolute',
		right: 10,
		top: 30,
	},
});

export default AgentCard;
