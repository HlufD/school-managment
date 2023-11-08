import prisma from "../../script";
import bcrypt from "bcrypt";
import { CustomError } from "../middlewares/error/customError";
interface body {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  picture: string;
  Role: string;
}

const adduserService = async function (body: body) {
  const slat = await bcrypt.genSalt(10);
  const hashedPwd = await bcrypt.hash(body.password, slat);
  body.password = hashedPwd;
  const existingUser = await prisma.user.findFirst({
    where: {
      username: body.username,
    },
  });
  if (existingUser) {
    throw new CustomError("user already existed", 400, "Bad Request");
  }
  const user = await prisma.user.create({ data: body });
  return user;
};
const loginServive = function () {};

export { adduserService, loginServive };
