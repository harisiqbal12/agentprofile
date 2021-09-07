import React, { useState, useEffect } from 'react';
import { Layout, Text, Input, Button, Icon } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet, StatusBar, Image } from 'react-native';
import emailjs from 'emailjs-com';
import SpinnerSmall from './spinnerSmall';

import { default as theme } from '../theme/custom-theme.json';

const sendIcon = props => <Icon {...props} name='arrowhead-right-outline' />;

function Contact(props) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, SetMessage] = useState('');
	const [agentEmail] = useState(props.route.params.agentEmail);
	const [isLoading, setLoading] = useState(false);
	const [isErrorName, setErrorName] = useState(false);
	const [isErrorEmail, setIsErrorEmail] = useState(false);
	const [isErrorMessage, setIsErrorMessage] = useState(false);

	const [isErrorNameMessage, setIsErrorNameMessage] = useState('');
	const [isErrorMessageMessage, setIsErrorMessageMessage] = useState('');
	const [isErrorEmailMessage, setIsErrorEmailMessage] = useState('');

	useEffect(() => {
		emailjs.init('user_v98SPKBSm5pkRxGdX62Pk');
	}, []);

	const handleSendEmail = async () => {
		try {
			setLoading(true);
			let globalError = false;

			setErrorName(false);
			setIsErrorEmail(false);
			setIsErrorMessage(false);
			setIsErrorNameMessage('');
			setIsErrorMessageMessage('');
			setIsErrorEmailMessage('');

			if (!email.length > 0) {
				setIsErrorEmail(true);
				setIsErrorEmailMessage('Please Provide Email Field');
				setLoading(false);
				globalError = true;
			}

			if (!name.length > 0) {
				setErrorName(true);
				setIsErrorNameMessage('Please Provide Name Field');
				setLoading(false);
				globalError = true;
			}

			if (!message.length > 0) {
				setIsErrorMessage(true);
				setIsErrorMessageMessage('Please Provide Message Field');
				setLoading(false);
				globalError = true;
			}

			if (globalError) {
				return;
			}

			const status = await emailjs.send('gmail', 'template_1siuz9w', {
				message,
				agentEmail,
				name,
				email,
			});
			setLoading(false);
		} catch (err) {
			setLoading(false);
			setError(true);
			setErrorMessage('Invalid Values');
			console.log(err);
		}
	};

	return (
		<SafeAreaView style={styles.SafeAreaView}>
			<Layout style={styles.contactContainer}>
				<Layout style={styles.titleContainer}>
					<Image
						style={styles.image}
						source={require('../../assets/contact1.jpg')}
					/>
					<Text style={styles.title}>Contact</Text>
				</Layout>
				<Layout style={styles.inputContainer}>
					<Input
						value={agentEmail}
						disabled={true}
						placeholder='Agent Email'
						style={styles.input}
					/>
					<Input
						onChangeText={t => setEmail(t)}
						value={email}
						placeholder='Email'
						style={styles.input}
						status={isErrorEmail && 'danger'}
						label={isErrorEmailMessage}
					/>
					<Input
						onChangeText={t => setName(t)}
						value={name}
						placeholder='Name'
						style={styles.input}
						status={isErrorName && 'danger'}
						label={isErrorNameMessage}
					/>
					<Input
						status={isErrorMessage && 'danger'}
						label={isErrorMessageMessage}
						value={message}
						onChangeText={t => SetMessage(t)}
						multiline={true}
						placeholder='Message'
						style={styles.input}
						textStyle={{ minHeight: 90 }}
					/>
					<Button
						style={styles.Button}
						accessoryRight={!isLoading && sendIcon}
						onPress={handleSendEmail}>
						{isLoading ? <SpinnerSmall /> : 'Send'}
					</Button>
				</Layout>
			</Layout>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	SafeAreaView: {
		flex: 1,
		marginTop: StatusBar.currentHeight,
	},
	contactContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleContainer: {
		flex: 0.8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 30,
		color: theme['color-primary-400'],
	},
	inputContainer: {
		flex: 1,
		alignItems: 'center',
	},
	image: {
		width: 200,
		height: 200,
	},
	input: {
		width: 300,
		margin: 10,
	},
	Button: {
		width: 300,
	},
});

export default Contact;
