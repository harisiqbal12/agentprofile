import React, { useEffect } from 'react';
import { Layout, Text, Avatar, Icon } from '@ui-kitten/components';
import { StyleSheet, ImageBackground } from 'react-native';
import { Card, Title, Avatar as PaperAvatar } from 'react-native-paper';

const LeftContent = props => (
	<Icon {...props} style={styles.cardIcon} fill='#8F9BB3' name='heart' />
);

function HomescreenCard({ item }) {
	const { displayName, mobile, listedProperties } = item;

	return (
		<Card style={styles.agentsCard}>
			<Card.Title
				style={styles.cardHeaderTitle}
				title={displayName}
				subtitle={mobile}
				right={LeftContent}
			/>
			<Card.Cover source={require('../../assets/background-image-1.jpg')} />
			<Layout style={styles.avatarContainer}>
				<Avatar
					style={styles.avatar}
					size='giant'
					source={require('../../assets/profile-image.jpg')}
				/>
			</Layout>
			<Card.Content>
				<Title style={styles.cardBottomTitleMain}>
					Listed Properties{'  '}
					<Title style={styles.cardBttomTitle}>{listedProperties}</Title>
				</Title>
			</Card.Content>
		</Card>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		flex: 1,
		backgroundColor: 'transparent',
	},
	agentsCard: {
		height: 300,
		marginBottom: 10,
	},
	image: {
		width: 100,
		height: 100,
		justifyContent: 'center',
	},
	avatarContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 0,
	},
	avatar: {
		height: 120,
		width: 120,
		marginBottom: 200,
	},
	cardBottomTitleMain: {
		fontSize: 10,
		fontWeight: 'bold',
		color: '#8F9BB3',
		fontFamily: 'Roboto_400Regular',
	},
	cardBttomTitle: {
		fontSize: 10,
		fontWeight: 'bold',
		color: '#EA723D',
		fontFamily: 'Roboto_400Regular',
	},
	cardHeaderTitle: {
		width: 350,
	},
	cardIcon: {
		height: 25,
		width: 25,
	},
});

export default HomescreenCard;
