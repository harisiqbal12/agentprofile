import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firebase from 'firebase';

import LandingNavigation from './Landing/Landing';
import AppNavigation from './Homescreen/AppNavigator';
import Loader from '../components/Loader';

function Navigation() {
	const [loaded, setLoaded] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		return firebase.auth().onAuthStateChanged(user => {
			if (!user) {
				console.log('haris');
				setLoaded(true);
				setLoggedIn(false);
			} else {
				setLoaded(true);
				setLoggedIn(true);
			}
		});
	}, []);

	if (!loaded) {
		return <Loader />;
	}

	return (
		<NavigationContainer>
			{loggedIn ? <AppNavigation /> : <LandingNavigation />}
		</NavigationContainer>
	);
}

export default Navigation;
