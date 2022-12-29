import { Router, Request, Response } from 'express';
const router = Router();
import User from './../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';

import { check, ValidationError, validationResult } from 'express-validator';

interface errorFormatterProps {
  param: string;
  msg: any;
  nestedErrors?: unknown[] | undefined;
  location?: any;
  value?: any;
}

router.post(
  '/registration',
  [
    check('email', 'Incorrect email').isEmail(),
    check(
      'password',
      'password must be longer than 3 and shorter than 12'
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errorFormatter = (props: errorFormatterProps) => {
        return `${props.msg}`;
      };
      const result = validationResult(req).formatWith(errorFormatter);
      if (!result.isEmpty()) {
        return res
          .status(400)
          .json({ message: 'Uncorrect request', errors: result.array() });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exists` });
      }

      const hashPassword = await bcrypt.hash(password, 8);
      const user = new User({ email, password: hashPassword });
      await user.save();
      return res.json({ message: 'User was created' });
    } catch (error) {
      console.log(error);
    }
  }
);

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: `User not found` });
    }

    const isPassValid = bcrypt.compareSync(password, user.password!);

    if (!isPassValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, config.get('secretKey'), {
      expiresIn: '1h',
    });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
