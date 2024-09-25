import express from "express";
import videoRouter from "../src/routers/videoRouter"
import userRouter from "../src/routers/userRouter"
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

//Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use(videoRouter);
app.use(userRouter)


app.listen(PORT, () => {
  console.log(`Server starts on ${PORT} port`);
});
