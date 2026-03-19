

const express = require("express");
const connectToDatabase = require("./db/db");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json())

connectToDatabase();

const PORT = process.env.PORT;

app.use("/auth", require("./routes/userRoutes"))



app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
});

app.get("/", (req, res) => {
    res.send("Tirsha Paudel")
});

console.log("hello world")

