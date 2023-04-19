const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const sensorSchema = require("./src/models/sensores");
const lecturasSchema = require("./src/models/lecturas");
const userSchema = require("./src/models/users")
const AuthSchema = require("./src/models/auth")


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(fileUpload());

app.use("/img", express.static(__dirname + "/imagenes"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("Conectado a mongo Atlas"))
  .catch((error) => console.log(error));

app.post("/sensor", async (req, res) => {
  const newSensor = new sensorSchema({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  });
  const savedSensor = await newSensor.save();
  res.json(savedSensor);
});

app.post("/lecturas", async (req, res) => {
  const newLectura = new lecturasSchema({
    sensor_id: req.body.sensor_id,
    sensors: req.body.sensors,
  });
  const savedSensor = newLectura.save();
  res.json(savedSensor);
});

app.get("/lecturas/:id", async (req, res) => {
  const lecs = await lecturasSchema.find(req.params.sensorId);
  res.json(lecs);
});

app.get("/sensor", async (req, res) => {
  const sensores = await sensorSchema.find();
  res.json(sensores);
});

app.get("/sensor/:id", async (req, res) => {
  const sensor = await sensorSchema.findById(req.params.id);
  res.json(sensor);
});


app.get("/auth", async (req, res) => {
  const response = await AuthSchema.find()
  res.send({
    res: response
  })
})

app.post("/ ", async(req, res) =>{
  // const response = await userSchema.find()
  // res.send({
  //   res: response
  // })
  const someUser = await userSchema.findOne({ user: req.body.user, password: req.body.password })
  if (someUser) {
    res.send({
      user: someUser.user,
      password: someUser.password
    })
  }
})

// app.post("/user", async (req, res) => {
//   const someUser = await userSchema.findOne({ user: req.body.user});
//   if (someUser) {
//     res.send({
//       user: someUser.user,
//       password: someUser.password
//     })
//   }
// })
// const cambairDatos = (datos) => {
//   let datos1 []
//   datos.map(data)
// }

app.listen(port, () => {
  console.log("Server on port", port);
});
