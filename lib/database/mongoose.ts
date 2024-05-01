import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

/**
 * The function `connectToDatabase` connects to a MongoDB database using a cached connection if
 * available, otherwise creating a new connection.
 * @returns The `connectToDatabase` function returns the MongoDB connection object `cached.conn`.
 */
export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "re-image.ai",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
