import jwt from "jsonwebtoken";

interface body {
  username: string;
  first_name: string;
  last_name: string;
}

export const generateToke = async function (body: body) {
  const token = jwt.sign(body, `${process.env.jwt_sec}`);
  return token;
};
