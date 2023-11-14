import { loginInput } from "../types";
import { prisma } from "../../script";
import { CustomError } from "../middlewares/error/customError";
import bcrypt from "bcrypt";

const loginService = async (user: loginInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { username: user.username },
  });
  if (!existingUser) {
    throw new CustomError("No user found", 404, "unregsiter log in ");
  }
  const isMatched = await bcrypt.compare(user.password, existingUser.password);
  if (!isMatched) {
    throw new CustomError(
      "username or password is incorect",
      404,
      "unregsiter log in "
    );
  }
  return existingUser;
};

export { loginService };
