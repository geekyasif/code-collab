const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const routes = require("./routes/index")
const dotenv = require("dotenv").config()

const app = express();
app.use(express.json());
app.use(cors());

main().catch(err => console.log(err));
async function main(){
  await mongoose.connect(process.env.DB_URL)
}


app.use(routes)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log("Server is listening...");
});
