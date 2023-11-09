import prisma from "../../script";
import bcrypt from "bcrypt";
import { CustomError } from "../middlewares/error/customError";
import { generateToke } from "../utils/generateToke";
interface body {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  picture: string;
  Role: string;
}

interface loginCreidentials {
  username: string;
  password: string;
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

const loginServive = async function (
  body: loginCreidentials,
  user: body
): Promise<[isMatched: boolean, token: string]> {
  const { username, password } = body;
  const match = await bcrypt.compare(body.password, user.password);
  if (match) {
    const token = await generateToke(user);
    return [true, token];
  }
  return [false, ""];
};

export { adduserService, loginServive };
