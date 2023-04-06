import { Router } from 'express';
import { uploadFiles, getFile } from '../controllers/upload-files';

import { uploadsMiddleware } from '../middlwares/upload-middleware';

const router = Router();

router.post('/files', uploadsMiddleware, uploadFiles);
router.get('/files/:filename', getFile);

export default router;
