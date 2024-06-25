// const mongoose = require("mongoose");

// const mongoURL = "mongodb://127.0.0.1:27017/hotel";


// mongoose.connect(mongoURL);

// const db = mongoose.connection;

// db.on("connected", () => {
//   console.log("Connected to MongoDB Server");
// });

// db.on("error", (err) => {
//   console.log("Mongodb Connection Error", err);
// });

// db.on("disconnected", () => {
//   console.log("Mongodb Connection Disconnected");
// });

// module.exports = db;

const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/hotel";

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(mongoURL, connectOptions);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.error("MongoDB Connection Error", err);
});

db.on("disconnected", () => {
  console.log("MongoDB Connection Disconnected");
});

module.exports = db;
