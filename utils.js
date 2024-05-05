
import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import dotenv from "dotenv"
import path from 'path';

dotenv.config({ path: path.resolve(fileURLToPath(import.meta.url), '../.env') });


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const DB_URL = process.env.MONGO_URL;
export const  PRIVATE_KEY = process.env.SECRET_JWT
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export const createHash=(password)=>bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => {
    console.log(
      `Datos a validar: user-password: ${user.password}, password: ${password}`
    );
    return bcrypt.compareSync(password, user.password);
  };



export default __dirname;
