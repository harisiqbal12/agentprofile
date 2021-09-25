import React, { useState, useEffect } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	SafeAreaView,
	ScrollView,
	StatusBar,
	Image,
	TouchableOpacity,
} from 'react-native';
import { Layout, Text, Button, Input, Icon, Toggle } from '@ui-kitten/components';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import 'firebase/firebase-storage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Portal, Provider, Card } from 'react-native-paper';

import { fetchAgentProperites } from '../redux/actions/index';
import SpinnerSmall from './spinnerSmall';
import { default as theme } from '../theme/custom-theme.json';
import NotFound from './Notfound';

function CreateProperties(props) {
	const [selectBedrooms, setSelectBedrooms] = useState('');
	const [selectBathrooms, setSelectedBathrooms] = useState('');
	const [selectGarage, setSelectedGarage] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isError, setIsError] = useState(false);

	const [airCondition, setAirCondition] = useState(false);
	const [deck, setDeck] = useState(false);
	const [builtInRobes, setBuiltInRobes] = useState(false);
	const [garden, setGarden] = useState(false);
	const [fullyFenced, setFullyFenced] = useState(false);
	const [outdoorEntertainingArea, setOutdoorEntertainingArea] = useState(false);
	const [floorboards, setFloorboards] = useState(false);
	const [dishWasher, setDishwasher] = useState(false);
	const [balcony, setBalcony] = useState(false);
	const [builtInWardrobes, setBuildInWardrobes] = useState(false);
	const [courtyard, setCourtyard] = useState(false);

	const [propertyName, setPropertyName] = useState('');
	const [propertyAddress, setPropertyAddress] = useState('');
	const [propertyPrice, setPropertyPrice] = useState('');
	const [propertyDescript, setPropertyDescrip] = useState('');
	const [propertyArea, setPropertyArea] = useState('');

	const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
	const [imageOne, setImageOne] = useState(
		'https://warnaturbo.b-cdn.net/tutorial/wp-content/uploads/2020/07/01-Add-Change-Picture-in-Image-Placeholder-in-PowerPoint-Template-WarnaSlides.com_.jpg'
	);
	const [imageTwo, setImageTwo] = useState(
		'https://warnaturbo.b-cdn.net/tutorial/wp-content/uploads/2020/07/01-Add-Change-Picture-in-Image-Placeholder-in-PowerPoint-Template-WarnaSlides.com_.jpg'
	);
	const [imageThree, setImageThree] = useState(
		'https://warnaturbo.b-cdn.net/tutorial/wp-content/uploads/2020/07/01-Add-Change-Picture-in-Image-Placeholder-in-PowerPoint-Template-WarnaSlides.com_.jpg'
	);

	const [imageUpdateUrlOne, setImageUpdateUrlOne] = useState(null);
	const [imageUpdateUrlTwo, setImageUpdateUrlTwo] = useState(null);
	const [imageUpdateUrlThree, setImageUpdateThree] = useState(null);
	const [updateFirebase, setUpdatefirebase] = useState(false);

	const clearFields = () => {
		setSelectBedrooms('');
		setSelectedBathrooms('');
		setSelectedGarage('');
		setAirCondition(false);
		setDeck(false);
		setBuiltInRobes(false);
		setGarden(false);
		setFullyFenced(false);
		setOutdoorEntertainingArea(false);
		setFloorboards(false);
		setDishwasher(false);
		setBalcony(false);
		setBuildInWardrobes(false);
		setCourtyard(false);

		setPropertyName('');
		setPropertyAddress('');
		setPropertyPrice('');
		setPropertyDescrip('');
		setPropertyArea('');

		setImageOne(
			'https://warnaturbo.b-cdn.net/tutorial/wp-content/uploads/2020/07/01-Add-Change-Picture-in-Image-Placeholder-in-PowerPoint-Template-WarnaSlides.com_.jpg'
		);
		setImageTwo(
			'https://warnaturbo.b-cdn.net/tutorial/wp-content/uploads/2020/07/01-Add-Change-Picture-in-Image-Placeholder-in-PowerPoint-Template-WarnaSlides.com_.jpg'
		);
		setImageThree(
			'https://warnaturbo.b-cdn.net/tutorial/wp-content/uploads/2020/07/01-Add-Change-Picture-in-Image-Placeholder-in-PowerPoint-Template-WarnaSlides.com_.jpg'
		);
	};

	useEffect(() => {
		(async () => {
			try {
				const galleryPermission =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				setHasGalleryPermission(galleryPermission.status === 'granted');
			} catch (err) {}
		})();
	}, []);

	useEffect(() => {
		let imagesArray = [];

		imagesArray.push(imageUpdateUrlOne, imageUpdateUrlTwo, imageUpdateUrlThree);

		(async () => {
			try {
				if (!updateFirebase) return;
				await handleSaveData(imagesArray);
				setUpdatefirebase(false);
			} catch (err) {}
		})();
	}, [imageUpdateUrlOne, imageUpdateUrlThree, imageUpdateUrlTwo, updateFirebase]);

	useEffect(() => {
		if (props.data) {
			const {
				airCondition,
				deck,
				builtInWardrobes,
				courtyard,
				balcony,
				builtInRobes,
				dishWasher,
				floorboards,
				fullyFenced,
				garden,
				outdoorEntertainingArea,
			} = props.data.features;

			// setting features from database
			setAirCondition(airCondition);
			setDeck(deck);
			setBuiltInRobes(builtInRobes);
			setBuildInWardrobes(builtInWardrobes);
			setCourtyard(courtyard);
			setBalcony(balcony);
			setDishwasher(dishWasher);
			setFloorboards(floorboards);
			setFullyFenced(fullyFenced);
			setGarden(garden);
			setOutdoorEntertainingArea(outdoorEntertainingArea);

			//setting pictures
			const { images } = props.data;
			setImageOne(images[0]);
			setImageTwo(images[1]);
			setImageThree(images[2]);
			setImageUpdateUrlOne(images[0]);
			setImageUpdateUrlTwo(images[1]);
			setImageUpdateThree(images[2]);

			// setting inputs
			const {
				propertyName,
				propertyArea,
				propertyAddress,
				propertyDescript,
				propertyPrice,
				bathrooms,
				bedrooms,
				garage,
			} = props.data;

			setPropertyName(propertyName);
			setPropertyArea(propertyArea);
			setPropertyAddress(propertyAddress);
			setPropertyDescrip(propertyDescript);
			setPropertyPrice(propertyPrice);
			setSelectedBathrooms(bathrooms);
			setSelectedGarage(garage);
			setSelectBedrooms(bedrooms);
		}
	}, [props.data]);

	const handleGallery = async imageNumber => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [16, 9],
				quality: 0.4,
			});

			if (!result.cancelled) {
				if (imageNumber === 1) {
					setImageOne(result.uri);
					return;
				}
				if (imageNumber === 2) {
					setImageTwo(result.uri);
					return;
				}
				if (imageNumber === 3) {
					setImageThree(result.uri);
				}
			}
		} catch (err) {}
	};

	const taskProgress = snapshot => {
		setLoading(true);
	};

	const taskError = snapshot => {};

	const showModal = () => setIsError(true);
	const hideModal = () => setIsError(false);

	const uploadAndSaveData = async () => {
		try {
			if (propertyName.length > 32) {
				throw new Error('Property Name Too Big');
			}

			const images = [];
			const promises = [];
			const imageURLS = [];

			if (
				imageOne.startsWith('https://warnaturbo') ||
				imageTwo.startsWith('https://warnaturbo') ||
				imageThree.startsWith('https://warnaturbo')
			) {
				throw new Error('Please Provide All Images');
			}

			if (
				!propertyName.length > 0 ||
				!propertyAddress.length > 0 ||
				!propertyDescript.length > 0 ||
				!propertyArea.length > 0 ||
				!propertyPrice.length > 0
			) {
				throw new Error('Please provide all the details');
			}

			if (!parseInt(propertyPrice)) {
				throw new Error('Enter A Valid Price');
			}

			images.push(imageOne, imageTwo, imageThree);

			if (props.data) {
				if (imageOne.startsWith('file')) {
					(async () => {
						try {
							const responseImageOne = await fetch(imageOne);
							const blobImageOne = await responseImageOne.blob();
							const taskImageOne = firebase
								.storage()
								.ref()
								.child(
									`properties/${
										firebase.auth().currentUser.uid
									}/${Math.random().toString(36)}`
								)
								.put(blobImageOne);

							const taskCompleted = () => {
								taskImageOne.snapshot.ref.getDownloadURL().then(snapshot => {
									setImageUpdateUrlOne(snapshot);
									setUpdatefirebase(true);
								});
							};
							taskImageOne.on(
								'state_changed',
								taskProgress,
								taskError,
								taskCompleted
							);
						} catch (err) {}
					})();
				}

				if (imageTwo.startsWith('file')) {
					(async () => {
						try {
							const responseImageTwo = await fetch(imageTwo);
							const blobImageTwo = await responseImageTwo.blob();
							const taskImageTwo = firebase
								.storage()
								.ref()
								.child(
									`properties/${
										firebase.auth().currentUser.uid
									}/${Math.random().toString(36)}`
								)
								.put(blobImageTwo);

							const taskCompleted = () => {
								taskImageTwo.snapshot.ref.getDownloadURL().then(snapshot => {
									setImageUpdateUrlTwo(snapshot);
									setUpdatefirebase(true);
								});
							};

							taskImageTwo.on(
								'state_changed',
								taskProgress,
								taskError,
								taskCompleted
							);
						} catch (err) {}
					})();
				}

				if (imageThree.startsWith('file')) {
					(async () => {
						try {
							const responseImageThree = await fetch(imageTwo);
							const blobImageThree = await responseImageThree.blob();
							const taskImageThree = firebase
								.storage()
								.ref()
								.child(
									`properties/${
										firebase.auth().currentUser.uid
									}/${Math.random().toString(36)}`
								)
								.put(blobImageThree);

							const taskCompleted = () => {
								taskImageThree.snapshot.ref.getDownloadURL().then(snapshot => {
									setImageUpdateThree(snapshot);
									setUpdatefirebase(true);
								});
							};

							taskImageThree.on(
								'state_changed',
								taskProgress,
								taskError,
								taskCompleted
							);
						} catch (err) {}
					})();
				}

				if (
					!(
						imageOne.startsWith('file') &&
						imageTwo.startsWith('file') &&
						imageThree.startsWith('file')
					)
				) {
					setUpdatefirebase(true);
				}
				return;
			}

			images.map(async image => {
				const response = await fetch(image);
				const blobImage = await response.blob();
				const task = firebase
					.storage()
					.ref()
					.child(
						`properties/${
							firebase.auth().currentUser.uid
						}/${Math.random().toString(36)}`
					)
					.put(blobImage);

				promises.push(task);
				task.on(
					'state_changed',
					snapshot => {
						setLoading(true);
					},
					err => {
						setLoading(false);
					},
					async () => {
						task.snapshot.ref.getDownloadURL().then(urls => {
							imageURLS.push(urls);
							if (imageURLS.length === 3) {
								handleSaveData(imageURLS);
							}
						});
					}
				);
			});

			Promise.all(promises)
				.then(() => {})
				.catch(err => console.log(err));
		} catch (err) {
			setIsError(true);
			setError(err.message);
		}
	};

	const handleSaveData = async urls => {
		setLoading(true);

		try {
			const currentUser = firebase.auth().currentUser;
			const propertyRef = firebase.database().ref('properties');
			const agentRef = firebase.database().ref('agents');

			if (props.data) {
				if (props.adminPrevelage) {
					await propertyRef
						.child(props.data.authorID)
						.child(props.data.id)
						.update({
							propertyName,
							propertyAddress,
							propertyArea,
							propertyPrice,
							propertyDescript,
							images: urls,
							bedrooms: selectBedrooms,
							bathrooms: selectBathrooms,
							garage: selectGarage,
							authorID: currentUser.uid,
							features: {
								airCondition,
								builtInRobes,
								deck,
								dishWasher,
								garden,
								fullyFenced,
								outdoorEntertainingArea,
								floorboards,
								balcony,
								builtInWardrobes,
								courtyard,
							},
						});

					await props.fetchAgentProperites(currentUser.uid);

					setLoading(false);

					return;
				}

				await propertyRef.child(currentUser.uid).child(props.data.id).update({
					propertyName,
					propertyAddress,
					propertyArea,
					propertyPrice,
					propertyDescript,
					images: urls,
					bedrooms: selectBedrooms,
					bathrooms: selectBathrooms,
					garage: selectGarage,
					authorID: currentUser.uid,
					features: {
						airCondition,
						builtInRobes,
						deck,
						dishWasher,
						garden,
						fullyFenced,
						outdoorEntertainingArea,
						floorboards,
						balcony,
						builtInWardrobes,
						courtyard,
					},
				});

				await props.fetchAgentProperites(currentUser.uid);

				setLoading(false);

				return;
			}

			await propertyRef.child(currentUser.uid).push({
				propertyName,
				propertyAddress,
				propertyArea,
				propertyPrice,
				propertyDescript,
				images: urls,
				bedrooms: selectBedrooms,
				bathrooms: selectBathrooms,
				garage: selectGarage,
				authorID: currentUser.uid,
				features: {
					airCondition,
					builtInRobes,
					deck,
					dishWasher,
					garden,
					fullyFenced,
					outdoorEntertainingArea,
					floorboards,
					balcony,
					builtInWardrobes,
					courtyard,
				},
			});

			await agentRef.child(currentUser.uid).update({
				listingProperties: firebase.database.ServerValue.increment(1),
			});

			await props.fetchAgentProperites(currentUser.uid);

			setLoading(false);
			clearFields();
		} catch (err) {}
	};

	if (hasGalleryPermission === null) {
		return <Layout />;
	}

	if (!hasGalleryPermission) {
		return <Text>Please provide Gallery Permission</Text>;
	}

	if (!props.currentAgent) {
		return <NotFound title='Register For A Agent First' />;
	}

	return (
		<Provider>
			<SafeAreaView style={styles.SafeAreaView}>
				<ScrollView style={styles.ScrollView}>
					<Layout style={styles.container}>
						<Layout style={styles.containerTitle}>
							<Text style={styles.title}>
								{' '}
								{props.title ? props.title : 'Create Property'}
							</Text>
						</Layout>
						<Layout style={styles.imageSlider}>
							<Text style={styles.imageSliderHelperText}>
								You can only add upto 3 images
							</Text>
							<ScrollView
								style={{ flex: 1 }}
								pagingEnabled={true}
								horizontal={true}
								scrollEventThrottle={16}>
								<Layout>
									<TouchableOpacity onPress={() => handleGallery(1)}>
										<Image
											style={styles.slideImageOne}
											source={{
												uri: imageOne,
											}}
										/>
									</TouchableOpacity>
								</Layout>
								<Layout>
									<TouchableOpacity onPress={() => handleGallery(2)}>
										<Image
											style={styles.slideImageOne}
											source={{
												uri: imageTwo,
											}}
										/>
									</TouchableOpacity>
								</Layout>
								<Layout>
									<TouchableOpacity onPress={() => handleGallery(3)}>
										<Image
											style={styles.slideImageOne}
											source={{
												uri: imageThree,
											}}
										/>
									</TouchableOpacity>
								</Layout>
							</ScrollView>
						</Layout>
						<Layout style={styles.inputContainer}>
							<Text style={styles.inputPlaceholder}>Enter property name</Text>
							<Input
								style={styles.input}
								placeholder='Property Name'
								size='large'
								value={propertyName}
								onChangeText={t => setPropertyName(t)}
							/>
							<Text style={styles.inputPlaceholder}>Enter property address</Text>
							<Input
								style={styles.input}
								placeholder='Property Address'
								size='large'
								value={propertyAddress}
								onChangeText={t => setPropertyAddress(t)}
							/>
							<Text style={styles.inputPlaceholder}>
								Enter property price eg, 20000
							</Text>
							<Input
								style={styles.input}
								placeholder='Property Price'
								size='large'
								value={propertyPrice}
								onChangeText={t => setPropertyPrice(t)}
							/>
							<Text style={styles.inputPlaceholder}>Enter property Area</Text>
							<Input
								style={styles.input}
								placeholder='Property Area'
								size='large'
								value={propertyArea}
								onChangeText={t => setPropertyArea(t)}
							/>
							<Text style={styles.inputPlaceholder}>
								Enter property Description
							</Text>
							<Input
								style={styles.input}
								placeholder='Property Description'
								size='large'
								multiline={true}
								textStyle={{ minHeight: 200 }}
								value={propertyDescript}
								onChangeText={t => setPropertyDescrip(t)}
							/>

							<Text style={styles.inputPlaceholder}>Select Bedrooms</Text>
							<Layout style={styles.selectContainer}>
								<Picker
									style={styles.bedroomPicker}
									selectedValue={selectBedrooms}
									onValueChange={(itemValue, itemIndex) =>
										setSelectBedrooms(itemValue)
									}>
									<Picker.Item key='0' label='0' value='0' />
									<Picker.Item key='1' label='1' value='1' />
									<Picker.Item key='2' label='2' value='2' />
									<Picker.Item key='3' label='3' value='3' />
									<Picker.Item key='4' label='4' value='4' />
									<Picker.Item key='5' label='5' value='5' />
									<Picker.Item key='6' label='6' value='6' />
									<Picker.Item key='7' label='7' value='7' />
									<Picker.Item key='8' label='8' value='8' />
									<Picker.Item key='9' label='9' value='9' />
								</Picker>
							</Layout>
							<Text style={styles.inputPlaceholder}>Select Bathrooms</Text>
							<Layout style={styles.selectContainer}>
								<Picker
									style={styles.bedroomPicker}
									selectedValue={selectBathrooms}
									onValueChange={(itemValue, itemIndex) =>
										setSelectedBathrooms(itemValue)
									}>
									<Picker.Item key='0' label='0' value='0' />
									<Picker.Item key='1' label='1' value='1' />
									<Picker.Item key='2' label='2' value='2' />
									<Picker.Item key='3' label='3' value='3' />
									<Picker.Item key='4' label='4' value='4' />
									<Picker.Item key='5' label='5' value='5' />
									<Picker.Item key='6' label='6' value='6' />
									<Picker.Item key='7' label='7' value='7' />
									<Picker.Item key='8' label='8' value='8' />
									<Picker.Item key='9' label='9' value='9' />
								</Picker>
							</Layout>
							<Text style={styles.inputPlaceholder}>Select Garage</Text>
							<Layout style={styles.selectContainer}>
								<Picker
									style={styles.bedroomPicker}
									selectedValue={selectGarage}
									onValueChange={(itemValue, itemIndex) =>
										setSelectedGarage(itemValue)
									}>
									<Picker.Item key='0' label='0' value='0' />
									<Picker.Item key='1' label='1' value='1' />
									<Picker.Item key='2' label='2' value='2' />
									<Picker.Item key='3' label='3' value='3' />
									<Picker.Item key='4' label='4' value='4' />
									<Picker.Item key='5' label='5' value='5' />
									<Picker.Item key='6' label='6' value='6' />
									<Picker.Item key='7' label='7' value='7' />
									<Picker.Item key='8' label='8' value='8' />
									<Picker.Item key='9' label='9' value='9' />
								</Picker>
							</Layout>
							<Text style={styles.inputPlaceholder}>Select Features</Text>

							<Layout style={styles.featuresContainer} level='1'>
								<Toggle
									style={styles.toggle}
									checked={airCondition}
									onChange={() => setAirCondition(!airCondition)}>
									Air Conditioning
								</Toggle>
								<Toggle
									style={styles.toggle}
									checked={builtInRobes}
									onChange={() => setBuiltInRobes(!builtInRobes)}>
									Built In Robes
								</Toggle>
								<Toggle
									style={styles.toggle}
									checked={deck}
									onChange={() => setDeck(!deck)}>
									Deck
								</Toggle>
								<Toggle
									style={styles.toggle}
									checked={dishWasher}
									onChange={() => setDishwasher(!dishWasher)}>
									Dishwasher
								</Toggle>
								<Toggle
									style={styles.toggle}
									checked={garden}
									onChange={() => setGarden(!garden)}>
									Garden
								</Toggle>
								<Toggle
									style={styles.toggle}
									checked={fullyFenced}
									onChange={() => setFullyFenced(!fullyFenced)}>
									Fully Fenced
								</Toggle>
								<Toggle
									style={styles.toggle}
									checked={outdoorEntertainingArea}
									onChange={() =>
										setOutdoorEntertainingArea(!outdoorEntertainingArea)
									}>
									Outdoor entertaining area
								</Toggle>
								<Toggle
									style={styles.toggle}
									checked={floorboards}
									onChange={() => setFloorboards(!floorboards)}>
									Floorboards
								</Toggle>
								<Toggle
									style={styles.toggle}
									checked={balcony}
									onChange={() => setBalcony(!balcony)}>
									Balcony
								</Toggle>
								<Toggle
									style={styles.toggle}
									checked={builtInWardrobes}
									onChange={() => setBuildInWardrobes(!builtInWardrobes)}>
									Built-in wardrobes
								</Toggle>
								<Toggle
									style={styles.toggle}
									checked={courtyard}
									onChange={() => setCourtyard(!courtyard)}>
									Courtyard
								</Toggle>
							</Layout>
						</Layout>
						<Button
							disabled={isLoading}
							onPress={uploadAndSaveData}
							style={styles.chooseImageButton}>
							{isLoading ? SpinnerSmall : 'Save'}
						</Button>
					</Layout>
				</ScrollView>
				<Portal>
					<Modal
						visible={isError}
						onDismiss={hideModal}
						contentContainerStyle={styles.modal}>
						<Layout style={styles.modalContainer}>
							<Icon
								style={styles.icon}
								name='alert-triangle'
								fill={theme['color-danger-500']}
							/>
							<Text style={styles.errorText}>{error}</Text>

							<Layout style={styles.modalButtonContainer}>
								<Button onPress={hideModal} style={styles.modalButton}>
									Ok
								</Button>
							</Layout>
						</Layout>
					</Modal>
				</Portal>
			</SafeAreaView>
			<ExpoStatusBar style='dark' />
		</Provider>
	);
}

