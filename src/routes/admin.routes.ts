import { Router } from 'express';
import { handleUpload, uploadMiddleware } from '../controllers/admin.controller.ts';
import { authenticateAdmin } from '../middleware/auth.middleware.ts';

const router = Router();

router.post('/upload', authenticateAdmin, uploadMiddleware, handleUpload);

export default router;
