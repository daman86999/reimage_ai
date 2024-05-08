import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  photo: string;
  planId?: number;
  creditBalance?: number;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  photo: {
    type: String,
    required: true,
  },
  planId: {
    type: Number,
    required: false,
    default: 1,
  },
  creditBalance: {
    type: Number,
    required: false,
    default: 10,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
