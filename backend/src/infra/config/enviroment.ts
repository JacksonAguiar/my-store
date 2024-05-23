import dotenv from 'dotenv';

dotenv.config();
export const AppEnviroment = {
  JWT_SECRET: process.env.JWT_SECRET || "",
  DATABASE_URL: process.env.DATABASE_URL||"",
};
