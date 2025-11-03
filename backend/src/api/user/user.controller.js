import { login, signup } from "./user.service.js";

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);
        if (!result) {
            res.status(401).send({ message: 'Invalid email or password' });
        } else {
            res.send(result);
        }
    } catch (error) {
        res.status(500).send({ message: error.message || 'Internal server error' });
    }
}

export async function signupUser(req, res) {
    try {
        const { email, password, role } = req.body;
        const user = await signup(email, password, role);
        res.status(201).send(user);
    } catch (error) {
        if (error.message && error.message.includes('exists')) {
            res.status(400).send({ message: error.message });
        } else {
            res.status(500).send({ message: error.message || 'Internal server error' });
        }
    }
}
    