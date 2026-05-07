import { Router } from 'express';
import { getMenu, createMenuItem, getCategories } from '../controllers/menu.controller.ts';
import { authenticateAdmin } from '../middleware/auth.middleware.ts';

const router = Router();

router.get('/', getMenu);
router.get('/categories', getCategories);
router.post('/', authenticateAdmin, createMenuItem);

export default router;
