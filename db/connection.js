const mongoose = require("mongoose");
const { DB_CONN } = process.env;

mongoose
  .connect(DB_CONN)
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch((err) => {
    console.log("Error when connected to DB: ", err);
  });
