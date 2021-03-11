import firebaseClient from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

/*
Copy/paste your *client-side* Firebase credentials below. 
To get these, go to the Firebase Console > open your project > Gear Icon >
Project Settings > General > Your apps. If you haven't created a web app
already, click the "</>" icon, name your app, and copy/paste the snippet.
Otherwise, go to Firebase SDK Snippet > click the "Config" radio button >
copy/paste.
*/
const CLIENT_CONFIG = {
	apiKey: 'AIzaSyDyXiVBkV93z9DlT1iYCxTz56J3nbn8Jn4',
	authDomain: 'normal-board.firebaseapp.com',
	projectId: 'normal-board',
	storageBucket: 'normal-board.appspot.com',
	messagingSenderId: '723879382605',
	appId: '1:723879382605:web:e606ff36a129c080df5604',
};

if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
	firebaseClient.initializeApp(CLIENT_CONFIG);
	firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
	// window.firebase = firebaseClient;
}

/**
 * @description 인증 처리를 위한 주소
 * @param { https://normal-board.firebaseapp.com/__/auth/handler }
 */

export const auth = firebaseClient.auth;
export { firebaseClient };
