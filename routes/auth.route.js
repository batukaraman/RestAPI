import express from 'express';
import {register, login} from '../controllers/auth.controller.js';
import {
    registerPasswordValidation,
    registerEmailValidation,
    loginPasswordValidation,
    loginEmailValidation
} from '../validations/auth.validation.js'

const router = express.Router();

router.post(
    '/register',
    [
        registerPasswordValidation,
        registerEmailValidation
    ],
    register);
router.post(
    '/login',
    [
        loginEmailValidation,
        loginPasswordValidation
    ],
    login);

export default router;