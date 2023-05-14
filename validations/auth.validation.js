import {body} from 'express-validator';
import User from "../models/user.model.js";

export const registerEmailValidation = body('email')
            .notEmpty()
            .withMessage('E-posta alanı boş olamaz.')
            .isEmail()
            .withMessage('Geçerli bir e-posta adresi girin.')

export const registerPasswordValidation = body('password')
            .notEmpty()
            .withMessage('Şifre alanı boş olamaz.')
            .isLength({min: 6})
            .withMessage("Şifre en az 6 karakter olmalıdır.");


export const loginEmailValidation = body('email')
            .notEmpty()
            .withMessage('E-posta alanı boş olamaz.')
            .isEmail()
            .withMessage("E-posta formata uygun değil.")

export const loginPasswordValidation = body('password')
            .notEmpty()
            .withMessage('Şifre alanı boş olamaz.')