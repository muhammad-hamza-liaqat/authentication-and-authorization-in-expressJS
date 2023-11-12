const mongo = require("mongoose");
// connecting to the database, will create the userDatabase 
mongo
  .connect("mongodb://localhost:27017/userDatabase")
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((e) => {
    console.log("MongoDB not connected! error: ", e);
  });
module.exports= mongo;