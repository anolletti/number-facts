const axios = require("axios");

const handler = async (event) => {
  try {
    const textToTranslate = event.headers.text;
    const language = event.headers.lang;

    const options = {
      method: "POST",
      url: "https://microsoft-translator-text.p.rapidapi.com/translate",
      params: {
        "to[0]": `${language}`,
        "api-version": "3.0",
        profanityAction: "NoAction",
        textType: "plain",
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "03ffb42a0bmsh0844764ce0dfaedp16e4a5jsn2e7131406e47",
        "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
      },
      data: `[{"Text":"${textToTranslate}"}]`,
    };

    const translationObject = await axios.request(options);
    const translation = translationObject.data;

    return {
      statusCode: 200,
      body: JSON.stringify(translation),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
