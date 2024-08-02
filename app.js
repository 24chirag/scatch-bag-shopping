const express = require("express");
const app = express();
const cookieParser = require ("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection")
const ownerRouter = require("./routes/ownerRouter")
const productRouter = require("./routes/productRouter")
const userRouter = require("./routes/userRouter")
const index = require("./routes/index")
const expressSession = require('express-session')
const flash = require('connect-flash')
app.use(
    expressSession ({
    resave: false, saveUninitialized: false, secret: "hiee"
    }))
    app.use(flash())
app.use(express.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs");

app.use("/users",userRouter);
app.use("/products",productRouter);
app.use("/owners",ownerRouter);
app.use("/",index);


app.listen(3000)