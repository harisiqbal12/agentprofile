import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Text, Layout, Avatar, Icon, Button, Card } from '@ui-kitten/components';
import { connect } from 'react-redux';

import firebase from 'firebase';

function Settings(props) {
	const { currentUser } = props;

	const handleCardPress = async () => {
		console.log('pressing');
		console.log(currentUser.displayName);
	};

	const onLogout = async () => {
		console.log('logging out');
		await firebase.auth().signOut();
	};

	return (
		<SafeAreaView style={styles.settingContainer}>
			<ScrollView style={styles.scrollView}>
				<Layout style={styles.userProfileContainer}>
					<Avatar
						style={styles.userProfile}
						size='giant'
						source={require('../../assets/man.png')}
					/>
					<Text style={styles.userProfileTitle}>@ {currentUser.displayName}</Text>
				</Layout>

				<Layout style={styles.userInforContainer}>
					<Card
						onPress={handleCardPress}
						style={styles.cardProfile}
						status='primary'>
						<Icon name='people' fill='#fff' style={styles.cardIcon} />
						<Text style={styles.cardTitle}>Profile</Text>
					</Card>
					<Card
						onPress={handleCardPress}
						style={styles.cardProfile}
						status='primary'>
						<Icon name='pie-chart' fill='#fff' style={styles.cardIcon} />
						<Text style={{ ...styles.cardTitle, fontSize: 12 }}>
							My Properties
						</Text>
					</Card>
					<Card
						onPress={handleCardPress}
						style={styles.cardProfile}
						status='primary'>
						<Icon name='heart' fill='#fff' style={styles.cardIcon} />
						<Text style={styles.cardTitle}>Favourites</Text>
					</Card>
					<Card
						onPress={handleCardPress}
						style={styles.cardProfile}
						status='primary'>
						<Icon name='email' fill='#fff' style={styles.cardIcon} />
						<Text style={styles.cardTitle}>Contact</Text>
					</Card>
					<Card onPress={onLogout} style={styles.cardProfile} status='primary'>
						<Icon name='power' fill='#fff' style={styles.cardIcon} />
						<Text style={styles.cardTitle}>Logout</Text>
					</Card>
					<Card
						onPress={handleCardPress}
						style={styles.cardProfile}
						status='primary'>
						<Icon
							name='question-mark-circle'
							fill='#fff'
							style={styles.cardIcon}
						/>
						<Text style={styles.cardTitle}>Support</Text>
					</Card>

					<Text style={{ ...styles.copyright, marginTop: 50 }}>
						All Rights Reserved 2020
					</Text>
				</Layout>
				<Layout></Layout>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	settingContainer: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		backgroundColor: '#fff',
	},

	scrollView: {},

	userProfileContainer: {
		flex: 1,
		padding: 40,
		paddingTop: 20,
		paddingBottom: 20,
		marginTop: StatusBar.currentHeight,
		backgroundColor: '#EA723D',
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	userProfile: {
		backgroundColor: '#fff',
		minHeight: 60,
		minWidth: 60,
	},
	userProfileTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff',
		fontFamily: 'Roboto_400Regular',
		left: 10,
	},
	userInforContainer: {
		marginTop: 40,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	card: {},
	cardProfile: {
		width: 150,
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
		borderTopWidth: 3,
		borderTopColor: '#fff',
		margin: 10,
		backgroundColor: '#EA723D',
	},
	cardTitle: {
		textAlign: 'center',
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff',
		fontFamily: 'Roboto_400Regular',
	},
	cardIcon: {
		width: 70,
		height: 70,
	},
	copyright: {
		fontWeight: 'bold',
		color: '#8F9BB3',
		fontFamily: 'Roboto_400Regular',
	},
});

mapStateToProps = store => ({
	currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps)(Settings);
