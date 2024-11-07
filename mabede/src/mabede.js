const bodyParser = require("body-parser");
const express = require("express");

const router = require("./router");

const app = express();

app.use(bodyParser.json());
app.use(router);

app.listen(3000);
