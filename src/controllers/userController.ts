import { UserTable } from "../schemas/user";
import { db } from "../drizzle/db";
import { Request, Response } from "express";
import { eq } from "drizzle-orm";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await db.select().from(UserTable)

        if (!result.length) {
            return res.status(404).json({message: "Not found"})
          }
          res.status(200).json(result);

    } catch (error: any) {
        console.error(error)
        res.status(500).json({message: "Server error"})
    }
}

const getOneUser = async (req: Request, res: Response) => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({message: "Invalid user id"})
    }

    try {
        const result = await db.select().from(UserTable).where(eq(UserTable.id, id))
        if (!result.length) {
            return res.status(404).json({message: "Not found"})
          }
          res.status(200).json(result);
    } catch (error: any) {
        console.error(error)
        res.status(500).json({message: "Server error"})
    }
}

export {
    getAllUsers,
    getOneUser
}