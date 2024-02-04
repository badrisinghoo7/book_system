const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.route");
const { bookRouter } = require("./routes/book.route");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/books", bookRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
    console.log("server is running on port", process.env.PORT);
  } catch (error) {
    console.log(error);
    console.log("not connected to db");
  }
});
