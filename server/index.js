import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose, { Mongoose } from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();
//Middleware for parsing request body
app.use(express.json());
//Middleware for handling CORS POLICY
app.use(cors({
  origin:'http://localhost:5555',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeadersaa :['Content-Type']
}));

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to Backend Development");
});
app.use("/books", bookRoute);
//Database Connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`App is Listening from ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
