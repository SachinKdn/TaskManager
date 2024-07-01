import mongoose from "mongoose";

export const initDB = async (): Promise<boolean> => {
  return await new Promise((resolve, reject) => {
    const mongodbUri = process.env.MONGODB_URI ?? "";
    console.log(mongodbUri)
    if (mongodbUri === "") throw new Error("mongod db uri not found!");
    // mongoose.set("debug", true);
    mongoose.set("strictQuery", false);
    mongoose
      .connect("mongodb+srv://sachin75way:CyFk98E8oDXCzF0X@cluster103.gsefxww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster103")
      .then(() => {
        console.log("DB Connected!");
        resolve(true);
      })
      .catch(reject);
  });
};

// CyFk98E8oDXCzF0X