import express from "express";
import axios from "axios";
import bodyParser from "body-parser"; // required for req.body to work

const app = express();
const port = 3000;
const APIkey = "a888149f84e02eece65cae18fcc0e644";

// middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // to parse form data

// routes
app.get("/", (req, res) => {
  res.render("index.ejs", { content: null });
});

app.post("/get-secret", async (req, res) => {
  const city = req.body.city;

  try {
    const result = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: city,
        appid: APIkey,
        units: "metric",
      },
    });

    const weather = result.data.weather[0].description;
    const temp = result.data.main.temp;

    res.render("index.ejs", { content: `Weather: ${weather}, Temp: ${temp}°C` });
  } catch (error) {
    res.render("index.ejs", { content: "Error: City not found or API issue." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
