import type { User } from "@/stores/user";
import { httpService } from "./http.service";

export async function login(email: string, password: string) {
    return httpService.post("/user/login", { email, password });
}

export async function signup(email: string, password: string, role: string): Promise<User> {
    return httpService.post("/user/signup", { email, password, role });
}