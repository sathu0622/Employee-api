const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const requestLogger =
  require("./middleware/requestLogger");

const errorHandler =
  require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use(requestLogger);

app.use("/api/employees",
  require("./routes/employee.routes")
);

app.use("/api/departments",
  require("./routes/department.routes")
);

app.use("/api/attendance",
  require("./routes/attendance.routes")
);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

app.use(errorHandler);

module.exports = app;