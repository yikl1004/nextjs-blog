import { createSecureServer } from 'http2';
import { createServer } from 'http';
import fs from 'fs';
import next from 'next';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import dotenv from 'dotenv';

const dev = process.env.NODE_ENV !== 'production';
// const prod = process.env.NODE_ENV === 'production';
const PORT1 = 80;
const PORT2 = 3000;

dotenv.config();

const app = next({
	dev,
});
const handle = app.getRequestHandler();
const httpsOptions = {
	key: fs.readFileSync('./cert/localhost.key'),
	cert: fs.readFileSync('./cert/localhost.crt'),
};

app.prepare().then(() => {
	const server = express();

	server.use(morgan('dev'));
	server.use(express.json());
	server.use(express.urlencoded({ extended: true }));
	server.use(cookieParser(process.env.COOKIE_SECRET));
	server.use((req, res, next) => {
		console.log(1111);
		if (!req.secure) {
			res.redirect(`https://localhost:${PORT2}${req.url}`);
		} else {
			next();
		}
	});
	server.use(
		expressSession({
			resave: false,
			saveUninitialized: false,
			secret: process.env.COOKIE_SECRET || '',
			cookie: {
				httpOnly: true,
				secure: false,
			},
		})
	);

	server;
	// createServer((req, res) => {
	// 	const parsedUrl = new URL(req.url || '', `https://localhost:${PORT2}`);

	// }).listen(PORT2, () => {
	// 	console.log(`> Ready on http://localhost:${PORT2}`);
	// });

	createSecureServer(httpsOptions, server, (req, res) => {
		const parsedUrl = new URL(req.url || '', 'https://localhost:3060');
		// @ts-ignore
		handle(req, res, parsedUrl);
	}).listen(PORT1, () => {
		console.log('running ssl');
		console.log(`next + express running on port ${PORT1}`);
	});
});
