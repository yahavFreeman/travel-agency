import { AppDataSource } from "../../data/data-source.js";
import { User } from "./entities/user.entity.js";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export async function login(email: string, password: string) {
  const user = await userRepository.findOne({ where: { email } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}

export async function signup(email: string, password: string, role = "user") {
  const existing = await userRepository.findOne({ where: { email } });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepository.create({ email, password: hashedPassword, role });
  await userRepository.save(user);
  return user;
}


async function findUserByEmail(email: string) {
  try {
    const user = await userRepository.findOne({ where: { email } });
    console.log("Found user:", user);
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
}
