import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
export const signup = async (req, res) => {
  try {
    const { email, password, username, fullName } = req.body;
    const emailregex = /^[^\s@]+@[^@]+\.[^@]+$/;
    if (!emailregex.test(email)) {
      return res.status(400).json({ error: 'invalid email format' });
    }
    const existedUser = await User.findOne({ username });
    if (existedUser) {
      return res.status(400).json({ error: 'Username is already taken' });
    }
    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
      return res.status(400).json({ error: 'email already exists' });
    }
    if (!fullName) {
      return res.status(400).json({ error: 'Full name is required' });
    }
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: 'Password must be atleast 6 characters long' });
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      fullName,
    });
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SIGN, {
      expiresIn: '15d',
    });
    const { password: pass, ...others } = newUser._doc;
    res
      .status(201)
      .cookie('access_token', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
      })
      .json(others);
  } catch (error) {
    console.log('error in the signup controller', error.message);
    res.status(500).json('internal server error');
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = bcryptjs.compareSync(
      password,
      user?.password || ''
    );
    if (!user) {
      return res.status(400).json({ error: 'Invalid email ' });
    }
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SIGN, {
      expiresIn: '15d',
    });
    const { password: pass, ...others } = user._doc;
    res
      .cookie('access_token', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
      })
      .status(200)
      .json(others);
  } catch (error) {
    console.log('error in the login controller', error.message);
    res.status(500).json('internal server error');
  }
};
export const logout = async (req, res) => {
  try {
    res
      .cookie('access_token', '', {
        maxAge: 0,
      })
      .status(200)
      .json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('error in the logout controller', error.message);
    res.status(500).json('internal server error');
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    console.log('error in the getMe controller', error.message);
    res.status(500).json('internal server error');
  }
};
