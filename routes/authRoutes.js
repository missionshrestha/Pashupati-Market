import express from 'express';
import { registerController, loginController, testController } from '../controllers/authController.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
//router object
const router = express.Router()

//routing

//Register || method post

router.post('/register', registerController)

//LOGIN  || method post
router.post('/login', loginController)

//TEST ROUTES || GET
router.get('/test', requireSignIn, isAdmin, testController)
export default router;