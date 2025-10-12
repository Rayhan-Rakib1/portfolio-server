import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { UserServices } from "./user.services";

// POST /register - Restricted (use for seeding; protect further in prod)
const registerUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await UserServices.register(body);
    sendResponse(res, {
      success: true,
      message: "User registered successfully",
      statusCode: 201,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

// POST /login
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await UserServices.loginUser(email, password);
  sendResponse(res, {
    success: true,
    message: "User logged in successfully",
    statusCode: 200,
    data: result, 
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  await UserServices.logoutUser(email, password);
  sendResponse(res, {
    success: true,
    message: "User logged in successfully",
    statusCode: 200,
    data: null,
  });
});

// GET /me - Protected
const getMe = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await UserServices.getMe(email);

  sendResponse(res, {
    success: true,
    message: "User profile fetched successfully",
    statusCode: 200,
    data: user,
  });
});

// PATCH /update-user - Protected
const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await UserServices.updateUserProfile(Number(id), payload);
  sendResponse(res, {
    success: true,
    message: "User profile updated successfully",
    statusCode: 200,
    data: { user: { id: result.id, email: result.email, name: result.name } },
  });
});

// POST /change-password - Protected
const changePasswordUser = catchAsync(async (req: Request, res: Response) => {
  const { id, oldPassword, newPassword } = req.body;
  const result = await UserServices.changePasswordUser(
    id,
    oldPassword,
    newPassword
  );
  sendResponse(res, {
    success: true,
    message: "Password changed successfully",
    statusCode: 200,
    data: result,
  });
});

// DELETE /delete-user - Protected
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.body;
  await UserServices.deleteUser(id);
  sendResponse(res, {
    success: true,
    message: "User account deleted successfully",
    statusCode: 204,
    data: null,
  });
});

// GET /stats - Protected
// const getUserStatsController = catchAsync(async (req: Request, res: Response) => {
//   if (!req.user?.id) {
//     throw new Error('Unauthorized access');
//   }
//   const stats = await getUserStats(req.user.id);
//   sendResponse(res, {
//     success: true,
//     message: 'User stats fetched successfully',
//     statusCode: 200,
//     data: { stats },
//   });
// });

export const UserController = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateUserProfile,
  changePasswordUser,
  deleteUser,
  // getUserStatsController,
};
