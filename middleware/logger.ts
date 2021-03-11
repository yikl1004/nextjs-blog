import { NextApiRequest, NextApiResponse } from 'next';
import morgan from 'morgan';

export default (req: NextApiRequest, res: NextApiResponse) => {
	console.log('@@@@ morgan');
	morgan('dev')(req, res, (error) => {
		console.error(error);
	});
};
