import jwt from "jsonwebtoken"
import { PRIVATE_KEY } from "../utils.js"



  export const generateToken  = (user) =>{
    const token = jwt.sign ({ _id: user._id}, PRIVATE_KEY,{expiresIn:"5m"})
    return token 
  }
  
  export const authToken = (req,res,next) =>{
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(401).send({status: "error", message: "no autorizado"}) 
    console.log(authHeader)
  
    const token = authHeader.split(" ")[1]
  
    jwt.verify(token, PRIVATE_KEY,(error, credentials)=>{
      console.log(error)
      if(error)  return res.status(401).send({status: "error", message: "no autorizado"}) 
      req.user = credentials.user
      next()
    }) 
  }