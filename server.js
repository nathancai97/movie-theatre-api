const express = require("express");
const app = express();
const {sequelize} = require("./db");
const usersRouter = require('./routes/user');
const showsRouter = require('./routes/show');


const port = 3000;

app.use(express.json());

app.use("/users", usersRouter)
app.use("/shows", showsRouter)


app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})

