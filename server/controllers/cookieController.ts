import { NextFunction, Request, Response } from "express";

// setSSIDCookie - store the user id in a cookie
const cookieController = {
    setSSIDCookie: (_req: Request, res: Response, next: NextFunction): void => {
        const { user_id } = res.locals;
        // send an ssid cookie back to client; the cookie will then be stored in browser for future http requests to server
        // console.log('res.locals', res.locals);
        console.log('userid', user_id);
        res.cookie("ssid", user_id, { httpOnly: true, sameSite: 'none', secure: true });
        console.log('after set cookie');
        // { httpOnly: true }
        //console.log(`res.cookie is: ${res.cookie}`);

        return next();
    },
};
export { cookieController };