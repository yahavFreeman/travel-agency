import type { Request, Response } from "express";
import { login, signup } from "./user.service.js";

export function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = login(email, password);
    res.send(result);
}

export async function signupUser(req: Request, res: Response) {
    const { email, password, role } = req.body;
    try {
        const user = await signup(email, password, role);
        res.status(201).send(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({ message: error.message });
        } else {
            res.status(400).send({ message: String(error) });
        }
    }  
}
    