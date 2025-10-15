// import { Request, Response, NextFunction } from "express";
// import { getServerSession } from "next-auth/next";

// export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const session = await getServerSession(req, res, authOptions);

//     if (!session) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     (req as any).user = session.user; // attach user
//     next();
//   } catch (error) {
//     return res.status(500).json({ message: "Server error" });
//   }
// };
