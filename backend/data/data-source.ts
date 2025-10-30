import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../api/user/entities/user.entity.js";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? "5432"),
  username: process.env.DB_USERNAME ?? "",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "",
  synchronize: false,
  logging: false,
  entities: [User],
});

   AppDataSource.initialize()
     .then(() => {
       console.log("✅ Database connection established!");
     })
     .catch((err) => {
       console.error("❌ Database connection error:", err);
     });
