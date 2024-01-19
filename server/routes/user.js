import express from 'express';

const router = express.Router();

import userControllers from '../controllers/user.js';

// routes
router.post('/register', userControllers.register);
router.post('/login', userControllers.login);
router.get('/logout', userControllers.logout);

export default router;
