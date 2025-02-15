import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
}

interface Methods {
  comparePassword( password:string ): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods> ({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  password: { type: String, required: true }
});


userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    throw error;
  }
  
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};


const UserModel = models.User || model("User", userSchema);


export default UserModel as Model<UserDocument, {}, Methods>;