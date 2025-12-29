import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;

    email: string;
    passwordHash: string;

    level: number;
    xp: number;

    stats: {
        strength: number;
        endurance: number;
        agility: number;
        vitality: number;
        intelligence: number;
    };

    createdAt: Date;
    updatedAt: Date;
}