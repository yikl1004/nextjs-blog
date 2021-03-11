import React from 'react';
import { useEffect } from 'react';
// import { firebaseClient } from '@backend/firebase-client';
// import antd from 'antd';

interface BoardItem {
	title: string;
	tags: string[];
	date: Date;
	userName: string;
	contents: string;
}

const Board: React.FC = () => {
	useEffect(() => {
		// const newPostKey = firebaseClient.database().ref().child('posts').push().key;
		// console.log(newPostKey);
		// const postData: BoardItem = {
		// 	title: '제목',
		// 	tags: ['aaa', 'bbb'],
		// 	date: new Date(),
		// 	userName: '천명기',
		// 	contents:
		// 		'Lorem ipsum dolor sit amet consectetur adipisicing elit. In, ullam accusantium, quam libero id est qui optio natus repellat facere aliquid cum minus cupiditate consequuntur odio saepe obcaecati vel porro?',
		// };
		// const updates: { [key: string]: any } = {};
		// updates['/board/' + newPostKey] = postData;
		// firebaseClient.database().ref().update(updates);
	}, []);

	return <div>board</div>;
};

export default Board;
