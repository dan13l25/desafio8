import mongoose from "mongoose";

const DB_URL = "mongodb+srv://dan13l:dani06011998@cluster0.pm7efvk.mongodb.net/ecommerce";


const connectMongoDB = async () => {
    try {
      await mongoose.connect(DB_URL);
      console.log("MongoDB conectado");
    } catch (error) {
      console.error("Error al conectar a MongoDB:", error);
      process.exit(1);
    }
  };

  export default connectMongoDB