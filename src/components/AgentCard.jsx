import React, { useState } from 'react';
import {
	Card,
	Title,
	Paragraph,
	Modal,
	Portal,
	Provider,
} from 'react-native-paper';
import { Layout, Text, Avatar, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';

import { default as theme } from '../theme/custom-theme.json';
import { showModal } from '../redux/actions';

const AgentCard = props => {
	const { item } = props;
	const { adminPrevelage } = props;
	const [isExpandedUserSettings, setIsExpandedUserSettings] = useState(true);

	const addToFeatureList = async () => {
		try {
			const user = firebase.database().ref('featureList');
			await user.child(item.id).set(item);
			props.showModal('Agent Added To Featured List');
		} catch (err) {
			console.log(err);
		}
	};

	const removeFromFeatureList = async () => {
		try {
			await firebase.database().ref('featureList').child(item.id).remove();
			props.showModal('Agent Removed From Featured List');
		} catch (err) {
			console.log(err);
		}
	};

	const adminActions = () => {
		return (
			<List.Section>
				<List.Accordion
					expanded={isExpandedUserSettings}
					onPress={() => setIsExpandedUserSettings(!isExpandedUserSettings)}
					titleStyle={styles.basicFontStylePrimary}
					style={styles.userProfileList}
					title='Admin Actions'
					left={props => (
						<List.Icon {...props} icon='account-circle' color='#fff' />
					)}>
					<List.Item
						onPress={addToFeatureList}
						title='Add To Feature List'
						titleStyle={styles.basicFontStyleSecondary}
						style={styles.listItems}
						left={props => (
							<List.Icon
								{...props}
								icon='book-plus'
								color='#fff'
								style={styles.itemIcons}
							/>
						)}></List.Item>

					<List.Item
						title='Remove From Feature List'
						onPress={removeFromFeatureList}
						titleStyle={styles.basicFontStyleSecondary}
						left={props => (
							<List.Icon
								{...props}
								icon='trash-can'
								color='#fff'
								style={styles.itemIcons}
							/>
						)}
					/>
				</List.Accordion>
			</List.Section>
		);
	};

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
			{adminPrevelage && adminActions()}
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
		marginBottom: 20,
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
	btnContainer: {
		marginTop: 50,
		backgroundColor: theme['color-primary-400'],
		flexDirection: 'row',
	},
	btn: {
		margin: 10,
		width: '50%',
	},
	btnDelete: {
		margin: 10,
	},
	basicFontStylePrimary: {
		color: '#fff',
		fontWeight: 'bold',
	},
	userProfileList: {
		backgroundColor: theme['color-primary-400'],
		color: theme['color-primary-400'],
	},
	basicFontStyleSecondary: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 13,
	},
	listItems: {
		marginBottom: -10,
	},
});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ showModal }, dispatch);

export default connect(null, mapDispatchToProps)(AgentCard);
