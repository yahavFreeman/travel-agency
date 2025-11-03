// user.service.ts
import bcrypt from "bcrypt";
import User from "../../models/user.js"; // your Sequelize model

export async function login(email, password) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isValid);
    if (!isValid) return null;

    // remove password from returned object
    const { password: _, ...userData } = user.toJSON();
    return userData;
  } catch (error) {
    throw error;
  }
}

export async function signup(email, password, role) {
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role });

    // Remove password before returning
    const { password: _, ...userData } = user.toJSON();
    return userData;
  } catch (error) {
    throw error;
  }
}

export async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    throw error;
  }
}
