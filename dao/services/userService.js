import userModel from "../models/users.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../config/jwtConfig.js";
import { createHash, isValidPassword } from "../../utils.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../utils.js";

const userService = {
    login: async (email, password) => {
        try {
            const user = await userModel.findOne({ email });

            if (!user) {
                throw new Error("Credenciales inválidas");
            }

            const validPassword = isValidPassword(user, password);

            if (!validPassword) {
                throw new Error("Credenciales inválidas");
            }

            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                user.role = "admin";
            }

            const access_token = generateToken(user);

            return { user, access_token };
        } catch (error) {
            throw error;
        }
    },

    getRegister: async () => {
        return "register";
    },

    register: async (userData) => {
        try {
            const { first_name, last_name, email, age, password, username } = userData;

            const existingUser = await userModel.findOne({ email });

            if (existingUser) {
                throw new Error("El usuario ya existe");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new userModel({
                first_name,
                last_name,
                email,
                age,
                username,
                password: hashedPassword,
                role: "user",
            });

            await newUser.save();

            const access_token = generateToken(newUser);

            return { newUser, access_token };
            
            res.redirect("/chat")
        } catch (error) {
            throw error;
        }
    },

    restorePassword: async (email, password) => {
        try {
            const user = await userModel.findOne({ email });

            if (!user) {
                throw new Error("Usuario no encontrado");
            }

            const newPass = createHash(password);

            await userModel.updateOne({ _id: user._id }, { $set: { password: newPass } });

            return "Password actualizado";
        } catch (error) {
            throw error;
        }
    },

    /*logout: async () => {
        try {
            return "Logout funciona";
        } catch (error) {
            throw error;
        }
    },*/
    logOut: async (req, res) => {
        try {
            res.clearCookie("jwtToken");
            
            req.session.destroy((err) => {
                if (err) {
                    console.error("Error al cerrar sesión:", err);
                    return res.status(500).json({ error: "Error interno del servidor" });
                }
                
                res.redirect("/login");
            });
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },
};

export default userService;
