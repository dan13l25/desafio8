import express from 'express';
import userController from '../dao/controllers/userController.js';
import passport from 'passport';



const userRouter = express.Router();

userRouter.get("/login", userController.getLogin);
userRouter.post("/login", userController.login);
userRouter.get("/current", passport.authenticate('current', { session: false }), (req, res) => {
  res.json(req.user);
});

//metodo passport
/*userRouter.get("/faillogin", async (req, res) => {
    console.log("error");
    res.send({ error: "Fallo" });
});
userRouter.post('/login', passport.authenticate('login',{failureRedirect:"/faillogin"}),
async(req,res)=>{
if(!req.user)return res.status(400).send('error')
req.session.user = {
  first_name: req.user.first_name,
  last_name: req.user.last_name,
  email: req.user.email,
  age: req.user.age,
};
 res.status(200).send({ status: "success", payload: req.user });
})*/

userRouter.get("/register", userController.getRegister);
userRouter.post("/register", userController.register); 

//metodo con passport
/*userRouter.post("/register", userController.register); 
userRouter.get("/failregister", async (req, res) => {
    console.log("error");
    res.send({ error: "Falló" });
  });*/ 

userRouter.get("/logout", userController.logOut);
userRouter.post("/logout", userController.logOut);
userRouter.get("/restore", (req, res) => {
    res.render("restore");
});
userRouter.post("/restore", userController.restore);

userRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
  }
);

userRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
   
    res.redirect("/chat"); 
  }
);

export default userRouter;