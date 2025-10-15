import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppError from "../error/AppError";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { ContactService } from "./contactMe.services";

const createContact = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  if (!payload.name || !payload.email || !payload.message) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Name, email, and message are required");
  }

  const contact = await ContactService.createContact(payload);

  sendResponse(res, {
    success: true,
    message: "Contact created successfully",
    statusCode: StatusCodes.CREATED,
    data: contact,
  });
});

const getAllContacts = catchAsync(async (req: Request, res: Response) => {
  const contacts = await ContactService.getAllContacts();

  sendResponse(res, {
    success: true,
    message: "All contacts fetched successfully",
    statusCode: StatusCodes.OK,
    data: contacts,
  });
});

const getContactById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const contact = await ContactService.getContactById(Number(id));

  if (!contact) throw new AppError(StatusCodes.NOT_FOUND, "Contact not found");

  sendResponse(res, {
    success: true,
    message: "Contact fetched successfully",
    statusCode: StatusCodes.OK,
    data: contact,
  });
});

const updateContactStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) throw new AppError(StatusCodes.BAD_REQUEST, "Status is required");

  const updatedContact = await ContactService.updateContactStatus(Number(id), status);

  sendResponse(res, {
    success: true,
    message: "Contact status updated successfully",
    statusCode: StatusCodes.OK,
    data: updatedContact,
  });
});

const deleteContact = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedContact = await ContactService.deleteContact(Number(id));

  sendResponse(res, {
    success: true,
    message: "Contact deleted successfully",
    statusCode: StatusCodes.OK,
    data: deletedContact,
  });
});

export const ContactController = {
  createContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
};
