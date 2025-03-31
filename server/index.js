const express = require("express");
const db = require("mongoose");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const products = require("./Routes/products");
const auth = require("./Routes/authentification");
const cookieParser = require("cookie-parser");
const myProfile = require("./Routes/mypProfile");
const Order = require("./Routes/order");
const product = require("./models/product");
// multer
const multer = require("multer");
const { checkToken } = require("./middleware/signed");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./products");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()} -${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/avif" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
// .env
require("dotenv").config();

// db
db.connect(process.env.MONGO_URI);

const wishget = {
  origin: ["https://feshopping.vercel.app"],
  methods: ["GET", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Origin",
  ],
  credentials: true,
};

app.use(
  cors({
    origin: ["https://feshopping.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "UPDATE", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("products"));

// Routes
// all Products
app.use("/api", products);
// authentification
app.use("/authentification", auth);
// my-profile
app.use("/authorized", cors(wishget), myProfile);
// order api
app.use("/orders", Order);

app.get("/signout", checkToken, (req, res) => {
  try {
    return res
      .status(202)
      .clearCookie("U_A", {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite: "none",
        secure: true,
      })
      .json({
        errorMsg: "log out successfully",
      });
  } catch (error) {
    return res.status(500).json({
      erroMsg: "server error",
      message: error.message,
    });
  }
});
app.get("/auth", (req, res) => {
  try {
    if (req.cookies.U_A) {
      return res.status(200).json({
        signed: true,
      });
    }
    return res.status(401).json({
      signed: false,
      req: req.cookies,
    });
  } catch (error) {
    res.status(500).json({
      errorMsg: "server error",
    });
  }
});

// upload products

app.post("/upload", upload.single("image"), (req, res) => {
  try {
    new product({
      userid: req.body.userid,
      product: req.body.product,
      category: req.body.category,
      type: req.body.type,
      color: req.body.color,
      price: req.body.price,
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename,
    }).save();
    return res.status(201).json({
      msg: "ok success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      erroMsg: "server error",
    });
  }
});

const Port = process.env.Port || 4000;

http.listen(Port);
