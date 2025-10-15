import { prisma } from "../config/db";

export const ContactService = {
  createContact: async (data: { name: string; email: string; subject?: string; message: string }) => {
    return await prisma.contact.create({ data });
  },

  getAllContacts: async () => {
    return await prisma.contact.findMany({ orderBy: { createdAt: "desc" } });
  },

  getContactById: async (id: number) => {
    return await prisma.contact.findUnique({ where: { id } });
  },

  updateContactStatus: async (id: number, status: string) => {
    return await prisma.contact.update({ where: { id }, data: { status } });
  },

  deleteContact: async (id: number) => {
    return await prisma.contact.delete({ where: { id } });
  },
};
