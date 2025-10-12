import { Prisma, User } from "@prisma/client";
import { prisma } from "../config/db";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const register = async (payload: Prisma.UserCreateInput): Promise<User> => {
  const { email, password, ...rest } = payload;
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });
  if (existingUser) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "User already exists with this email"
    );
  }

  const hashedPassword = await bcrypt.hash(
    password as string,
    Number(process.env.BCRYPT_SALT_ROUND)
  );

  const registerData = {
    email,
    password: hashedPassword,
    ...rest,
  };

  const result = await prisma.user.create({ data: registerData });
  return result;
};
// -------------------------------------------------------------------------------------------
export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  // const isPasswordValid = await bcrypt.compare(password, user.password);
  // if (!isPasswordValid) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.picture,
  };
};


const logoutUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "User already exists with this email"
    );
  }
};

const getMe = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  return user;
};
const updateUserProfile = async (id: number, payload: Partial<User>) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exists");
  }

  const result = await prisma.user.update({
    where: { id },
    data: payload,
  });
  return result;
};

// ------------------------
const changePasswordUser = async (
  id: number,
  newPassword: string,
  oldPassword: string
) => {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User does not exists");
  }

  await prisma.user.update({
    where: { id },
    data: newPassword,
  });

  return user;
};

const deleteUser = async (id: number) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error(`User with id ${id} not found`);
  return prisma.user.delete({ where: { id } });
};

export const UserServices = {
  register,
  loginUser,
  logoutUser,
  getMe,
  updateUserProfile,
  changePasswordUser,
  deleteUser,
};
