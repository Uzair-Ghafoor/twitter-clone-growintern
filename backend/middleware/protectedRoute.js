import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const protectedRoute = async (req, res, next) => {
  try {
    const cookie = req.cookies.access_token;
    if (!cookie) {
      return res.status(401).json({ error: 'Unauthorized: No Token Provided' });
    }
    const decoded = jwt.verify(cookie, process.env.JWT_SIGN);
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized: Invalid Token' });
    }
    const user = await User.findById(decoded._id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'Unauthorized: User Not Found' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('error in the protected route', error.message);
    res.status(500).json('internal server error');
  }
};
