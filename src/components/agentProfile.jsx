import React, { useEffect, useState } from 'react';
import { Input, Layout, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	SafeAreaView,
	StyleSheet,
	StatusBar,
	Image,
	ScrollView,
} from 'react-native';
import firebase from 'firebase';
import { fetchAgents } from '../redux/actions/index';

function AgentProfile(props) {
	const { currentAgent } = props.route.params;

	const [displayName, setDisplayName] = useState('');
	const [email, setEmail] = useState('');
	const [mobile, setMobile] = useState('');
	const [office, setOffice] = useState('');
	const [whatsApp, setWhatsapp] = useState('');
	const [about, setAbout] = useState('');

	useEffect(() => {
		if (currentAgent) {
			setDisplayName(currentAgent.displayName);
			setEmail(currentAgent.email);
			setMobile(currentAgent.mobile);
			setOffice(currentAgent.office);
			setWhatsapp(currentAgent.whatsApp);
			setAbout(currentAgent.about);
		}
	}, []);

	const handleSaveButton = async () => {
		const currentUser = firebase.auth().currentUser;
		const agentsRef = firebase.database().ref('agents');

		try {
			if (!currentAgent) {
				// create new
				await agentsRef.child(currentUser.uid).set({
					displayName,
					email,
					mobile,
					office,
					whatsApp,
					about,
				});

				console.log('create done')
				return;
			}

			await agentsRef.child(currentUser.uid).update({
				displayName,
				email,
				mobile,
				office,
				whatsApp,
				about,
			});

			console.log('update done');
			props.fetchAgents();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<ScrollView style={styles.ScrollView}>
				<Layout style={styles.contentContainer}>
					<Image
						style={styles.imageCover}
						source={require('../../assets/profile-image.jpg')}
					/>
					<Button style={styles.btnSave}>Upload Image</Button>
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
					<Button onPress={handleSaveButton} style={styles.btnSave}>
						Save
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
		aspectRatio: 1 / 1,
		backgroundColor: 'transparent',
		borderWidth: 5,
		borderColor: '#CDCBCD',
		marginTop: 20,
		maxHeight: 150,
		marginBottom: 30,
	},
	ScrollView: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
});

const mapDispatchtoProps = dispatch =>
	bindActionCreators({ fetchAgents }, dispatch);

export default connect(null, mapDispatchtoProps)(AgentProfile);
