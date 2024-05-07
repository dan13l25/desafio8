import express from "express";
import ProductController from "../dao/controllers/productController.js";
import Product from "../dao/models/product.js";

const productRouter = express.Router();
const productController = new ProductController();

const errorHandler = (res, error) => {
    console.error(error);
    res.status(500).send("Error interno del servidor");
};

productRouter.get("/", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 4;
        const page = parseInt(req.query.page) || 1;

        const options = {
            limit,
            page,
            lean: true
        };

        const products = await Product.paginate({}, options);

        const totalPages = Math.ceil(products.total / limit);
        const isValid = page >= 1 && page <= totalPages;

        products.isValid = isValid;

        return res.json(products);
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al recibir productos");
    }
});



productRouter.get("/:pid", productController.getProductById);


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
