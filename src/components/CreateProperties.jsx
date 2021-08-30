import React, { useState, useEffect } from 'react';
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

function CreateProperties() {
	const [selectBedrooms, setSelectBedrooms] = useState('');
	const [selectBathrooms, setSelectedBathrooms] = useState('');
	const [selectGarage, setSelectedGarage] = useState('');

	const [airCondition, setAirCondition] = useState(false);
	const [deck, setDeck] = useState(false);
	const [builtInRobes, setBuiltInRobes] = useState(false);
	const [garden, setGarden] = useState(false);
	const [fullyFenced, setFullyFenced] = useState(false);
	const [outdoorEntertainingArea, setOutdoorEntertainingArea] = useState(false);
	const [floorboards, setFloorboards] = useState(false);
	const [dishWasher, setDishwasher] = useState(false);

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

	useEffect(() => {
		(async () => {
			try {
				const galleryPermission =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				setHasGalleryPermission(galleryPermission.status === 'granted');
			} catch (errr) {
				console.log(err);
			}
		})();
	}, []);

	const handleGallery = async imageNumber => {
		try {
			console.log('loading image gallery from create property');
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.4,
			});

			if (!result.cancelled) {
				if (imageNumber === 1) {
					console.log('\n\n\n\nsetting image one from gallery*** \n\n\n\n');
					setImageOne(result.uri);
					return;
				}
				if (imageNumber === 2) {
					console.log('\n\n\n\nsetting image two from gallery*** \n\n\n\n');
					setImageTwo(result.uri);
					return;
				}
				if (imageNumber === 3) {
					console.log('\n\n\n\nsetting image three from gallery*** \n\n\n\n');
					setImageThree(result.uri);
				}
			}
		} catch (err) {
			console.log('error here 59');
			console.log(err);
		}
	};

	const taskProgress = snapshot => {
		console.log(`transferred: ${snapshot.bytesTransferred}`);
	};
	const taskError = snapShot => {
		console.log('ERRORRR ' + snapShot);
	};

	const uploadAndSaveData = async () => {
		try {
			const images = [];
			const promises = [];
			const imageURLS = [];
			if (
				!imageOne.startsWith('file') ||
				!imageTwo.startsWith('file') ||
				!imageThree.startsWith('file')
			) {
				throw new Error('Plaese provide all images');
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
			images.push(imageOne, imageTwo, imageThree);
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
						console.log(`transferred: ${snapshot.bytesTransferred}`);
					},
					err => {
						console.log(err);
					},
					async () => {
						task.snapshot.ref.getDownloadURL().then(urls => {
							imageURLS.push(urls);
							console.log(imageURLS.length);
							if (imageURLS.length === 3) {
								console.log(true);
								handleSaveData(imageURLS);
							}
						});
					}
				);
			});

			Promise.all(promises)
				.then(() => {
					console.log('All Images Uploaded');
				})
				.catch(err => console.log(err));
		} catch (err) {
			console.log(err);
		}
	};

	const handleSaveData = async urls => {
		try {
			const currentUser = firebase.auth().currentUser;
			const propertyRef = firebase.database().ref('properties');

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
				features: {
					airCondition,
					builtInRobes,
					deck,
					dishWasher,
					garden,
					fullyFenced,
					outdoorEntertainingArea,
					floorboards,
				},
			});

			console.log('created');
		} catch (err) {
			console.log(err);
		}
	};

	if (hasGalleryPermission === null) {
		return <Layout />;
	}

	if (!hasGalleryPermission) {
		return <Text>Please provide Gallery Permission</Text>;
	}

	return (
		<SafeAreaView style={styles.SafeAreaView}>
			<ScrollView style={styles.ScrollView}>
				<Layout style={styles.container}>
					<Layout style={styles.containerTitle}>
						<Text style={styles.title}> Create Property</Text>
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
						<Text style={styles.inputPlaceholder}>Enter property price</Text>
						<Input
							style={styles.input}
							placeholder='Property Price'
							size='large'
							value={propertyPrice}
							onChangeText={t => setPropertyPrice(t)}
						/>
						<Text style={styles.inputPlaceholder}>
							Enter property Area in sq ft
						</Text>
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
								<Picker.Item key='1' label='1' value='1' />
								<Picker.Item key='2' label='2' value='2' />
								<Picker.Item key='3' label='3' value='3' />
								<Picker.Item key='4' label='4' value='4' />
								<Picker.Item key='5' label='5' value='5' />
								<Picker.Item key='6' label='6' value='6' />
								<Picker.Item key='7' label='7' value='7' />
								<Picker.Item key='8' label='8' value='8' />
								<Picker.Item key='9' label='9' value='9' />
								<Picker.Item key='10' label='10' value='10' />
							</Picker>
						</Layout>
						<Text style={styles.inputPlaceholder}>Select Bathrooms</Text>
						<Layout style={styles.selectContainer}>
							<Picker
								label='s'
								style={styles.bedroomPicker}
								selectedValue={selectBathrooms}
								onValueChange={(itemValue, itemIndex) =>
									setSelectedBathrooms(itemValue)
								}>
								<Picker.Item key='1' label='1' value='1' />
								<Picker.Item key='2' label='2' value='2' />
								<Picker.Item key='3' label='3' value='3' />
								<Picker.Item key='4' label='4' value='4' />
								<Picker.Item key='5' label='5' value='5' />
								<Picker.Item key='6' label='6' value='6' />
								<Picker.Item key='7' label='7' value='7' />
								<Picker.Item key='8' label='8' value='8' />
								<Picker.Item key='9' label='9' value='9' />
								<Picker.Item key='10' label='10' value='10' />
							</Picker>
						</Layout>
						<Text style={styles.inputPlaceholder}>Select Garage</Text>
						<Layout style={styles.selectContainer}>
							<Picker
								label='s'
								style={styles.bedroomPicker}
								selectedValue={selectGarage}
								onValueChange={(itemValue, itemIndex) =>
									setSelectedGarage(itemValue)
								}>
								<Picker.Item key='1' label='1' value='1' />
								<Picker.Item key='2' label='2' value='2' />
								<Picker.Item key='3' label='3' value='3' />
								<Picker.Item key='4' label='4' value='4' />
								<Picker.Item key='5' label='5' value='5' />
								<Picker.Item key='6' label='6' value='6' />
								<Picker.Item key='7' label='7' value='7' />
								<Picker.Item key='8' label='8' value='8' />
								<Picker.Item key='9' label='9' value='9' />
								<Picker.Item key='10' label='10' value='10' />
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
						</Layout>
					</Layout>
					<Button onPress={uploadAndSaveData} style={styles.chooseImageButton}>
						Save
					</Button>
				</Layout>
			</ScrollView>
		</SafeAreaView>
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
		borderColor: '#FF8E33',
		marginBottom: 20,
	},
	bedroomPicker: {
		color: '#FF8E33',
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
});

export default CreateProperties;
