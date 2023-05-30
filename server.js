const express = require("express");
const Amadeus = require("amadeus");

const app = express();

app.get("/flight-prices", async (req, res) => {
  const source = req.query.source;
  const destination = req.query.destination;
  const date = req.query.date;

  const amadeus = new Amadeus({
    clientId: "FeSF1tEnV72GxnO4aR5NFNeqIgOw8i3N",
    clientSecret: "3I2kH2zeEl5A1Hoo",
  });
  amadeus.shopping.flightOffersSearch.get({
    originLocationCode: source,
    destinationLocationCode: destination,
    departureDate: date,
    adults: '2'
  }).then(function (response) {

    const nameList = ['indigo', 'air india', 'vistara'];
    const final = {};
    var prices = [];

    for (const flight of response.data){
      prices.push(flight["price"]["grandTotal"]);
    }
    for (var i = 0; i <3; i++) {
      final[nameList[i]] = prices[i];
    }
    console.log(prices);
    res.send(final);

  }).catch(function (responseError) {

    res.send(responseError);
  });

});


app.listen(5000, () => {
  console.log("Server listening on port 5000");
});


