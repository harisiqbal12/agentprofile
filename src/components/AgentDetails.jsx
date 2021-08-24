import React from 'react';
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	ScrollView,
	Image,
} from 'react-native';
import { Layout, Text, Avatar, Icon, Button } from '@ui-kitten/components';
const image = { uri: 'https://reactjs.org/logo-og.png' };

function AgentDetails(props) {
	const { about, office, displayName, mobile, email, listedProperties } =
		props.route.params.data;
	console.log(props);

	return (
		<SafeAreaView style={styles.agentDetails}>
			<ScrollView horizontal={false} style={styles.agentScreenContainer}>
				<Layout style={styles.agentPageContainer}>
					<Layout style={styles.imageContainer}>
						<Image
							style={styles.imageCover}
							source={require('../../assets/background-image-1.jpg')}
						/>
						<Avatar
							size='giant'
							source={require('../../assets/profile-image.jpg')}
							style={styles.profileImage}
						/>
					</Layout>
					<Layout style={styles.agentContent}>
						<Text style={styles.agentName}>{displayName}</Text>
						<Layout style={styles.workDetails}>
							<Icon name='briefcase' fill='#8F9BB3' style={styles.basicIcon} />
							<Text style={styles.basicFontStyling}>{office}</Text>
							<Icon name='smartphone' fill='#8F9BB3' style={styles.basicIcon} />
							<Text style={styles.basicFontStyling}>{mobile}</Text>
							<Icon name='email' fill='#8F9BB3' style={styles.basicIcon} />
							<Text style={styles.basicFontStyling}>{email}</Text>
							<Text style={styles.listedProperties}>Listed Properties</Text>
							<Text style={styles.listedProperty}>{listedProperties}</Text>
						</Layout>
						<Layout style={styles.aboutAgent}>
							<Text style={styles.aboutHeading}>About Agent</Text>
							<Text style={styles.aboutParagraph}>{about}</Text>
						</Layout>
					</Layout>
					<Layout style={styles.myListingButton}>
						<Button>My Listing</Button>
					</Layout>
				</Layout>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	agentDetails: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	agentScreenContainer: {
		flex: 1,
		backgroundColor: 'transparent',
	},
	agentPageContainer: {
		backgroundColor: 'transparent',
		marginTop: 20,
		flex: 1,
		marginHorizontal: 25,
	},
	imageContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
	},
	imageCover: {
		aspectRatio: 16 / 9,
		height: 195,
		backgroundColor: 'transparent',
		flex: 1,
	},
	profileImage: {
		flex: 1,
		width: 120,
		height: 120,
		bottom: 70,
		borderWidth: 3,
		borderColor: '#fff',
	},
	agentContent: {
		flex: 1,
		marginTop: -30,
		borderWidth: 2,
		borderColor: '#8F9BB3',
		borderRadius: 10,
		borderBottomEndRadius: 5,
	},
	agentName: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#8F9BB3',
		fontFamily: 'Roboto_400Regular',
		textAlign: 'center',
	},
	basicIcon: {
		width: 20,
		height: 20,
		margin: 10,
		marginBottom: 0,
		marginTop: 0,
	},
	workDetails: {
		flex: 1,
		marginTop: 10,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	basicFontStyling: {
		fontWeight: 'bold',
		color: '#737d90',
		fontFamily: 'Roboto_400Regular',
		textAlign: 'center',
		left: 40,
		bottom: 19,
		fontSize: 12,
	},
	listedProperties: {
		fontWeight: 'bold',
		color: '#8F9BB3',
		fontFamily: 'Roboto_400Regular',
		textAlign: 'center',
		left: 10,
	},
	listedProperty: {
		fontWeight: 'bold',
		color: '#EA723D',
		fontFamily: 'Roboto_400Regular',
		left: 10,
	},
	aboutAgent: {
		flex: 1,
		marginTop: 20,
		paddingRight: 30,
	},
	aboutHeading: {
		fontWeight: 'bold',
		color: '#8F9BB3',
		fontFamily: 'Roboto_400Regular',
		left: 10,
		fontSize: 25,
	},
	aboutParagraph: {
		fontWeight: 'bold',
		color: '#8F9BB3',
		fontFamily: 'Roboto_400Regular',
		left: 10,
		fontSize: 12,
		marginBottom: 20,
		textAlign: 'justify',
	},
	myListingButton: {
		marginTop: 10,
		marginBottom: 10,
	},
});

export default AgentDetails;