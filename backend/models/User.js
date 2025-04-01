import {Schema, model} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    // sparse:true to allow null values or non-existing fields yet checking for uniqueness
    googleId: { type: String, unique: true, sparse:true },
    githubId: { type: String, unique: true, sparse:true },
    name: { type: String },
    email: { type: String, unique: true },
    profileImage: { type: String },
    password: {type:String}
});

userSchema.pre("save", async function(next){
    try {
        if (this.isModified("password")) { // only hash if the password has been modified
          const hash = await bcrypt.hash(this.password, 12);
          this.password = hash;
        }
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.authenticate = async function(password){
    return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

export default User;
