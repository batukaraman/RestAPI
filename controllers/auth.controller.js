import {Result, validationResult} from "express-validator"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res) {
    try {
        const errors = validationResult(req)
        
        if (errors.isEmpty()) {
            const {fullname, email, password} = req.body;
            
            const userCheck = await User.findOne({email});
            if (userCheck) return res.status(500).send({errors: ["Bu e-poastayı kullanan bir kullanıcı zaten var."]});

            const passwordHash = await bcrypt.hash(password, 12);

            const user = await User.create({
                fullname,
                email,
                password: passwordHash
            })

            const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '1h'});
            
            res.status(200).send({
                status: 'OK',
                user,
                token
            })
        }
        else {
            res.status(500).send({
                errors: errors.array().map((error) => {return error.msg})
            })
        }
    } catch (error) {
        return res.status(500).send({errors: [error.message]});
    }
}

export async function login(req, res) {
    try {
        const errors = validationResult(req)
        
        if (errors.isEmpty()) {
            const {email, password} = req.body;

            const user = await User.findOne({email});
            
            if (!user) return res.status(401).send({errors: ["Kullanıcı bulunamadı"]});

            const comparePassword = await bcrypt.compare(password, user.password);
            if (!comparePassword) return res.status(401).send({errors: ["Geçersiz şifre"]});

            const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '1h'});

            res.status(200).send({
                status: 'OK',
                user,
                token
            })
        }
        else {
            res.status(500).send({
                errors: errors.array().map((error) => {return error.msg})
            })
        }
    } catch (error) {
        return res.status(500).send({errors: [error.message]});
    }
}