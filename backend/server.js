import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import todoRoutes from "./routes/todoRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import connectDB from "./db/index.js"


dotenv.config({
  path: "./.env",
});


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);

connectDB()
  .then(() => {
    app.on("Error", (error) => {
      console.log("ERR:", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB coneection failed!!!!", err);
  });
