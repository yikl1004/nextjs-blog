import https from 'https';
import http from 'http';
import fs from 'fs';
import next from 'next';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import dotenv from 'dotenv';

// eslint-disable-next-line
// const redirector = require('redirect-https');

const dev = process.env.NODE_ENV !== 'production';
// const prod = process.env.NODE_ENV === 'production';
const PORT1 = 80;
const PORT2 = 3030;
const HOST = dev ? 'localhost' : '';

dotenv.config();

const app = next({
	dev,
	customServer: true,
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
			res.redirect(`https://${HOST}:${PORT1}${req.url}`);
		} else {
			next();
		}
	});

	server.all('*', (req, res) => {
		const parsedUrl = new URL(req.url || '', 'https://localhost:3030');

		// @ts-ignore
		return handle(req, res, parsedUrl);
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

	https.createServer(httpsOptions, server).listen(PORT1);
	http.createServer(server).listen(PORT2);
});
