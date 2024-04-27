import mongoose from "mongoose";

const {Schema} = mongoose

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    age: Number,
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    cart:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cartsModel"
    },
  });

const userModel = mongoose.model("user", userSchema)

export default userModel