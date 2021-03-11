import { createSecureServer, createServer } from 'http2';
import fs from 'fs';
import next from 'next';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
// import expressSession from 'express-session';
import dotenv from 'dotenv';

const dev = process.env.NODE_ENV !== 'production';
const PORT = 3060;
// const prod = process.env.NODE_ENV === 'production';

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
		if (!req.secure) {
			res.redirect(`https://localhost:${PORT}${req.url}`);
		} else {
			next();
		}
	});
	// server.use(
	// 	expressSession({
	// 		resave: false,
	// 		saveUninitialized: false,
	// 		secret: process.env.COOKIE_SECRET || '',
	// 		cookie: {
	// 			httpOnly: true,
	// 			secure: false,
	// 		},
	// 	})
	// );

	createSecureServer(httpsOptions, (req, res) => {
		const parsedUrl = new URL(req.url || '', 'https://localhost:3060');
		console.log(parsedUrl.protocol, req.method, parsedUrl.pathname);
		// @ts-ignore
		handle(req, res, parsedUrl);
	}).listen(PORT, () => {
		console.log('running ssl');
		console.log(`next + express running on port ${PORT}`);
	});
});
