import { UserTable } from "../schemas/user";
import { db } from "../drizzle/db";
import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import userTableValidator from "../utils/validatorSchemas/userTableValidator";
import { UserData } from "../utils/types/types";
import { hashPassword, comparePassword } from "../utils/crypt/passwordCrypt";
import jwt from "jsonwebtoken";

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
  console.log(id);

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

    validatedData.password = await hashPassword(validatedData.password);

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "File upload failed, no file received" });
    }

    validatedData.avatar = req.file.path as string;

    const newUser = await db
      .insert(UserTable)
      .values(validatedData)
      .returning();

    res.status(201).json(newUser[0]);
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

const authenticateUser = async (req: Request, res: Response) => {
  const emailData: UserData = req.body;
  try {
    const user = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, emailData.email));

    if (!user.length) {
      return res.status(401).json({ error: "Invalid Email" });
    }
    const foundUser = user[0];

    const { username, avatar, email } = foundUser;

    if (!comparePassword(emailData.password, foundUser.password)) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }

    if (emailData.username !== username) {
      return res.status(401).json({ error: "Invalid Username or Password" });
    }
    const token = jwt.sign({ email: foundUser.email }, "secret");

    return res.status(200).json({ token, username, avatar, email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserStatus = async (req: Request, res: Response) => {
  try {
    const result = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, req.user.email));
    if (!result.length) {
      return res.status(404).json({ message: "Not found" });
    }
    const statusData = result[0];

    const { username, avatar } = statusData;
    res.status(200).json({ username,  avatar });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
  authenticateUser,
  getUserStatus,
};
