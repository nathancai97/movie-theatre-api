const express = require("express");
const app = express();
const {sequelize} = require("./db");


const port = 3000;

app.use(express.json());


app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})

