const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const userroutes=require('./routes/auth');
const app=express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use("/api/auth",userroutes);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
  app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`));