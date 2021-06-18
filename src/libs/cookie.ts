import jwt from "jsonwebtoken";
import cookie from "cookie";

const { JWT_SECRET } = process.env;
const DAY = 24 * 60 * 60;

export const generateCookie = (userId: string, expireTimeInDays: number) => {
    const token = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: expireTimeInDays + "d",
    });

    return cookie.serialize("token", token, {
      maxAge: expireTimeInDays * DAY,
      httpOnly: true,
    });
}

export const verifyCookie = (cookieHeader: any) => {
  const { token } = cookie.parse(cookieHeader);
  return jwt.verify(token, JWT_SECRET);
};