const styles = StyleSheet.create({
	SafeAreaView: {
		flex: 1,
		backgroundColor: '#fff',
	},

	ScrollView: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 16,
	},
	containerTitle: {
		flex: 1,
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#8F9BB3',
		fontFamily: 'Roboto_400Regular',
	},
	imageSlider: {
		flex: 1,
		marginTop: 20,
	},
	slideImageOne: {
		width: 200,
		height: 200,
		borderWidth: 3,
		borderColor: '#fff',
	},
	chooseImageButton: {
		marginTop: 20,
		width: 200,
	},
	imageSliderHelperText: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#8F9BB3',
		fontFamily: 'Roboto_400Regular',
		marginLeft: 5,
	},
	inputContainer: {
		marginTop: 40,
		flex: 1,
	},
	input: {
		width: '100%',
		marginBottom: 20,
	},
	inputPlaceholder: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#8F9BB3',
		fontFamily: 'Roboto_400Regular',
		marginLeft: 5,
		bottom: 5,
	},
	selectContainer: {
		position: 'relative',
		minHeight: 40,
		flex: 1,
		alignContent: 'center',
		justifyContent: 'center',
		color: '#fff',
		borderWidth: 1,
		borderColor: theme['color-primary-400'],
		marginBottom: 20,
	},
	bedroomPicker: {
		color: theme['color-primary-400'],
		fontSize: 12,
		fontWeight: 'bold',
		fontFamily: 'Roboto_400Regular',
	},
	featuresContainer: {
		flexDirection: 'row',
		marginTop: 10,
		flexWrap: 'wrap',
	},
	toggle: {
		marginBottom: 20,
	},
	modal: {
		width: '80%',
		alignSelf: 'center',
		borderRadius: 20,
		height: 600,
	},
	modalButtonContainer: {
		marginTop: 100,
		borderRadius: 20,
	},
	modalButton: {
		width: 250,
		alignSelf: 'center',
		marginBottom: 20,
	},
	icon: {
		width: 100,
		height: 100,
		alignSelf: 'center',
		marginTop: 20,
	},
	errorText: {
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',
		color: theme['color-info-800'],
		margin: 5,
	},
	modalContainer: {
		borderRadius: 20,
		padding: 10,
	},
});

const mapStateToProps = state => ({
	currentAgent: state.agentState.currentAgent,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			fetchAgentProperites,
		},
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(CreateProperties);
