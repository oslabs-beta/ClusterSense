import { NextFunction, Request, Response } from 'express';

// Controller for handling cookie operations.
const cookieController = {

  /**
   * Set the user ID in an 'ssid' cookie.
   * @param _req - Express Request object
   * @param res - Express Response object
   * @param next - Next middleware function
   */
  setSSIDCookie: (_req: Request, res: Response, next: NextFunction): void => {
    const { user_id } = res.locals;

    // Set the 'ssid' cookie for 12 hours
    res.cookie('ssid', user_id, {
      maxAge: 12 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    
    return next();
  },
};

export { cookieController };
