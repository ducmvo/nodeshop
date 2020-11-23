import { Request, Response, RequestHandler } from 'express';

export const get404: RequestHandler = (req, res) => {
	res.render('404', {pageTitle: "Not Found", path:''});
};

export const getPageNotFound = (req:Request, res:Response): void => {
	res.render('404', {pageTitle: "Not Found", path:''});
};
