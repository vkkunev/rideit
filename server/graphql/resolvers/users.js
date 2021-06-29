const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
    return token;
}

module.exports = {
    Mutation: {
        register: async (data, args, ctx, info) => {
            let { username, password, confirmPassword } = data;

            if (username.trim() === '') {
                return {
                    error: 'Username is mandatory'
                }
            }

            if (password === '') {
                return {
                    error: 'Password is mandatory'
                }
            }

            if (confirmPassword !== password) {
                return {
                    error: 'Passwords does not match'
                }
            }

            const user = await User.findOne({ username });

            if (user) {
                return {
                    error: 'Usernme already exists'
                }
            }

            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                password
            })

            const response = await newUser.save();

            const token = generateToken(response);

            return {
                ...response._doc,
                id: response._id,
                token
            }
        },

        login: async (data, args, ctx, info) => {

            const { username, password } = data;

            if (username === '' || password === '') {
                return {
                    error: 'Enter username and password'
                }
            }

            const user = await User.findOne({ username });

            if (!user) {
                return {
                    error: 'Wrong username or password'
                }
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return {
                    error: 'Wrong username or password'
                }
            }

            const token = generateToken(user);
            

            return {
                ...user._doc,
                id: user._id,
                token
            }
        }
    }
}