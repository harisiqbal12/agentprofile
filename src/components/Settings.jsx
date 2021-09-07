import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { Text, Layout, Avatar, Icon, Button, Card } from '@ui-kitten/components';
import { List } from 'react-native-paper';

import firebase from 'firebase';
import { default as theme } from '../theme/custom-theme.json';

function Settings(props) {
	const { currentUser, currentAgent } = props;
	const [isExpandedUserSettings, setIsExpandedUserSettings] = useState(true);
	const [isExpanedProperties, setIsExpandedProperties] = useState(true);
	const [isExpandedAccountSettings, setIsExpandedAccountSettings] =
		useState(true);

	const onLogout = async () => {
		await firebase.auth().signOut();
	};

	const hanldeProfileNavigate = () =>
		props.navigation.navigate('Profile', {
			currentUser,
		});

	const handleAgentProfileNavigation = () =>
		props.navigation.navigate('AgentProfile', {
			currentAgent,
		});

	const handleCreatePropertiesNavigation = () =>
		props.navigation.navigate('CreateProperties');

	const handleMyPropertiesNavigation = () =>
		props.navigation.navigate('MyProperties');

	const handleContactNavigation = () =>
		props.navigation.navigate('Contact', {
			agentEmail: 'support@agentprofile.com',
		});

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
				<Layout style={styles.listContainer}>
					<List.Section>
						<List.Accordion
							expanded={isExpandedUserSettings}
							onPress={() => setIsExpandedUserSettings(!isExpandedUserSettings)}
							titleStyle={styles.basicFontStylePrimary}
							style={styles.userProfileList}
							title='User Settings'
							left={props => (
								<List.Icon {...props} icon='account-circle' color='#fff' />
							)}>
							<List.Item
								onPress={hanldeProfileNavigate}
								title='My Profile'
								titleStyle={styles.basicFontStyleSecondary}
								style={styles.listItems}
								left={props => (
									<List.Icon
										{...props}
										icon='account-circle'
										color='#fff'
										style={styles.itemIcons}
									/>
								)}></List.Item>

							<List.Item
								title='Agent Settings'
								onPress={handleAgentProfileNavigation}
								titleStyle={styles.basicFontStyleSecondary}
								left={props => (
									<List.Icon
										{...props}
										icon='account-cog'
										color='#fff'
										style={styles.itemIcons}
									/>
								)}
							/>
							<List.Item
								title='Favourites'
								titleStyle={styles.basicFontStyleSecondary}
								left={props => (
									<List.Icon
										{...props}
										icon='heart'
										color='#fff'
										style={styles.itemIcons}
									/>
								)}
							/>
						</List.Accordion>
						<List.Accordion
							expanded={isExpanedProperties}
							onPress={() => setIsExpandedProperties(!isExpanedProperties)}
							titleStyle={styles.basicFontStylePrimary}
							style={styles.userProfileList}
							title='Properties'
							left={props => (
								<List.Icon {...props} icon='chart-pie' color='#fff' />
							)}>
							<List.Item
								onPress={handleCreatePropertiesNavigation}
								title='Create Property'
								titleStyle={styles.basicFontStyleSecondary}
								style={styles.listItems}
								left={props => (
									<List.Icon
										{...props}
										icon='note-plus'
										color='#fff'
										style={styles.itemIcons}
									/>
								)}
							/>
							<List.Item
								title='My Properties'
								titleStyle={styles.basicFontStyleSecondary}
								onPress={handleMyPropertiesNavigation}
								left={props => (
									<List.Icon
										{...props}
										icon='chart-pie'
										color='#fff'
										style={styles.itemIcons}
									/>
								)}
							/>
						</List.Accordion>
						<List.Accordion
							expanded={isExpandedAccountSettings}
							onPress={() =>
								setIsExpandedAccountSettings(!isExpandedAccountSettings)
							}
							titleStyle={styles.basicFontStylePrimary}
							style={styles.userProfileList}
							title='Account Settings'
							left={props => (
								<List.Icon {...props} icon='account-cog' color='#fff' />
							)}>
							<List.Item
								onPress={onLogout}
								title='Logout'
								titleStyle={styles.basicFontStyleSecondary}
								style={styles.listItems}
								left={props => (
									<List.Icon
										{...props}
										icon='logout'
										color='#fff'
										style={styles.itemIcons}
									/>
								)}
							/>
							<List.Item
								onPress={handleContactNavigation}
								title='Contact'
								titleStyle={styles.basicFontStyleSecondary}
								left={props => (
									<List.Icon
										{...props}
										icon='email-multiple'
										color='#fff'
										style={styles.itemIcons}
									/>
								)}
							/>
							<List.Item
								title='About us'
								titleStyle={styles.basicFontStyleSecondary}
								left={props => (
									<List.Icon
										{...props}
										icon='help-circle'
										color='#fff'
										style={styles.itemIcons}
									/>
								)}
							/>
						</List.Accordion>
					</List.Section>
				</Layout>
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

	scrollView: {
		flex: 1,
		backgroundColor: theme['color-primary-300'],
	},

	userProfileContainer: {
		flex: 1,
		padding: 40,
		paddingTop: 20,
		paddingBottom: 20,
		marginTop: StatusBar.currentHeight,
		backgroundColor: theme['color-primary-300'],
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
	listContainer: {
		backgroundColor: theme['color-primary-300'],
	},
	userProfileList: {
		backgroundColor: theme['color-primary-400'],
		color: theme['color-primary-400'],
	},
	basicFontStylePrimary: {
		color: '#fff',
		fontWeight: 'bold',
	},
	basicFontStyleSecondary: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 13,
	},
	listItems: {
		marginBottom: -10,
	},
	itemIcons: {},
});

