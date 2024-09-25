import { UserTable } from "../schemas/user";
import { db } from "../drizzle/db";
import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import userTableValidator from "../utils/validatorSchemas/userTableValidator";
import { UserData } from "../utils/types/types";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await db.select().from(UserTable);

    if (!result.length) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(result);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getOneUser = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  if (!id) {
    return res.status(400).json({ message: "Invalid user id" });
  }

  try {
    const result = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, id));
    if (!result.length) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(result[0]);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createUser = async (req: Request, res: Response) => {
  const userData: UserData = req.body;

  const validationResult = userTableValidator.safeParse(userData);

  if (!validationResult.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: validationResult.error.errors,
    });
  }

  try {
    const validatedData = validationResult.data;

    const newUser = await db
      .insert(UserTable)
      .values(validatedData)
      .returning();

    res.status(200).json(newUser[0]);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  try {
    const deletedUser = await db
      .delete(UserTable)
      .where(eq(UserTable.id, id))
      .returning();

    if (!deletedUser.length) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Successfully delete" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const data: UserData = req.body;
  try {
    const updatedUser = await db
      .update(UserTable)
      .set(data)
      .where(eq(UserTable.id, id))
      .returning();

    if (!updatedUser.length) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(updatedUser[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
};

export { getAllUsers, getOneUser, createUser, deleteUser, updateUser };
