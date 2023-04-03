import { Router } from 'express';
import { uploadFiles } from '../controllers/upload-files';

import { uploadsMiddleware } from '../middlwares/upload-middleware';

const router = Router();

router.post('/', uploadsMiddleware, uploadFiles);

export default router;
