import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
// import { useReducerAsync } from 'use-reducer-async';
import { firebaseClient as firebase, auth } from '@backend/firebase-client';

const Home: React.FC<{
	allPostsData: { id: string; date: string; title: string }[];
}> = ({ allPostsData }) => {
	const login = React.useCallback(() => {
		//인증서비스 제공업체설정
		const provider = new auth.GithubAuthProvider();

		//로그인창 호출
		// firebase.auth().signInWithPopup(authProvider);

		//공식API 활용 예제
		auth()
			.signInWithPopup(provider)
			.then(function (result) {
				console.log(result);
				// const token = result.credential?.accessToken;
				// const user = result.user;
			})
			.catch(function (error) {
				console.log(error);
				// const errorCode = error.code;
				// const errorMessage = error.message;
				// const email = error.email;
				// const credential = error.credential;
			});
	}, []);
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section>
				<button type="button" onClick={login}>
					로그인
				</button>
			</section>
			<section>
				<ul>
					<li>
						<Link href="/posts/pre-rendering">pre-rendering</Link>
					</li>
					<li>
						<Link href="/posts/ssg-ssr">ssg-ssr</Link>
					</li>
				</ul>
			</section>
		</Layout>
	);
};

export default Home;

export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
}
