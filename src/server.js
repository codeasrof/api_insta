require("dotenv").config()
require("./database/index")
const express = require("express")
const routes = require("./routes/routes")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
app.use("/", routes)

const { PORT } = process.env
app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT)
})