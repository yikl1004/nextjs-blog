import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { firebaseClient } from '@backend/firebase-client';

const Login: React.FC = () => {
	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');

	const onChangeEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setEmail(value);
	}, []);

	return (
		<div>
			<Link href="/">
				<a>Go back to home page</a>
			</Link>
			<br />
			<input value={email} onChange={onChangeEmail} placeholder="Email" />
			<input type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" />
			<button
				onClick={async () => {
					await firebaseClient.auth().createUserWithEmailAndPassword(email, pass);
					window.location.href = '/';
				}}>
				Create account
			</button>
			<button
				onClick={async () => {
					await firebaseClient.auth().signInWithEmailAndPassword(email, pass);
					window.location.href = '/';
				}}>
				Log in
			</button>
		</div>
	);
};

export default Login;
