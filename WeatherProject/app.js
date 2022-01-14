const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
        req.body.cityName
        console.log("Posted!");
        var city = req.body.cityName;
        var appID = "c67d9619ac3623d6d25f6109b02ef896";
        var units = "imperial";
        const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appID}&units=${units}`
        https.get(weather_url, (response) => {
            respCode = response.statusCode
            response.on("data", (data) => {
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp
                const weatherDescription = weatherData.weather[0].description
                const iconID = weatherData.weather[0].icon
                res.write(`<p><img src="http://openweathermap.org/img/wn/${iconID}@2x.png"></p>`)
                res.write(`<p>The Current temperature is ${temp}\nThe Weather Could Currently Be Described as ${weatherDescription}</p>`)
                res.send()
            });
        });
    })
    // var city = "tampa";
    // var appID = "c67d9619ac3623d6d25f6109b02ef896";
    // var units = "imperial";
    // const weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appID}&units=${units}`
    // https.get(weather_url, (response) => {
    //     respCode = response.statusCode
    //     response.on("data", (data) => {
    //         const weatherData = JSON.parse(data);
    //         const temp = weatherData.main.temp
    //         const weatherDescription = weatherData.weather[0].description
    //         const iconID = weatherData.weather[0].icon
    //         res.write(`<p><img src="http://openweathermap.org/img/wn/${iconID}@2x.png"></p>`)
    //         res.write(`<p>The Current temperature is ${temp}\nThe Weather Could Currently Be Described as ${weatherDescription}</p>`)
    //         res.send()
    //     });
    // });



app.listen(3000, () => {
    console.log(`Server is running on ${port}`)
})