mapStateToProps = store => ({
	currentUser: store.userState.currentUser,
	currentAgent: store.agentState.currentAgent,
});

export default connect(mapStateToProps)(Settings);

// <Layout style={styles.userProfileContainer}>
// 					<Avatar
// 						style={styles.userProfile}
// 						size='giant'
// 						source={require('../../assets/man.png')}
// 					/>
// 					<Text style={styles.userProfileTitle}>@ {currentUser.displayName}</Text>
// 				</Layout>

// 				<Layout style={styles.userInforContainer}>
// 					<Card style={styles.cardProfile} status='primary'>
// 						<TouchableOpacity onPress={hanldeProfileNavigate}>
// 							<Icon name='people' fill='#fff' style={styles.cardIcon} />
// 							<Text style={styles.cardTitle}>Profile</Text>
// 						</TouchableOpacity>
// 					</Card>

// 					<Card
// 						onPress={handleCardPress}
// 						style={styles.cardProfile}
// 						status='primary'>
// 						<TouchableOpacity onPress={handleCreatePropertiesNavigation}>
// 							<Icon name='plus-square' fill='#fff' style={styles.cardIcon} />
// 							<Text style={{ ...styles.cardTitle, fontSize: 10 }}>
// 								Create Properties
// 							</Text>
// 						</TouchableOpacity>
// 					</Card>
// 					<Card
// 						onPress={handleCardPress}
// 						style={styles.cardProfile}
// 						status='primary'>
// 						<TouchableOpacity onPress={handleAgentProfileNavigation}>
// 							<Icon name='person' fill='#fff' style={styles.cardIcon} />
// 							<Text style={styles.cardTitle}>Agent</Text>
// 						</TouchableOpacity>
// 					</Card>
// 					<Card
// 						onPress={handleCardPress}
// 						style={styles.cardProfile}
// 						status='primary'>
// 						<TouchableOpacity>
// 							<Icon name='heart' fill='#fff' style={styles.cardIcon} />
// 							<Text style={styles.cardTitle}>Favourites</Text>
// 						</TouchableOpacity>
// 					</Card>
// 					<Card
// 						onPress={handleCardPress}
// 						style={styles.cardProfile}
// 						status='primary'>
// 						<TouchableOpacity>
// 							<Icon name='email' fill='#fff' style={styles.cardIcon} />
// 							<Text style={styles.cardTitle}>Contact</Text>
// 						</TouchableOpacity>
// 					</Card>
// 					<Card style={styles.cardProfile} status='primary'>
// 						<TouchableOpacity onPress={onLogout}>
// 							<Icon name='power' fill='#fff' style={styles.cardIcon} />
// 							<Text style={styles.cardTitle}>Logout</Text>
// 						</TouchableOpacity>
// 					</Card>
// 					<Card
// 						onPress={handleCardPress}
// 						style={styles.cardProfile}
// 						status='primary'>
// 						<TouchableOpacity>
// 							<Icon name='phone-call' fill='#fff' style={styles.cardIcon} />
// 							<Text style={styles.cardTitle}>Support</Text>
// 						</TouchableOpacity>
// 					</Card>
// 					<Card
// 						onPress={handleCardPress}
// 						style={styles.cardProfile}
// 						status='primary'>
// 						<TouchableOpacity>
// 							<Icon
// 								name='question-mark-circle'
// 								fill='#fff'
// 								style={styles.cardIcon}
// 							/>
// 							<Text style={styles.cardTitle}>About us</Text>
// 						</TouchableOpacity>
// 					</Card>
// 					<Layout>
// 						<Text style={{ ...styles.copyright, marginTop: 50 }}>
// 							All Rights Reserved 2020
// 						</Text>
// 					</Layout>
// 				</Layout>
