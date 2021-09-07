import React, { useEffect, useState } from 'react';
import { Input, Layout, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ImagePicker from 'expo-image-picker';
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	Image,
	ScrollView,
} from 'react-native';

import { fetchAgents, fetchCurrentAgent } from '../redux/actions/index';
import firebase from 'firebase';
import 'firebase/firebase-storage';
import { default as theme } from '../theme/custom-theme.json';
import SpinnerSmall from './spinnerSmall';

function AgentProfile(props) {
	const { currentAgent } = props.route.params;

	const [isLoading, setLoading] = useState(false);
	const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [mobile, setMobile] = useState('');
	const [office, setOffice] = useState('');
	const [whatsApp, setWhatsapp] = useState('');
	const [about, setAbout] = useState('');
	const [image, setImage] = useState(null);
	const [profileURL, setProfileURL] = useState(
		'https://firebasestorage.googleapis.com/v0/b/agentprofile-e89e2.appspot.com/o/data%2FMen-Profile-Image.png?alt=media&token=e67c9e7b-e9b4-46cc-b7b6-e78e86f68851'
	);

	useEffect(() => {
		if (currentAgent) {
			setDisplayName(currentAgent.displayName);
			setEmail(currentAgent.email);
			setMobile(currentAgent.mobile);
			setOffice(currentAgent.office);
			setWhatsapp(currentAgent.whatsApp);
			setAbout(currentAgent.about);
			setProfileURL(currentAgent.profileURL);
		}

		(async () => {
			try {
				const galleryStatus =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				setHasGalleryPermission(galleryStatus.status === 'granted');
			} catch (err) {}
		})();
	}, []);

	const handleSaveButton = async profiileImageURL => {
		const currentUser = firebase.auth().currentUser;
		const agentsRef = firebase.database().ref('agents');
		setLoading(true);

		try {
			if (!currentAgent) {
				const randomNumber = Math.floor(Math.random() * 23 + 1);
				const bgImageUrl = await firebase
					.storage()
					.ref()
					.child(`/app-images/${randomNumber}.jpg`)
					.getDownloadURL();

				// create new
				await agentsRef.child(currentUser.uid).set({
					displayName,
					email,
					mobile,
					office,
					whatsApp,
					about,
					bgImageUrl,
					profileURL: profiileImageURL ? profiileImageURL : profileURL,
					listingProperties: 0,
				});

				return;
			}

			await agentsRef.child(currentUser.uid).update({
				displayName,
				email,
				mobile,
				office,
				whatsApp,
				about,
				profileURL: profiileImageURL ? profiileImageURL : profileURL,
			});



			await props.fetchAgents();
			await props.fetchCurrentAgent();
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const loadGallery = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.4,
			});


			if (!result.cancelled) {
				setImage(result.uri);
				setProfileURL(result.uri);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const taskError = snapshot => {
		console.log(snapshot);
	};

	const taskProgress = snapshot => {
	};

	const handleUploadImage = async () => {
		try {
			if (image) {
				setLoading(true);

				const response = await fetch(image);
				const blob = await response.blob();
				const task = firebase
					.storage()
					.ref()
					.child(
						`profile/${firebase.auth().currentUser.uid}/${Math.random().toString(
							36
						)}`
					)
					.put(blob);

				const taskCompleted = () => {
					task.snapshot.ref.getDownloadURL().then(snapshot => {
						handleSaveButton(snapshot);
					});
				};

				task.on('state_changed', taskProgress, taskError, taskCompleted);
			} else {
				handleSaveButton();
			}

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
		<SafeAreaView style={styles.safeAreaView}>
			<ScrollView style={styles.ScrollView}>
				<Layout style={styles.contentContainer}>
					<Image
						style={styles.imageCover}
						source={{
							uri: profileURL,
						}}
					/>
					<Button onPress={loadGallery} style={styles.btnSave}>
						Upload Image
					</Button>
					<Input
						value={displayName}
						style={styles.input}
						size='large'
						placeholder='Display Name'
						onChangeText={t => setDisplayName(t)}
					/>
					<Input
						value={email}
						style={styles.input}
						size='large'
						placeholder='Email'
						onChangeText={t => setEmail(t)}
					/>
					<Input
						value={mobile}
						style={styles.input}
						size='large'
						placeholder='Mobile'
						onChangeText={t => setMobile(t)}
					/>
					<Input
						value={office}
						style={styles.input}
						size='large'
						placeholder='Office'
						onChangeText={t => setOffice(t)}
					/>
					<Input
						value={whatsApp}
						style={styles.input}
						size='large'
						placeholder='WhatsApp'
						onChangeText={t => setWhatsapp(t)}
					/>
					<Input
						size='large'
						multiline={true}
						textStyle={{ minHeight: 100 }}
						placeholder='About'
						style={styles.input}
						value={about}
						onChangeText={t => setAbout(t)}
					/>
					<Button
						disabled={isLoading}
						onPress={handleUploadImage}
						style={styles.btnSave}>
						{isLoading ? <SpinnerSmall /> : 'Save'}
					</Button>
				</Layout>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		backgroundColor: '#fff',
	},
	contentContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 25,
	},
	input: {
		marginBottom: 10,
	},
	btnSave: {
		width: 150,
		marginTop: 10,
		marginBottom: 20,
	},
	imageCover: {
		width: 150,
		height: 150,
		borderWidth: 4,
		borderColor: theme['color-primary-500'],
		marginTop: 20,
	},
	ScrollView: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	backgroundImage: {
		zIndex: -1,
		aspectRatio: 16 / 9,
		height: 200,
		position: 'relative',
		top: 200,
	},
});

const mapDispatchtoProps = dispatch =>
	bindActionCreators({ fetchAgents, fetchCurrentAgent }, dispatch);

export default connect(null, mapDispatchtoProps)(AgentProfile);
