import { Router } from "express";
import CartController from "../dao/controllers/cartController.js";

const cartRouter = Router();
const cartController = new CartController();

cartRouter.post("/", cartController.createCart)

cartRouter.get("/:cartId", cartController.getCartById);  

cartRouter.post("/:cartId/product/:productId", cartController.addProduct)

export { cartRouter };
