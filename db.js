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


// --------------------------------------------------------------------------------------------------------------------



const mongoose = require("mongoose");
require("dotenv").config(); 


// const mongoURL = "mongodb://127.0.0.1:27017/hotel";

// const mongoURL ="mongodb+srv://hellosid:hellosid@cluster0.pu7kfmb.mongodb.net/";

const mongoURL = process.env.MONGODB_URL_LOCAL;

// const mongoURL = process.env.MONGODB_URL;

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



// --------------------------------------------------------------------------------------------------------------------

// const mongoose = require("mongoose");
// require("dotenv").config();

// const mongoURL = process.env.MONGODB_URL;

// const connectOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 30000, // 30 seconds timeout for server selection
//   socketTimeoutMS: 45000, // 45 seconds socket timeout
// };

// mongoose.set("debug", true); // Enable detailed logging

// mongoose
//   .connect(mongoURL, connectOptions)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("Initial MongoDB Connection Error", err));

// const db = mongoose.connection;

// db.on("connected", () => {
//   console.log("MongoDB Connection Established");
// });

// db.on("error", (err) => {
//   console.error("MongoDB Connection Error", err);
// });

// db.on("disconnected", () => {
//   console.log("MongoDB Connection Disconnected");
// });

// module.exports = db;
