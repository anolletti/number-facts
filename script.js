// Variable declaration

let fact, userInput;
const factElement = document.getElementById("factElement");
const numberElement = document.getElementById("numberElement");
const submitBtn = document.getElementById("submit");
const numberField = document.getElementById("numberField");
const text = document.getElementById("text");
const languageBtn = document.getElementById("languageBtn");
let language = "en";

$('[lang="fr"]').hide();

// Language Toggling

languageBtn.addEventListener("click", function () {
  $('[lang="fr"]').toggle();
  $('[lang="en"]').toggle();

  if (language == "en") {
    language = "fr";
  } else if (language == "fr") {
    language = "en";
  }
  if (factElement != null && language == "fr") {
    translateText(factElement.innerHTML, "fr");
  }
  if (factElement != null && language == "en") {
    translateText(factElement.innerHTML, "en");
  }
  languageBtn.blur();
});

// Event listeners on main button

submitBtn.addEventListener("click", onSubmit);

document.addEventListener("keydown", function (enter) {
  if (enter.key === "Enter" && numberField.value != "") {
    submitBtn.click();
  }
});

// Main function

function onSubmit() {
  if (Number(numberField.value) > 1000 || Number(numberField.value) < 1) {
    language == "fr"
      ? alert("Entrez un nombre entre 1 et 1000.")
      : alert("Enter a number between 1 and 1000.");
    return false;
  }
  userInput = numberField.value;
  console.log(userInput);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "03ffb42a0bmsh0844764ce0dfaedp16e4a5jsn2e7131406e47",
      "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
      "access-control-allow-credentials": "true",
      "access-control-allow-origin": "*",
      "cache-control":
        "no-cache, no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      "content-length": "164",
      "content-type": "application/json; charset=utf-8",
      date: "Thu, 24 Nov 2022 19:01:07 GMT",
      etag: 'W/"a4-HYOjGFi75uXRi+Bu6/qVbv5HF5M"',
      expires: "0",
      "last-modified": "1669316722",
      pragma: "no-cache",
      server: "RapidAPI-1.2.8",
      "x-numbers-api-number": userInput,
      "x-numbers-api-type": "trivia",
      "x-powered-by": "Express",
      "x-rapidapi-region": "AWS - us-east-1",
      "x-rapidapi-version": "1.2.8",
    },
  };

  fetch(
    `https://numbersapi.p.rapidapi.com/${userInput}/trivia?fragment=true&notfound=floor&json=true`,
    options
  )
    .then((response) => response.json())
    .then((response) => printText(response.text))

    .catch((err) => console.error(err));

  text.classList.remove("d-none");
}

// Translation function

function printText(textInput) {
  if (language == "fr") {
    translateText(textInput, "fr");
  } else {
    factElement.innerHTML = textInput;
  }
}

function translateText(toTranslate, lang) {
  const options2 = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "03ffb42a0bmsh0844764ce0dfaedp16e4a5jsn2e7131406e47",
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    },

    body: `[{"Text":"${toTranslate}"}]`,
  };

  fetch(
    `https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${lang}&api-version=3.0&profanityAction=NoAction&textType=plain`,

    options2
  )
    .then((response) => response.json())
    .then(
      (response) => (factElement.innerHTML = response[0].translations[0].text)
    )
    .catch((err) => console.error(err));
}
