import React, { useCallback } from 'react';
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import { firebaseAdmin } from '@backend/firebase-admin';
import { firebaseClient } from '@backend/firebase-client';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	try {
		const cookies = nookies.get(ctx);
		console.log(JSON.stringify(cookies, null, 2));
		const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
		const { uid, email } = token;

		// the user is authenticated!
		// FETCH STUFF HERE

		return {
			props: { message: `Your email is ${email} and your UID is ${uid}.` },
		};
	} catch (err) {
		// either the `token` cookie didn't exist
		// or token verification failed
		// either way: redirect to the login page
		// either the `token` cookie didn't exist
		// or token verification failed
		// either way: redirect to the login page
		return {
			redirect: {
				permanent: false,
				destination: '/login',
			},
			// `as never` is required for correct type inference
			// by InferGetServerSidePropsType below
			props: {} as never,
		};
	}
};

const AuthenticatedPage = (
	props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
	const onClick = useCallback(() => {
		firebaseClient
			.auth()
			.signOut()
			.then(() => {
				window.location.href = '/';
			});
	}, []);

	return (
		<div>
			<p>{props.message ?? null}</p>
			<button onClick={onClick}>Sign out</button>
		</div>
	);
};

export default AuthenticatedPage;
