import express from "express";
import ProductController from "../dao/controllers/productController.js";

const productRouter = express.Router();
const productController = new ProductController();

const errorHandler = (res, error) => {
    console.error(error);
    res.status(500).send("Error interno del servidor");
};

productRouter.get("/", async (req, res) => {
    try {
        const { limit = 4, page = 1, brand } = req.query;
        const products = await productController.getProducts({ limit, page, brand });
        res.json(products);
    } catch (error) {
        errorHandler(res, error);
    }
});

productRouter.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productController.getProductById(pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        errorHandler(res, error);
    }
});

productRouter.get("/brand/:brand", async (req, res) => {
    try {
        const { brand } = req.params;
        const products = await productController.getByBrand(brand);
        res.json(products);
    } catch (error) {
        errorHandler(res, error);
    }
});

productRouter.post("/", async (req, res) => {
    try {
        const product = await productController.addProduct(req.body);
        res.json(product);
    } catch (error) {
        errorHandler(res, error);
    }
});

productRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        await productController.updateProduct(pid, req.body);
        res.send("Producto actualizado correctamente");
    } catch (error) {
        errorHandler(res, error);
    }
});

productRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        await productController.deleteProductById(pid);
        res.send("Producto eliminado correctamente");
    } catch (error) {
        errorHandler(res, error);
    }
});

export { productRouter };
