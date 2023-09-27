require("dotenv").config()
require("./database/index")
const express = require("express")
const routes = require("./routes/routes")
const app = express()
const { PORT } = process.env

app.use(express.json())

app.use("/", routes)

app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT)
})