import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Missing username or password',
      });
    }

    if (
      username !== process.env.SIMPLESHOP_USERNAME ||
      password !== process.env.SIMPLESHOP_PASSWORD
    ) {
      return res.status(401).json({
        error: 'Invalid username or password',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Login successful',
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export default login;
