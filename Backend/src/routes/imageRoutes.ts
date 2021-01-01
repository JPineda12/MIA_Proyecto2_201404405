import { Router, Request, Response, RouterOptions } from 'express';
import { multerConfig } from '../config/multer'
import multer from 'multer'
var path = require('path');
const routes = Router();


routes.post('/uploadImage', multer(multerConfig).single('file'), (request: Request, response: Response) => {

    return response.json({ Message: 'http://localhost:3020/' + request.file.filename })
})


export default routes;