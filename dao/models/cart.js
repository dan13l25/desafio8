import mongoose from "mongoose";
const { Schema } = mongoose;

const collection = "Carts";

const schema = new Schema({

    quantity: {
        type: Number,
        min: 1,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            productQuantity: Number,
            productPrice: Number,
            productTotal: Number,
        }
    ],
});

const cartsModel = mongoose.model(collection, schema);

export default cartsModel;