const dbdotenv = require("dotenv");
const mongoose = require("mongoose");

dbdotenv.config();

// connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("DataBase Connected succssfully!")
    );

    export{};
