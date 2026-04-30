require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");

const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");
const solicitudRoutes = require('./routes/solicitud.routes');

const profileRoutes = require('./routes/profile.routes');
const loginRoutes = require('./routes/login.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use('/api/solicitudes', solicitudRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/login', loginRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando" });
});

app.use("/api", routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;