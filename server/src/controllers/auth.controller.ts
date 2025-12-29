import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { client } from "../db";
import { User } from "../models/User";

export async function register(req: Request, res: Response) {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const db = client.db("solo_leveling");
    const users = db.collection<User>("users");

    const existingUser = await users.findOne({ email: email.toLowerCase() });

    if (existingUser) {
        return res.status(409).json({ message: "Email already in use" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const now = new Date();

    const newUser: User = {
        email: email.toLowerCase(),
        passwordHash,

        level: 1,
        xp: 0,

        stats: {
            strength: 1,
            endurance: 1,
            agility: 1,
            vitality: 1,
            intelligence: 1,
        },

        createdAt: now,
        updatedAt: now,
    };

    const result = await users.insertOne(newUser);

    return res.status(201).json({
        id: result.insertedId,
        email: newUser.email,
        level: newUser.level,
        xp: newUser.xp,
    });
}


