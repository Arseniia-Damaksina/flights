import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import hashPassword from '../utils/hashPassword.js';

const userControllers = {
    register: async (req, res) => {
        try {
            const { email, password, confirmPassword } = req.body;

            // Check if the email already exists
            const userExists = await User.findOne({ email: email });

            if (userExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already exists'
                });
            } else {
                // Validate email and password
                if (
                    !validateEmail(email) ||
                    !validatePassword(password) ||
                    !matchPasswords(password, confirmPassword)
                ) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid email or password format'
                    });
                }

                // Hash the password
                const hashedPassword = hashPassword(password);
                // Create a new user
                const user = await User.create({
                    email,
                    password: hashedPassword
                });
                return res.status(201).json({
                    success: true,
                    message: `User with ${email} has been created`
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: err.message
            });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if the email exists
            const userExists = await User.findOne({ email: email });

            if (userExists) {
                // Compare passwords
                const isValid = await bcrypt.compare(
                    password,
                    userExists.password
                );
                if (isValid) {
                    // Generate a JWT token
                    const token = jwt.sign(
                        { user: userExists },
                        process.env.TOKEN_ACCESS_SECRET
                    );

                    // Set cookies
                    res.cookie('id', userExists._id, {
                        secure: true,
                        sameSite: 'None'
                    });
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'None'
                    });
                    return res.status(200).json({
                        success: true,
                        token: token,
                        id: userExists._id
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: 'Incorrect email or password'
                    });
                }
            }
        } catch (error) {
            return res
                .status(500)
                .json({ success: false, error: 'Login failed' });
        }
    },
    logout: async (req, res) => {
        // Clear cookies
        res.clearCookie('token');
        res.clearCookie('id');

        return res.status(200).json({
            success: true,
            message: 'The user is logged out'
        });
    }
};

export default userControllers;
