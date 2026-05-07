import { Router } from 'express';
import { getGallery, addToGallery } from '../controllers/gallery.controller.ts';
import { authenticateAdmin } from '../middleware/auth.middleware.ts';

const router = Router();

router.get('/', getGallery);
router.post('/', authenticateAdmin, addToGallery);

export default router;
