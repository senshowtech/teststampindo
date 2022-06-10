const https = require("https");

const getLatitude = () => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=jakarta&appid=241ccb2e30e2602517a4ca4db688a876`;
  https
    .get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        data = JSON.parse(data);
        let latitude = data.coord.lat;
        let longtitude = data.coord.lon;
        getForecast(latitude, longtitude);
      });
    })
    .on("error", (err) => {
      console.log(err.message);
    });
};

const getForecast = (latitude, longtitude) => {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longtitude}&appid=241ccb2e30e2602517a4ca4db688a876`;
  https
    .get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        data = JSON.parse(data);
        let data_daily = data.daily;
        for (let index in data_daily) {
          let dt = data_daily[index].dt;
          let temp = data_daily[index].temp.max;
          let dayname = new Date(dt * 1000);
          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          let name_date = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          let date = dayname.getDate();
          let month = dayname.getMonth();
          let year = dayname.getFullYear();
          console.log(
            `${name_date[date]}, ${date} ${months[month]} ${year}: ${(
              temp / 10
            ).toPrecision(4)}°C`
          );
        }
      });
    })
    .on("error", (err) => {
      console.log(err.message);
    });
};

getLatitude();
getForecast();
