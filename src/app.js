const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000

//Define paths for express config
const publiDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setting up views/template engine(so that express knows which template engine is being used by express)
//Setting up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publiDir));

//route to index.html
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Neeraj Chauhan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Neeraj Chauhan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "How can I help you....",
    title: "Help",
    name: "Neeraj Chauhan",
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    message: "Help article not found",
    name: "Neeraj Chauhan",
    title: "Error Page",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      res.send({
        location,
        forecastData,
      });
    });
  });

});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      err: "Provide search term",
    });
  }
  console.log(req.query.search);

  res.send({
    product: [],
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "Error Page",
    message: "Page not found",
    name: "Neeraj Chauhan",
  });
});

//setting up server
app.listen(port, () => {
  console.log('Server is running on port'+ port);
});
