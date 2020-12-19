const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

const { Gstore, instances } = require("gstore-node");
const { Datastore } = require("@google-cloud/datastore");
const gstore = new Gstore();

const datastore = new Datastore({
  projectId: "giovanic",
});
gstore.connect(datastore);

instances.set("giovanic", gstore);

const routerUsers = require("./user/user.router");
const routerIot = require("./iot/iot.router");

app.use(express.static(path.join(__dirname, "/static"))); //  "public" off of current is root

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/static/index.html"));
  //  res.send("<h1>TBD</h1>");
});

// logger
app.use(function (req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.user);
  next();
});

app.use("/api/users", routerUsers);
app.use("/api/iot", routerIot);

const server = app.listen(8080, () => {
  const port = server.address().port;

  console.log(`listening at port:${port}`);
});
