import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import {
	useFonts as useRoboto,
	Roboto_400Regular,
} from '@expo-google-fonts/roboto';
import { StyleSheet, LogBox } from 'react-native';

import { default as theme } from './src/theme/custom-theme.json';
import Navigation from './src/navigation/index';
import { store } from './src/redux/reducers/index';

// ignoring warnings
LogBox.ignoreLogs(['Setting a timer for a long period of time']);

const firebaseConfig = {
	apiKey: 'AIzaSyAbmZOPMK16pqVLXNthiCWJLff7CdCa2Qo',
	authDomain: 'agentprofile-e89e2.firebaseapp.com',
	databaseURL:
		'https://agentprofile-e89e2-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'agentprofile-e89e2',
	storageBucket: 'agentprofile-e89e2.appspot.com',
	messagingSenderId: '199120366658',
	appId: '1:199120366658:web:f2661133ebcf439e3191db',
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export default function App() {
	const [fontLoaded] = useRoboto({ Roboto_400Regular });

	if (!fontLoaded) {
		return null;
	}
	return (
		<>
			<Provider store={store}>
				<IconRegistry icons={EvaIconsPack} />
				<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
					<Navigation />
					<StatusBar style='light' />
				</ApplicationProvider>
			</Provider>
		</>
	);
}
