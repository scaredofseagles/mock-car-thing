const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authentication/authRoutes");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);

// app.get("/", (req, res) => {
//   res.json("HELLO");
// });

app.listen(8080, () => console.log("Server is listening"));
