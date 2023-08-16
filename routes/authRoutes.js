import express from 'express';
import {
    registerController,
    loginController,
    testController,
    forgotPasswordController,

} from '../controllers/authController.js';
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js';
//router object
const router = express.Router()

//routing

//Register || method post

router.post('/register', registerController)

//LOGIN  || method post
router.post('/login', loginController)


//FORGOT PASSWORD || POST

router.post('/forgot-password', forgotPasswordController)

//TEST ROUTES || GET
router.get('/test', requireSignIn, isAdmin, testController)


//protected route auth, can access this route only after signin
router.get('/user-auth', requireSignIn, (req, res) => {
    //using directly instead of contoller
    res.status(200).send({ ok: true });
})
export default router;