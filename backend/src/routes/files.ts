import { Router } from 'express';
import { uploadFiles, getFile } from '../controllers/upload-files';

import { uploadsMiddleware } from '../middlwares/upload-middleware';

const fileRouter = Router();

fileRouter.post('/files', uploadsMiddleware, uploadFiles);
fileRouter.get('/files/:filename', getFile);

export default fileRouter;
