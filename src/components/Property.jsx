import React, { useState, useEffect } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import {
	StyleSheet,
	SafeAreaView,
	StatusBar,
	ScrollView,
	Image,
	TouchableOpacity,
	View,
} from 'react-native';
import formate from 'format-number';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
	fetchAgentById,
	faveSaveProperty,
	fetchFavProperties,
} from '../redux/actions';
import Loader from './Loader';
import AgentCard from './AgentCard';
import firebase from 'firebase';

import { default as theme } from '../theme/custom-theme.json';

function Property(props) {
	const [fav, setFav] = useState(false);
	const [saved, setSaved] = useState(false);
	const [favKey, setFavKey] = useState(null);
	const [loading, setLoading] = useState(false);
	const favourites = firebase.database().ref('favourites');
	const { data } = props.route.params;
	let formatedNumber = '';

	if (data.propertyPrice > 100) {
		formatedNumber = formate({ prefix: '$' })(data.propertyPrice);
	} else {
		formatedNumber = 'SOLD';
	}

	useEffect(() => {
		setLoading(true);
		(async () => {
			try {
				await props.fetchAgentById(data.authorID);
				await props.fetchFavProperties();
				setLoading(false);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	useEffect(() => {
		if (fav && !saved) {
			(async () => {
				// console.log('saving');
				try {
					await favourites
						.child('properties')
						.child(firebase.auth().currentUser.uid)
						.push({
							id: data.id,
							authorID: data.authorID,
						});

					// console.log('saved');
					setSaved(true);
				} catch (err) {
					console.log(err);
				}
			})();
		}
		if (!fav && saved) {
			(async () => {
				// console.log('removing');
				try {
					await favourites
						.child('properties')
						.child(firebase.auth().currentUser.uid)
						.child(favKey)
						.remove();

					setSaved(false);
					// console.log('removed');
					props.fetchFavProperties();
				} catch (err) {
					console.log(err);
				}
			})();
		}
	}, [fav]);

	useEffect(() => {
		// console.log('useffeect');
		// console.log(props.route.params.data.id);
		// console.log(props.favProperties);
		if (props.favProperties.length > 0) {
			props.favProperties.forEach(itemId => {
				if (data.id === itemId.id) {
					// console.log('setting state');
					setFav(true);
					setSaved(true);
					setFavKey(itemId.snapID);
				}
			});
		}
	}, [props.favProperties]);

	const handleAgentProfileNavigation = () => {
		let agent = props.agentByID;
		agent['id'] = data.authorID;

		return props.navigation.navigate('AgentDetails', {
			data: agent,
		});
	};

	const handleAgentListingNavigation = () =>
		props.navigation.navigate('ListingProperties', {
			agentID: data.authorID,
			displayName: props.agentByID.displayName,
		});

	const handleContactNavigation = () =>
		props.navigation.navigate('Contact', {
			agentEmail: props.agentByID.email,
		});

	// console.log('fav: ' + fav);

	if (loading) {
		return <Loader />;
	}

	return (
		<View style={styles.root}>
			<SafeAreaView style={styles.SafeAreaView}>
				<ScrollView>
					<Layout style={styles.mainContainer}>
						<Layout style={styles.header}>
							<Text style={styles.heading}>{data.propertyName}</Text>
							<Text style={styles.paragraph}>{data.propertyAddress}</Text>
						</Layout>
						<Layout style={styles.imageSliderContainer}>
							<ScrollView
								pagingEnabled={true}
								style={styles.imageSlider}
								horizontal={true}>
								<Image
									style={styles.sliderImage}
									source={{ uri: data.images[0] }}
								/>
								<Image
									style={styles.sliderImage}
									source={{ uri: data.images[1] }}
								/>
								<Image
									style={styles.sliderImage}
									source={{ uri: data.images[2] }}
								/>
							</ScrollView>
						</Layout>
						<Layout style={styles.contentContainer}>
							<Layout style={styles.contentContainerText}>
								<TouchableOpacity onPress={e => setFav(!fav)}>
									<MaterialCommunityIcons
										color={theme['color-primary-400']}
										size={24}
										name={fav ? 'heart' : 'heart-outline'}
									/>
								</TouchableOpacity>
							</Layout>

							<Text
								style={[styles.heading, styles.secondaryHeading, styles.price]}>
								{formatedNumber}
							</Text>

							<Layout style={styles.secondaryContentContainer}>
								<Layout style={styles.iconContainer}>
									<Layout style={styles.iconContainerSecondary}>
										<Text style={styles.secondaryText}>Bedrooms</Text>
										<Layout style={styles.icon}>
											<MaterialCommunityIcons
												color={theme['color-primary-400']}
												size={24}
												name='bed-empty'
											/>
											<Text style={styles.iconText}>{data.bedrooms}</Text>
										</Layout>
									</Layout>

									<Layout style={styles.iconContainerSecondary}>
										<Text style={styles.secondaryText}>Bathrooms</Text>
										<Layout style={styles.icon}>
											<MaterialCommunityIcons
												color={theme['color-primary-400']}
												size={24}
												name='shower-head'
											/>
											<Text style={styles.iconText}>{data.bathrooms}</Text>
										</Layout>
									</Layout>

									<Layout style={styles.iconContainerSecondary}>
										<Text style={styles.secondaryText}>Area</Text>
										<Layout style={styles.icon}>
											<MaterialCommunityIcons
												color={theme['color-primary-400']}
												size={24}
												name='vector-square'
											/>
											<Text style={styles.iconText}>{data.propertyArea}</Text>
										</Layout>
									</Layout>

									<Layout style={styles.iconContainerSecondary}>
										<Text style={styles.secondaryText}>Garage</Text>
										<Layout style={styles.icon}>
											<MaterialCommunityIcons
												color={theme['color-primary-400']}
												size={24}
												name='garage'
											/>
											<Text style={styles.iconText}>{data.garage}</Text>
										</Layout>
									</Layout>
								</Layout>
							</Layout>

							<Layout style={styles.description}>
								<Text style={[styles.heading, styles.secondaryHeading]}>
									Description
								</Text>
								<Text style={styles.descriptionText}>
									{data.propertyDescript}
								</Text>
							</Layout>

							<Layout style={styles.featureContainer}>
								<Text style={[styles.heading, styles.secondaryHeading]}>
									Features
								</Text>

								<Layout style={styles.featuresContainerMain}>
									<Layout style={styles.featureColumnOne}>
										<Layout style={styles.feature}>
											<MaterialCommunityIcons
												color={'#fff'}
												size={24}
												name={`${
													data.features.airCondition
														? 'check-circle'
														: 'close-circle'
												}`}
											/>
											<Text style={styles.featureText}>Air Conditioning</Text>
										</Layout>
										<Layout style={styles.feature}>
											<MaterialCommunityIcons
												color={'#fff'}
												size={24}
												name={`${
													data.features.balcony ? 'check-circle' : 'close-circle'
												}`}
											/>
											<Text style={styles.featureText}>Balcony</Text>
										</Layout>
										<Layout style={styles.feature}>
											<MaterialCommunityIcons
												color={'#fff'}
												size={24}
												name={`${
													data.features.builtInRobes
														? 'check-circle'
														: 'close-circle'
												}`}
											/>
											<Text style={styles.featureText}>Built-In-Robes</Text>
										</Layout>
										<Layout style={styles.feature}>
											<MaterialCommunityIcons
												color={'#fff'}
												size={24}
												name={`${
													data.features.builtInWardrobes
														? 'check-circle'
														: 'close-circle'
												}`}
											/>
											<Text style={styles.featureText}>Built-In-Wardrobes</Text>
										</Layout>
										<Layout style={styles.feature}>
											<MaterialCommunityIcons
												color={'#fff'}
												size={24}
												name={`${
													data.features.courtyard
														? 'check-circle'
														: 'close-circle'
												}`}
											/>
											<Text style={styles.featureText}>Courtyard</Text>
										</Layout>
										<Layout style={styles.feature}>
											<MaterialCommunityIcons
												color={'#fff'}
												size={24}
												name={`${
													data.features.deck ? 'check-circle' : 'close-circle'
												}`}
											/>
											<Text style={styles.featureText}>Deck</Text>
										</Layout>
									</Layout>

									<Layout style={[styles.featureColumnOne, styles.marginLeft]}>
										<Layout style={styles.feature}>
											<MaterialCommunityIcons
												color={'#fff'}
												size={24}
												name={`${
													data.features.dishWasher
														? 'check-circle'
														: 'close-circle'
												}`}
											/>
											<Text style={styles.featureText}>Dishwasher</Text>
										</Layout>
										<Layout style={styles.feature}>
											<MaterialCommunityIcons
												color={'#fff'}
												size={24}
												name={`${
													data.features.floorboards
														? 'check-circle'
														: 'close-circle'
												}`}
											/>
											<Text style={styles.featureText}>Floorboards</Text>
										</Layout>
										<Layout style={styles.feature}>
											<MaterialCommunityIcons
												color={'#fff'}
												size={24}
												name={`${
													data.features.fullyFenced
														? 'check-circle'
														: 'close-circle'
												}`}
											/>
											<Text style={styles.featureText}>Fully Fenced</Text>
										</Layout>
										<Layout style={styles.feature}>
											<MaterialCommunityIcons
												color={'#fff'}
												size={24}
												name={`${
													data.features.garden ? 'check-circle' : 'close-circle'
												}`}
											/>
											<Text style={styles.featureText}>Garden</Text>
										</Layout>
										<Layout style={styles.feature}>
											<MaterialCommunityIcons
												color={'#fff'}
												size={24}
												name={`${
													data.features.outdoorEntertainingArea
														? 'check-circle'
														: 'close-circle'
												}`}
											/>
											<Text style={styles.featureText}>
												Outdoor-Entertaining-Area
											</Text>
										</Layout>
									</Layout>
								</Layout>

								{props.agentByID ? (
									<Layout style={styles.agentCard}>
										<TouchableOpacity onPress={handleAgentProfileNavigation}>
											<AgentCard item={props.agentByID} />
										</TouchableOpacity>
										<Layout style={styles.buttonContainer}>
											<Button
												onPress={handleAgentListingNavigation}
												style={styles.button}>
												My Listing
											</Button>
											<Button
												onPress={handleContactNavigation}
												style={styles.button}>
												Contact
											</Button>
										</Layout>
									</Layout>
								) : (
									<Loader />
								)}
							</Layout>
						</Layout>
					</Layout>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	SafeAreaView: {
		marginTop: StatusBar.currentHeight,
		flex: 1,
	},

	mainContainer: {
		backgroundColor: theme['color-primary-400'],
		marginTop: 40,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4.65,

		elevation: 8,
	},
	header: {
		backgroundColor: 'transparent',
		height: 20,
		margin: 10,
	},
	heading: {
		fontSize: 22,
		fontWeight: 'bold',
		fontFamily: 'Roboto_400Regular',
		color: '#fff',
	},
	paragraph: {
		fontFamily: 'Roboto_400Regular',
		fontWeight: 'bold',
		color: theme['color-primary-100'],
	},
	imageSliderContainer: {
		marginTop: 50,
	},
	sliderImage: {
		height: 300,
		width: 350,
		margin: 4,
	},
	imageSlider: {},
	contentContainer: {
		backgroundColor: 'transparent',
		backgroundColor: '#fff',
		padding: 10,
	},
	secondaryHeading: {
		color: theme['color-primary-400'],
	},
	secondaryContentContainer: {
		marginTop: 10,
	},
	iconContainer: {
		flex: 1,
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	secondaryText: {
		color: theme['color-primary-400'],
		fontWeight: 'bold',
		opacity: 0.9,
		fontSize: 12,
	},
	icon: {
		display: 'flex',
		flexDirection: 'row',
	},
	iconText: {
		color: theme['color-primary-400'],
		fontWeight: 'bold',
		fontSize: 15,
		padding: 2,
		marginLeft: 5,
	},
	iconContainerSecondary: {
		padding: 10,
	},
	infoText: {
		display: 'flex',
		fontSize: 10,
		fontWeight: 'bold',
		color: theme['color-primary-400'],
		flexDirection: 'row-reverse',
		opacity: 0.8,
	},
	contentContainerText: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	description: {
		marginTop: 50,
	},
	descriptionText: {
		textAlign: 'justify',
		fontSize: 13,
		marginTop: 10,
		padding: 10,
	},
	featuresContainerMain: {
		height: 300,
		backgroundColor: theme['color-primary-400'],
		padding: 20,
		display: 'flex',
		flexDirection: 'row',
	},
	feature: {
		backgroundColor: 'transparent',
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 10,
	},
	featureText: {
		fontWeight: 'bold',
		fontSize: 10,
		color: '#fff',
		paddingLeft: 10,
		paddingTop: 5,
	},
	featureColumnOne: {
		backgroundColor: 'transparent',
		marginTop: 15,
	},
	marginLeft: {
		paddingLeft: 25,
	},
	authorContainer: {
		marginTop: 50,
		marginBottom: 50,
	},
	authorProfileContainer: {
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	profileImage: {
		width: 100,
		height: 100,
		borderWidth: 3,
		borderColor: theme['color-primary-400'],
	},
	price: {
		marginTop: -25,
		maxWidth: 200,
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
	button: {
		width: 150,
		margin: 10,
	},
	agentCard: {
		flex: 1,
		backgroundColor: theme['color-primary-400'],
		marginTop: 10,
	},
	root: {
		flex: 1,
		backgroundColor: theme['color-primary-700'],
	},
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{ fetchAgentById, faveSaveProperty, fetchFavProperties },
		dispatch
	);

const mapStateToProps = state => ({
	agentByID: state.agentState.agentByID,
	favProperties: state.propertyState.favProperty,
});

export default connect(mapStateToProps, mapDispatchToProps)(Property);
