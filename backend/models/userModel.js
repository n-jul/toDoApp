import { Schema, mongoose } from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.statics.signup = async function (email, password, userName) {
  if (!email || !password || !userName) {
    throw new Error("All field must be filled");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("Email already exists");
  }


  const user = await this.create({ email, password, userName });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All field must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Invalid Email");
  }

  const match = bcrypt.compare(password.toString(), user.password);
  //check kro this kiske saath jaega

  if (!match) {
    throw new Error("Invalid password");
  }

  return user;
};

export const User = mongoose.model("User", userSchema);
