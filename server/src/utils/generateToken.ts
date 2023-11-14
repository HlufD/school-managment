import jwt, { Secret } from "jsonwebtoken";

interface user {
  id: string;
  username: string;
}

const generateToken = (user: user) => {
  return jwt.sign(user, process.env.jwt_sec as Secret, {
    expiresIn: "35s",
  });
};

export { generateToken };
