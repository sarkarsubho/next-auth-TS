import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.mongo_url!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("mongoose Connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "mongoDB connecttion error ,please make it up and running." + err
      );
      process.exit();
    });

  } catch (error) {
    console.log(error);
  }
}
