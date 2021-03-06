// this is where we want to require dependencies
const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const app = express();

// ALL CODE ADDED FOR PASSPORT BELOW
const passport = require("./config/passport-config");
const session = require("express-session");
app.use(session({ secret: "secret123", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// passport code ends here

// create a Port
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes)

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/ingredientDB");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});