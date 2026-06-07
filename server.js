require("dotenv").config();
const http = require("http");
const app = require("./src/app");
const connectDB = require("./src/config/db");
const logger = require("./src/middleware/logger");

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
  console.log(`Server listening on port ${PORT}`);
});

server.on("error", (err) => {
  logger.error("Server error", { error: err.message, stack: err.stack });
  process.exit(1);
});
