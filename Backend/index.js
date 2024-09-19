const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 8080;

const MongoURI = "mongodb://127.0.0.1:27017/swiftServeData"


main().then(res => console.log("Connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect(MongoURI);
}


app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested_With, Content-Type, Accept");
    next();
});

app.get("/", (req, res)=>{
    res.send("Working fine !!");
});

app.use(express.json());
app.use("/home", require("./Routes/user.js"));
app.use("/home", require("./Routes/data.js"));
app.use("/home", require("./Routes/orders.js"));

app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
})