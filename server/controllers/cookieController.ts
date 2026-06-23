import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

const cookieController = {
  /**
   * Set a signed JWT in an 'ssid' cookie.
   * @param _req - Express Request object
   * @param res - Express Response object
   * @param next - Next middleware function
   */
  setSSIDCookie: (_req: Request, res: Response, next: NextFunction): void => {
    const { user_id } = res.locals;

    // Sign a JWT containing the user_id, expires in 8 hours
    const token = jwt.sign({ user_id }, JWT_SECRET, { expiresIn: '8h' });

    // Store the token in the cookie
    res.cookie('ssid', token, {
      maxAge: 8 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return next();
  },

  /**
   * Verify the JWT from the 'ssid' cookie.
   * @param req - Express Request object
   * @param res - Express Response object
   * @param next - Next middleware function
   */
  verifySSIDCookie: (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.ssid;

    if (!token) {
      res.status(401).json({ error: 'No session found. Please log in.' });
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { user_id: number };
      res.locals.user_id = decoded.user_id;
      return next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid or expired session. Please log in.' });
    }
  },
};

export { cookieController };