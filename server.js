const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

app.use(express.static(path.join(__dirname, "/public")));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

//add the router
app.use("/", router);

app.listen(3000, () =>
  console.log("Gator app listening on port http://localhost:3000")
);
