// middleware/checkAdmin.ts
import { Request, Response, NextFunction } from 'express';
import User, { type IUser } from "../schema/User";

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  const currUser = await User.findById(req.user._id);
  if (!currUser) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (currUser.role !== 'ADMIN') {
    return res.status(403).json({ message: 'It is not allowed to you.' });
  }
  next();
};
