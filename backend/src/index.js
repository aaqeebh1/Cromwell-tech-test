import express from 'express';
import { createUser, getUser, loginUser} from './api/user.js';
import authMiddleware from './api/auth.js';


const router = express.Router();

router.post('/users/register', createUser);
router.get('/users', authMiddleware, getUser);
router.post('/users/login', loginUser);

export default router;


