import { app } from "./app";
import connectDB from "./utils/database";
require('dotenv').config()


// create server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("=================================")
    console.log(`Server started on PORT ${PORT}`)
    connectDB()
})
