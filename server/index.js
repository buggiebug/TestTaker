// Dotenv...
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const morgan = require('morgan')
const cors = require("cors");
app.use(cors());
app.use(morgan("combined"))

// Handling uncaught exceptions...
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(
    `Shutting down the server due to uncaught exception: ${err.stack}`
  );

  process.exit(1);
});


// Cookie parser...
const cookie = require("cookie-parser");
app.use(cookie());

app.use(express.json());

// Connecting Database...
const connectDB = require("./database/dbConnect");
connectDB();

// Route configurations...
const questionsRoute = require("./routes/questionRoute");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");

app.get('/', (req,res)=>{return res.send("ok")});
app.use("/api/v1", questionsRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1/admin", adminRoute);

const { ownApiCallForRender } = require("./cronJob/ownApiCallForRender");
ownApiCallForRender();

//  Error Handler...
const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);

// Unhandled promise rejection...
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(
    `Shutting down the server due to unhandle promise: ${err.message}`
    );
    server.close(() => {
      process.exit(1);
    });
  });
  
  
  // Server running...
  const server = app.listen(process.env.PORT, () => {
    console.log(`server run at http://${process.env.HOST}:${process.env.PORT}`);
  });



  