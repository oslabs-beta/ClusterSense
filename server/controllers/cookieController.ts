import { NextFunction, Request, Response } from 'express';

// setSSIDCookie - store the user id in a cookie
const cookieController = {
  setSSIDCookie: (_req: Request, res: Response, next: NextFunction): void => {
    const { user_id } = res.locals;
    console.log('inside cookiecontroller');
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
