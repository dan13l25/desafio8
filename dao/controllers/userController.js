import userModel from "../models/users.js";
import bcrypt from "bcrypt";
import { createHash, isValidPassword } from "../../utils.js";
import { generateToken } from "../../config/jwtConfig.js";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "../../utils.js";


const userController = {

    getLogin: async (req, res) => {
        res.render("login");
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await userModel.findOne({ email });

            if (!user) {
                return res.status(401).json({ error: "Credenciales invalidas" });
            }

            const validPassword = isValidPassword (user, password)

            if (!validPassword) {
                return res.status(401).json({ error: "Credenciales invalidas" });
            }

            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                user.role = "admin";
            }

            const access_token = generateToken (user)

            req.session.userId = user._id;

            req.session.user = user;

            req.session.isAuthenticated = true;

            console.log("Datos del login:", user, "token:", access_token)
            
            res.cookie("jwtToken", access_token, {
                httpOnly: true,
            }).json({ status: "Success", message: user, access_token });
                        
            
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    getRegister: async (req, res) => {
        res.render("register");
    },

    register: async (req, res, next) => {
        const { first_name, last_name, email, age, password, username } = req.body;
    
        try {
            const existingUser = await userModel.findOne({ email });
    
            if (existingUser) {
                return res.status(400).json({ error: "El usuario ya existe" });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const role = email === "adminCoder@coder.com" ? "admin" : "user";
    
            const newUser = new userModel({
                first_name: first_name,
                last_name: last_name,
                email: email,
                age: age,
                username: username,
                password: hashedPassword,
                role,
            });

            console.log(newUser)
            await newUser.save();

            const access_token = generateToken(newUser);

            req.session.userId = newUser._id;

            req.session.user = newUser;

            req.session.isAuthenticated = true;

            console.log("Datos del registro:", newUser, "token:", access_token);

            res.redirect("/product");
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            next(error);
        }
    },


    logOut: async (req, res) => {
        try {
            res.clearCookie("jwtToken");
            
            req.session.destroy((err) => {
                if (err) {
                    console.error("Error al cerrar sesión:", err);
                    return res.status(500).json({ error: "Error interno del servidor" });
                }
                
                res.redirect("/api/users/login");
            });
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    },

    getRestore: async (req, res) => {
        res.render("restore");
    },
    restore: async (req,res) =>{

        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        console.log(user);
        if (!user)
            return res
            .status(400)
            .send({ status: "error", message: "No se encuentra el user" });
        const newPass = createHash(password);

        await userModel.updateOne({ _id: user._id }, { $set: { password: newPass } });

        res.send({ status: "success", message: "Password actualizado" });
    },

    

}

export default userController;

