const axios = require("axios");

const handler = async (event) => {
  try {
    const number = event.queryStringParameters.number;
    const options = {
      method: "GET",
      url: `https://numbersapi.p.rapidapi.com/${number}/trivia`,
      params: { fragment: "true", notfound: "floor", json: "true" },
      headers: {
        "X-RapidAPI-Key": process.env.API_SECRET,
        "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
      },
    };

    const coolFact = await axios.request(options);
    const fact = coolFact.data["text"];

    return {
      statusCode: 200,
      body: JSON.stringify(fact),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
