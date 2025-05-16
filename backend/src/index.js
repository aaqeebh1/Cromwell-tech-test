import express from 'express';
import { createUser, getUser, loginUser} from './api/user.js';


const router = express.Router();

router.post('/users/register', createUser);
router.get('/users/:id', getUser);
router.post('/users/login', loginUser);

export default router;


